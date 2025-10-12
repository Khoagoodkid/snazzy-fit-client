import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Heart, ShoppingCart } from "lucide-react"
import { Product } from "@/types/product/product.interface"
import { useRouter } from "next/navigation"
import ProductImage from "@/components/ui/product-image"

interface ProductCardProps {
    product: Product
    showAddToCart?: boolean
}

export default function ProductCard({ product, showAddToCart = true }: ProductCardProps) {
    const router = useRouter()

    const handleViewProduct = () => {
        router.push(`/collections/${product.collection.name}/${product.category.name}/${product.slug}`)
    }

    const discountedPrice = product.basePrice * (1 - (product.discount || 0) / 100)

    return (
        <Card className="group hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden border-0">
            <CardContent className="p-0">
                <div className="relative overflow-hidden h-56">
                    <ProductImage
                        src={product.mainImage || ""}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                    
                    {product.discount > 0 && (
                        <span className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                            -{product.discount}%
                        </span>
                    )}

                    {/* Hover Actions */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
                            <Heart className="w-4 h-4 text-slate-700" />
                        </button>
                        {showAddToCart && (
                            <button className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
                                <ShoppingCart className="w-4 h-4 text-slate-700" />
                            </button>
                        )}
                    </div>
                </div>

                <div className="p-5">
                    <h3 className="font-bold text-slate-900 text-lg mb-2 line-clamp-1">{product.name}</h3>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${i <= Math.floor(product.ratingAvg) ? "text-amber-400 fill-amber-400" : "text-gray-300"}`}
                            />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">({product.ratingCount})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-2xl font-bold text-slate-900">
                            ${discountedPrice.toFixed(2)}
                        </span>
                        {product.discount > 0 && (
                            <span className="text-sm text-gray-400 line-through">
                                ${product.basePrice.toFixed(2)}
                            </span>
                        )}
                    </div>

                    <Button
                        onClick={handleViewProduct}
                        className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl transition-colors"
                    >
                        View Product
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

