import { useCallback, useState } from "react";
import { publicAxios } from "@/middleware/axiosInstance";
import { GetProductsQuery, GetProductsResponse, GetProductBySlugResponse } from "@/types/product/product.interface";

export default function useProductService() {

    const [isLoading, setIsLoading] = useState(false);

    const getProducts = useCallback(async (params: GetProductsQuery) => {
        setIsLoading(true);
        try {
            const response = await publicAxios.get<GetProductsResponse>(`/api/products`, { params });
            return response.data;
        } catch (error) {
            throw error as Error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const getProductBySlug = useCallback(async (slug: string) => {
        setIsLoading(true);
        try {
            const response = await publicAxios.get<GetProductBySlugResponse>(`/api/products/${slug}`);
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
        getProductBySlug,
    }
}
