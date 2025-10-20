import { ApiResponse } from "../base.interface";

export interface Role {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface GetRolesResponse extends ApiResponse {
    data: Role[];
}
