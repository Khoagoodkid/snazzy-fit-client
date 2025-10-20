import { BASE_URL } from "@/config/config";
import { handleApiError } from "@/utils/handleApiError";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { logOutAndRevertAll } from "@/lib/features/auth/authSlice";
import { getStore } from "@/lib/store";
import { getFingerprint, getOrCreateDeviceId, getBehaviorSummary } from "@/utils/handleDevice";

export const publicAxios = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
})

export const privateAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

const refreshAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

publicAxios.interceptors.request.use((config) => {
  const deviceId = getOrCreateDeviceId();
  const fingerprint = getFingerprint();
  const behavior = getBehaviorSummary();
  config.headers['x-device-id'] = deviceId;
  config.headers['x-fingerprint'] = fingerprint;
  config.headers['x-behavior'] = JSON.stringify(behavior);

  return config;
});

publicAxios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const errorMessage = handleApiError(error, "Đã xảy ra lỗi không mong muốn");
    return Promise.reject(new Error(errorMessage));
  }
);


const { store } = getStore();

const retryRequest = (
  config: InternalAxiosRequestConfig | undefined
): Promise<unknown> => {
  if (!config)
    return Promise.reject(
      new Error("Cannot retry request: config is undefined")
    );

  return privateAxios(config);
};



let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

privateAxios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (!error.response) {
      const errorMessage = handleApiError(
        error,
        "An unexpected error occurred"
      );
      return Promise.reject(new Error(errorMessage));
    }

    const { store } = getStore();

    // Handle 401 error: expired token so we need to refresh token
    if (error.response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = new Promise(async (resolve, reject) => {
          try {
            console.log("Interceptor: Initiating token refresh...");
            const headers = {};
            await refreshAxios.post(
              "/api/auth/refresh-token",
              {},
              { headers }
            );

            resolve(true);
          } catch (tokenError: unknown) {
            store.dispatch(logOutAndRevertAll());
            if (typeof window !== "undefined") {
              window.location.href = "/login";
            }
            reject(
              new Error(handleApiError(tokenError, "Refresh token failed"))
            );
          } finally {
            isRefreshing = false;
            refreshPromise = null;
          }
        });
      }

      try {
        await refreshPromise;
        return retryRequest(error.config);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    // Handle 403 error: insufficient permissions
    if (error.response.status === 403) {
      const errorMessage = handleApiError(error, "You do not have permission to access this feature");
      return Promise.reject(
        new Error(errorMessage)
      );
    }

    const errorMessage = handleApiError(error, "An unexpected error occurred");
    return Promise.reject(new Error(errorMessage));
  }
);
