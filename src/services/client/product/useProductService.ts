import { useCallback, useState } from "react";
import { privateAxios } from "@/middleware/axiosInstance";
import { GetProductsQuery, GetProductsResponse } from "@/types/product/product.interface";

export default function useProductService() {

    const [isLoading, setIsLoading] = useState(false);

    const getProducts = useCallback(async (params: GetProductsQuery) => {
        setIsLoading(true);
        try {
            const response = await privateAxios.get<GetProductsResponse>(`/api/products`, { params });
            return response.data;
        } catch (error) {
            throw error as Error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        isLoading,
        getProducts,
    }
}
