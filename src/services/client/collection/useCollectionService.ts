import { useCallback, useState } from "react";
import { privateAxios } from "@/middleware/axiosInstance";
import { GetCollectionsQuery, GetCollectionsResponse, GetCollectionWithCategoriesResponse } from "@/types/collection/collection.interface";

export default function useCollectionService() {

    const [isLoading, setIsLoading] = useState(false);

    const getCollections = useCallback(async (params: GetCollectionsQuery) => {
        setIsLoading(true);
        try {
            const response = await privateAxios.get<GetCollectionsResponse>(`/api/collections`, { params });
            return response.data;
        } catch (error) {
            throw error as Error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const getCollectionsWithCategories = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await privateAxios.get<GetCollectionWithCategoriesResponse>(`/api/collections/with-categories`);
            return response.data;
        } catch (error) {
            throw error as Error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        isLoading,
        getCollections,
        getCollectionsWithCategories,
    }
}
