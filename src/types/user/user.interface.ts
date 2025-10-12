import { ApiResponse } from "../base.interface"

export interface User {
    id: string
    name: string
    email: string
    role: string
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
