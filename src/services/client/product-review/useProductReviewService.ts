import { privateAxios } from "@/middleware/axiosInstance";
import { useCallback, useState } from "react";
import {
    CreateProductReviewRequest,
    GetProductReviewsResponse,
    CreateProductReviewResponse,
    UpdateProductReviewResponse,
    DeleteProductReviewResponse,
    UpdateProductReviewRequest
} from "@/types/product-review/product-review.interface";

export default function useProductReviewService() {
    const [isLoading, setIsLoading] = useState(false);

    const getProductReviews = useCallback(async (productId: string) => {
        setIsLoading(true);
        try {
            const response = await privateAxios.get<GetProductReviewsResponse>(`/api/product-reviews/${productId}`);
            return response.data;
        } catch (error) {
            throw error as Error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const createProductReview = useCallback(async (productReview: CreateProductReviewRequest) => {
        setIsLoading(true);
        try {
            let requestData: FormData | Omit<CreateProductReviewRequest, 'files'>;
            let headers = {};

            if (productReview.files && productReview.files.length > 0) {
                requestData = new FormData();
                productReview.files.forEach((file) => {
                    (requestData as FormData).append('files', file);
                });
                requestData.append('product_id', productReview.product_id);
                if (productReview.variant_id) {
                    requestData.append('variant_id', productReview.variant_id);
                }
                requestData.append('rating', productReview.rating.toString());
                requestData.append('comment', productReview.comment);
                headers = { 'Content-Type': 'multipart/form-data' };
            } else {
                const { files, ...reviewData } = productReview;
                requestData = reviewData;
            }

            const response = await privateAxios.post<CreateProductReviewResponse>(
                `/api/product-reviews`,
                requestData,
                { headers }
            );
            return response.data;
        } catch (error) {
            throw error as Error;
        }
        finally {
            setIsLoading(false);
        }
    }, []);

    const updateProductReview = useCallback(async (productReview: UpdateProductReviewRequest) => {
        setIsLoading(true);
        try {
            let requestData: FormData | Omit<UpdateProductReviewRequest, 'files' | 'id'>;
            requestData = new FormData();
            let headers = { 'Content-Type': 'multipart/form-data' };

            if (productReview.files && productReview.files.length > 0) {
                productReview.files.forEach((file) => {
                    (requestData as FormData).append('files', file);
                });
            }
            if (productReview.variant_id) {
                requestData.append('variant_id', productReview.variant_id);
            }
            requestData.append('rating', productReview.rating.toString());
            requestData.append('comment', productReview.comment);
            requestData.append('previous_images', JSON.stringify(productReview.previous_images));


            const response = await privateAxios.patch<UpdateProductReviewResponse>(
                `/api/product-reviews/${productReview.id}`,
                requestData,
                { headers }
            );
            return response.data;
        } catch (error) {
            throw error as Error;
        }
        finally {
            setIsLoading(false);
        }
    }, []);

    const deleteProductReview = useCallback(async (productReviewId: string) => {
        setIsLoading(true);
        try {
            const response = await privateAxios.delete<DeleteProductReviewResponse>(`/api/product-reviews/${productReviewId}`);
            return response.data;
        } catch (error) {
            throw error as Error;
        }
        finally {
            setIsLoading(false);
        }
    }, []);

    return {
        getProductReviews,
        createProductReview,
        updateProductReview,
        deleteProductReview,
        isLoading,
    }
}