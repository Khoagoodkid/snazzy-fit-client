import { privateAxios } from "@/middleware/axiosInstance";
import { useCallback, useState } from "react";
import { GetPermissionsResponse } from "@/types/role-permission/permission.interface";

export const usePermissionService = () => {

    const [isLoading, setIsLoading] = useState(false);

    const getPermissions = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await privateAxios.get<GetPermissionsResponse>("/api/permissions");
            return response.data;
        } catch (error) {
            throw error as Error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        isLoading,
        getPermissions,
    }
}