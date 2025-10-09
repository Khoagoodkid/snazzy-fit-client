
import { User } from "../user/user.interface";
import { Variant } from "../product/product.interface";

export interface CartItem {
    id: string;
    user?: User;
    user_id: string;
    variant?: Variant;
    variant_id: string;
    quantity: number;
    created_at: string;
    updated_at: string | null;
}

export interface GetCartResponse {
    data: CartItem[];
}

export interface UpdateCartRequest {
    quantity: number;
}
