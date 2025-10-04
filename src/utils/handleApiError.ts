import { isAxiosError } from "axios";

export const handleApiError = (
  err: unknown,
  defaultMessage: string
): string => {
  if (isAxiosError(err)) {
    return err.response?.data?.message || err.message || defaultMessage;
  }
  console.log("Unexpected Error:", err);
  return "An unexpected error occurred";
};
