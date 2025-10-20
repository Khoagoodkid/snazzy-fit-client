import { privateAxios } from "@/middleware/axiosInstance";
import { useCallback, useState } from "react";
import { GetRolePermissionsResponse, UpsertRolePermissionRequest, UpsertRolePermissionResponse } from "@/types/role-permission/role-permission.interface";
export const useRolePermissionService = () => {
    const [isLoading, setIsLoading] = useState(false);

    const getRolePermissions = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await privateAxios.get<GetRolePermissionsResponse>("/api/role-permissions");
            return response.data;
        } catch (error) {
            throw error as Error;
        } finally {
            setIsLoading(false);
        }
    }, []);


    const upsertRolePermission = useCallback(async (rolePermission: UpsertRolePermissionRequest) => {
        setIsLoading(true);
        try {
            const response = await privateAxios.post<UpsertRolePermissionResponse>("/api/role-permissions/upsert", rolePermission.payload);
            return response.data;
        } catch (error) {
            throw error as Error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        isLoading,
        getRolePermissions,
        upsertRolePermission,
    }
}