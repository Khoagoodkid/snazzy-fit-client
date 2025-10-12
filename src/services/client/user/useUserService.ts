import { privateAxios } from "@/middleware/axiosInstance";
import { UpdatePasswordRequest, UpdatePasswordResponse, UpdateUserRequest, UpdateUserResponse } from "@/types/user/user.interface";
import { useCallback, useState } from "react";

export const useUserService = () => {

    const [isLoading, setIsLoading] = useState(false);

    const updateUser = useCallback(async (user: UpdateUserRequest) => {
        setIsLoading(true);
        try {
            // Create FormData if file is present, otherwise send JSON
            let requestData: FormData | UpdateUserRequest;
            let headers = {};

            if (user.file) {
                requestData = new FormData();
                requestData.append('file', user.file);
                requestData.append('name', user.name);
                requestData.append('phone', user.phone);
                requestData.append('gender', user.gender);
                headers = { 'Content-Type': 'multipart/form-data' };
            } else {
                // If no file, send only the user data without the file field
                const { file, ...userData } = user;
                requestData = userData;
            }

            const response = await privateAxios.patch<UpdateUserResponse>(
                `/api/users/me`, 
                requestData,
                { headers }
            );
            return response.data;
        } catch (error) {
            throw error as Error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const updatePassword = useCallback(async (request: UpdatePasswordRequest) => {
        setIsLoading(true);
        try {
            const response = await privateAxios.patch<UpdatePasswordResponse>(`/api/users/me/password`, request);
            return response.data;
        } catch (error) {
            throw error as Error;
        }
        finally {
            setIsLoading(false);
        }
    }, []);

    return {
        isLoading,
        updateUser,
        updatePassword,
    }
}