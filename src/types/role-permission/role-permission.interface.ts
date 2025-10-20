import { ApiResponse } from "../base.interface";
import { Permission } from "./permission.interface";
import { Role } from "./role.interface";


export interface RolePermission {
    id: string;
    role_id: string;
    role?: Role;
    permission_id: string;
    permission?: Permission;
    status: number;
    created_at: string;
    updated_at: string;
}

export interface GetRolePermissionsResponse extends ApiResponse {
    data: RolePermission[];
}

export interface UpsertRolePermissionRequest {
    payload: {
        roleId: string;
        permissionId: string;
        status: number;
    }[]
}

export interface UpsertRolePermissionResponse extends ApiResponse {
    data: RolePermission;
}
