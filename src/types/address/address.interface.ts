import { ApiResponse } from "../base.interface";

export interface Address {
    id: string;
    customer_first_name: string;
    customer_last_name: string;
    company_name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    email: string;
    country: string;
    is_default: boolean;
}

export interface CreateAddressRequest {
    customer_first_name: string;
    customer_last_name: string;
    company_name?: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    country: string;
}

export interface CreateAddressResponse extends ApiResponse {
    data: Address;
}

export interface UpdateAddressRequest {
    id: string;
    customer_first_name: string;
    customer_last_name: string;
    company_name?: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    country: string;
}


export interface UpdateAddressResponse extends ApiResponse {
    data: Address;
}

export interface DeleteAddressResponse extends ApiResponse {
    data: Address;
}

export interface GetAddressesResponse extends ApiResponse {
    data: Address[];
}