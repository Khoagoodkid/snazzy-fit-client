import { privateAxios } from "@/middleware/axiosInstance";
import { useCallback, useState } from "react";
import { AddToCartRequest, GetCartResponse, UpdateCartRequest } from "@/types/cart/cart.interface";


export const useCartService = () => {
    const [isLoading, setIsLoading] = useState(false);


    const getCart = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await privateAxios.get<GetCartResponse>('/api/cart');
            return response.data;
        } catch (error) {
            throw error as Error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const removeCart = useCallback(async (id: string) => {
        setIsLoading(true);
        try {
            await privateAxios.delete(`/api/cart/${id}`);
        } catch (error) {
            throw error as Error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const updateCart = useCallback(async (id: string, updateCartRequest: UpdateCartRequest) => {
        setIsLoading(true);
        try {
            const response = await privateAxios.patch(`/api/cart/${id}`, updateCartRequest);
            return response.data;
        } catch (error) {
            throw error as Error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const addToCart = useCallback(async (addToCartRequest: AddToCartRequest) => {
        setIsLoading(true);
        try {
            const response = await privateAxios.post(`/api/cart/add-to-cart`, addToCartRequest);
            return response.data;
        } catch (error) {
            throw error as Error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        isLoading,
        getCart,
        removeCart,
        updateCart,
        addToCart,
    }
}




export default useCartService;