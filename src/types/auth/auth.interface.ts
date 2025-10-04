import { ApiResponse } from "../base.interface";
import { User } from "../user/user.interface";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse extends ApiResponse {
    data: User;
}

export interface SignupRequest {
    username: string;
    email: string;
    password: string;
}

export interface SignupResponse extends ApiResponse {
    data: User;
}
