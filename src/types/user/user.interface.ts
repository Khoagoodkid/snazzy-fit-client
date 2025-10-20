import { ApiResponse } from "../base.interface"
import { Role } from "../role-permission/role.interface"

export interface User {
    id: string
    name: string
    email: string
    role: Role
    phone: string
    gender: string
    provider: string
    avatar: string
}

export interface UpdateUserRequest {
    file?: File
    name: string
    phone: string
    gender: string
}

export interface UpdateUserResponse extends ApiResponse {
    data: User
}

export interface UpdatePasswordRequest {
    new_password: string
    old_password: string
}

export interface UpdatePasswordResponse extends ApiResponse {
    data: User
}

export interface GetAllUsersForAdminResponse extends ApiResponse {
    data: User[]
}
