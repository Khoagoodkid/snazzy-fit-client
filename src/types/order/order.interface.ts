import { ApiResponse } from "../base.interface";
import { Variant } from "../product/product.interface";

export interface Order {
    id: string;
    customer_id: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    customer_address: string;
    customer_city: string;
    customer_zip: string;
    customer_country: string;
    payment_method: string;
    total_amount: number;
    tax_amount: number;
    shipping_amount: number;
    sub_total: number;
    status: OrderStatus;
    created_at: string;
    updated_at: string;
    items: OrderItem[];

}

export interface CreateOrderRequest {
    items: {
        cart_id: string | null;
        variant_id: string;
        quantity: number;
        unit_price: number;
        total_price: number;
    }[];
    total_amount: number;
    tax_amount: number;
    shipping_amount: number;
    sub_total: number;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    customer_address: string;
    customer_state: string;
    customer_city: string;
    customer_zip: string;
    customer_country: string;
    payment_method: string;
}

export interface GetOrderDetailsResponse extends ApiResponse {
    data: Order;
}


export interface OrderItem {
    id: string;
    order_id: string;
    variant_id: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    variant: Variant;
}

export interface GetOrdersResponse extends ApiResponse {
    data: Order[];
}

export enum OrderStatus {
    PAID = "PAID",
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED",
}