import { publicAxios, privateAxios } from "@/middleware/axiosInstance";
import { setCredentials } from "@/lib/features/auth/authSlice";
import { useState } from "react";
import { LoginRequest, LoginResponse } from "@/types/auth/auth.interface";
import { SignupRequest, SignupResponse } from "@/types/auth/auth.interface";
import { User } from "@/types/user/user.interface";
import { useAppDispatch } from "@/lib/hooks";
import { logOutAndRevertAll } from "@/lib/features/auth/authSlice";

export const useAuthService = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();

    const login = async ({
        email,
        password,
    }: LoginRequest) => {
        setIsLoading(true);
        try {
            const response = await publicAxios.post<LoginResponse>("/api/auth/login", { email, password });

            // Dispatch the action to update the Redux store
            dispatch(setCredentials({
                user: response.data.data as User,
            }));
            return response.data;
        } catch (error) {
            throw error as Error;
        } finally {
            setIsLoading(false);
        }
    }

    const signup = async ({
        username,
        email,
        password,
    }: SignupRequest) => {
        setIsLoading(true);
        try {
            const response = await publicAxios.post<SignupResponse>("/api/auth/register", { 
                username, 
                email, 
                password, 
            });


            return response.data;
        } catch (error) {
            throw error as Error;
        } finally {
            setIsLoading(false);
        }
    }

    const logout = async () => {
        setIsLoading(true);
        try {
            await privateAxios.post("/api/auth/logout");
            dispatch(logOutAndRevertAll());
        } catch (error) {
            throw error as Error;
        } finally {
            setIsLoading(false);
        }
    }

    return {
        login,
        signup,
        logout,
        
        isLoading,
    };
}
