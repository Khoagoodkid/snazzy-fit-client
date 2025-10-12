import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { Product } from "@/types/product/product.interface"
import { useRouter } from "next/navigation"
import ProductImage from "@/components/ui/product-image"

interface DealCardProps {
    deal: Product
}

export default function DealCard({ deal }: DealCardProps) {
    const router = useRouter()
    const discountedPrice = deal.basePrice * (1 - (deal.discount || 0) / 100)
    const totalStock = deal.variants.reduce((acc, variant) => acc + variant.stock, 0)
    const soldPercentage = 50 // Mock sold percentage

    return (
        <Card className="group hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden border-0">
            <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative overflow-hidden h-72">
                        <ProductImage
                            src={deal.mainImage || ""}
                            alt={deal.name}
                            width={400}
                            height={400}
                            className="group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                        <span className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                            -{deal.discount}% OFF
                        </span>
                    </div>
                    
                    <div className="p-6 flex flex-col justify-between">
                        <div>
                            <div className="inline-block px-3 py-1 bg-cyan-100 text-cyan-800 font-bold text-xs rounded-full mb-3">
                                LIMITED TIME
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">{deal.name}</h3>
                            <p className="text-gray-600 mb-4 line-clamp-3">
                                {deal.description || "Premium quality product with exceptional design and comfort"}
                            </p>
                            
                            <div className="flex items-baseline gap-2 mb-6">
                                <span className="text-3xl font-bold text-slate-900">
                                    ${discountedPrice.toFixed(2)}
                                </span>
                                <span className="text-lg text-gray-400 line-through">
                                    ${deal.basePrice.toFixed(2)}
                                </span>
                            </div>

                            {/* Stock Progress */}
                            <div className="mb-6">
                                <div className="flex justify-between text-sm text-gray-600 mb-2">
                                    <span className="font-medium">Hurry! Only {totalStock} left</span>
                                    <span>{soldPercentage}% sold</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className="bg-gradient-to-r from-cyan-500 to-teal-500 h-2.5 rounded-full transition-all duration-500"
                                        style={{ width: `${soldPercentage}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={() => router.push(`/collections/${deal.collection.name}/${deal.category.name}/${deal.slug}`)}
                            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                        >
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            Add To Cart
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

