import { Product } from "../product/product.interface";

export interface GetCategoriesQuery {
    limit?: number;
    offset?: number;
    keyword?: string;

}

export interface GetCategoriesResponse {
    data: Category[];

}

export interface Category {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
    products?: Product[];
}
