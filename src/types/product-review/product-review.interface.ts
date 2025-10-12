import { ApiResponse } from "../base.interface";
import { Product, Variant } from "../product/product.interface";
import { User } from "../user/user.interface";

export interface ProductReview {
    id: string;
    product_id: string;
    product?: Product;
    user_id: string;
    user?: User;
    variant_id: string | null;
    variant?: Variant | null;
    rating: number;
    comment: string;
    created_at: string;
    updated_at: string | null;
    images: string[] | null;
}

export interface CreateProductReviewRequest {
    files?: File[];
    product_id: string;
    variant_id?: string;
    rating: number;
    comment: string;
}

export interface UpdateProductReviewRequest {
    id: string;
    variant_id?: string;
    files?: File[];
    rating: number;
    comment: string;
    previous_images: string[];
}

export interface DeleteProductReviewResponse extends ApiResponse {
    data: ProductReview;
}

export interface GetProductReviewsResponse extends ApiResponse {
    data: ProductReview[];
}

export interface CreateProductReviewResponse extends ApiResponse {
    data: ProductReview;
}

export interface UpdateProductReviewResponse extends ApiResponse {
    data: ProductReview;
}

export interface DeleteProductReviewResponse extends ApiResponse {
    data: ProductReview;
}
