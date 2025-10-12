import { Card, CardContent } from "@/components/ui/card"
import { Category } from "@/types/categories/categories.interface"
import { ArrowRight } from "lucide-react"
import ProductImage from "@/components/ui/product-image"

interface CategoryCardProps {
    category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
    const gradients = [
        "from-cyan-400 to-teal-500",
        "from-emerald-400 to-green-500",
        "from-amber-400 to-orange-500",
        "from-pink-400 to-purple-500",
        "from-slate-600 to-slate-700"
    ]

    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)]

    return (
        <Card className="group hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden border-0 cursor-pointer">
            <CardContent className="p-0">
                <div className="relative h-40 overflow-hidden">
                    <ProductImage
                        src=""
                        alt={category.name}
                        width={200}
                        height={200}
                        className="group-hover:scale-110 transition-transform duration-500"
                        fallbackClassName="bg-gradient-to-br from-slate-100 to-gray-200"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${randomGradient} opacity-60 group-hover:opacity-70 transition-opacity`} />
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                            <h3 className="font-bold text-xl mb-1 group-hover:scale-110 transition-transform">{category.name}</h3>
                            <p className="text-sm text-white/90">{category.products?.length || 0} Products</p>
                        </div>
                    </div>

                    <div className="absolute bottom-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                        <ArrowRight className="w-4 h-4 text-slate-700" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

