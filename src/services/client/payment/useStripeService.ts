import { privateAxios } from "@/middleware/axiosInstance";
import { useState } from "react";
import { CreateCheckoutSessionRequest, CreateCheckoutSessionResponse } from "@/types/payment/payment.interface";

export const useStripeService = () => {
    const [isLoading, setIsLoading] = useState(false);

    const createCheckoutSession = async (data: CreateCheckoutSessionRequest) => {
        setIsLoading(true);
        try {
            const response = await privateAxios.post<CreateCheckoutSessionResponse>("/api/stripe/create-checkout-session", data);
            return response.data;
        } catch (error) {
            throw error as Error;
        } finally {
            setIsLoading(false);
        }
    }

    return {
        createCheckoutSession,
    }
}