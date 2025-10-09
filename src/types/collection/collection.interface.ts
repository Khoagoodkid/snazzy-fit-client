import { Category } from "../categories/categories.interface";
import { Product } from "../product/product.interface";

export interface GetCollectionsQuery {
    limit?: number;
    offset?: number;
    keyword?: string;

}

export interface GetCollectionsResponse {
    data: Collection[];

}

export interface GetCollectionWithCategoriesResponse {
    data: CollectionWithCategories[];
}

export interface CollectionWithCategories {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
    products?: Product[];
    categories: Category[];
}

export interface Collection {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
    products?: Product[];
}
