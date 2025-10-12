import { privateAxios } from "@/middleware/axiosInstance";
import { useCallback, useState } from "react";
import { CreateOrderRequest, GetOrderDetailsResponse, GetOrdersResponse } from "@/types/order/order.interface";


export const useOrderService = () => {
    const [isLoading, setIsLoading] = useState(false);

    const createOrder = async (order: CreateOrderRequest) => {
        setIsLoading(true);
        try {
            const response = await privateAxios.post("/api/orders", order);
            return response.data;
        } catch (error) {
            throw error as Error;
        } finally {
            setIsLoading(false);
        }
    }

    const getOrderDetails = useCallback(async (id: string) => {
        setIsLoading(true);
        try {
            const response = await privateAxios.get<GetOrderDetailsResponse>(`/api/orders/${id}`);
            return response.data;
        } catch (error) {
            throw error as Error;
        }
        finally {
            setIsLoading(false);
        }
    }, []);

    const getOrders = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await privateAxios.get<GetOrdersResponse>("/api/orders");
            return response.data;
        } catch (error) {
            throw error as Error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        isLoading,
        createOrder,
        getOrderDetails,
        getOrders,
    }
};