import { Product } from "@/types/product/product.interface"

export const getProductUrl = (product: Product | null) => {
    if (!product) return "/";
    return `/collections/${product.collection?.name.toLowerCase()}/${product.category?.name.toLowerCase()}/${product.slug}`
}