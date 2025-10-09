import { ApiResponse } from "../base.interface";
import { Category } from "../categories/categories.interface";


export interface GetProductsQuery {
    limit?: number;
    offset?: number;
    keyword?: string;
    collection_id?: string;
    category_id?: string;
    price_from?: number;
    price_to?: number;
    sort?: string;
}

export interface GetProductsResponse extends ApiResponse {
    data: {
        products: Product[];
        maxPrice: number;
    }

}

export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    brand: string;
    category: Category;
    gender: string;
    basePrice: number;
    discount: number;
    currency: string;
    mainImage: string | null;
    images: string[] | null;
    isFeatured: boolean;
    isActive: boolean;
    tags: string[];
    ratingAvg: number;
    ratingCount: number;
    variants: Variant[];
    created_at: string;
    updated_at: string;
}

export interface Variant {
    id: string;
    color: string;
    size: string;
    stock: number;
    price: number;
    images: string[];
    product?: Product;
    productId: string;
}
