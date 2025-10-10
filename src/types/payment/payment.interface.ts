export interface CreateCheckoutSessionResponse {
    url: string;
}

export interface CreateCheckoutSessionRequest {
    orderId: string;
    amount: number;
    currency: string;
}