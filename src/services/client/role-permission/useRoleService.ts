import { privateAxios } from "@/middleware/axiosInstance";
import { useCallback, useState } from "react";
import { GetRolesResponse } from "@/types/role-permission/role.interface";
export const useRoleService = () => {
    const [isLoading, setIsLoading] = useState(false);

    const getRoles = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await privateAxios.get<GetRolesResponse>("/api/roles");
            return response.data;
        } catch (error) {
            throw error as Error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        isLoading,
        getRoles,
    }
}