import { useCallback, useState } from "react";
import { privateAxios } from "@/middleware/axiosInstance";
import { GetCategoriesQuery, GetCategoriesResponse } from "@/types/categories/categories.interface";

export default function useCategoriesService() {

    const [isLoading, setIsLoading] = useState(false);

    const getCategories = useCallback(async (params?: GetCategoriesQuery) => {
        setIsLoading(true);
        try {
            const response = await privateAxios.get<GetCategoriesResponse>(`/api/categories`, { params });
            return response.data;
        } catch (error) {
            throw error as Error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        isLoading,
        getCategories,
    }
}
