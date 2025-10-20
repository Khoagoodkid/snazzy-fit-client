import { ApiResponse } from "../base.interface";

export interface Permission {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface GetPermissionsResponse extends ApiResponse {
    data: Permission[];
}