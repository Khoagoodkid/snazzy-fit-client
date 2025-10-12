import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Tag, TrendingUp } from "lucide-react"

const promotions = [
    {
        title: "Summer Collection",
        discount: "30%",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=100&q=80",
        gradient: "from-cyan-500 to-teal-600",
        icon: Sparkles
    },
    {
        title: "Accessories Sale",
        discount: "20%",
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=100&q=80",
        gradient: "from-emerald-500 to-green-600",
        icon: Tag
    },
    {
        title: "Footwear Deals",
        discount: "40%",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c65f8?auto=format&fit=crop&w=100&q=80",
        gradient: "from-amber-500 to-orange-600",
        icon: TrendingUp
    }
]

export default function PromotionBanner() {
    return (
        <div className="grid md:grid-cols-3 gap-6">
            {promotions.map((promo, index) => {
                const Icon = promo.icon
                return (
                    <Card
                        key={index}
                        className={`relative bg-gradient-to-br ${promo.gradient} rounded-2xl overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all group cursor-pointer`}
                    >
                        {/* Pattern Overlay */}
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyek0zNCAzMGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
                        
                        <CardContent className="p-6 relative z-10">
                            <div className="flex items-center justify-between">
                                <div className="flex-1 text-white">
                                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-bold text-lg mb-1 group-hover:translate-x-1 transition-transform">{promo.title}</h3>
                                    <p className="text-2xl font-bold text-white/90">Up To -{promo.discount}</p>
                                </div>
                                <img
                                    src={promo.image}
                                    alt={promo.title}
                                    className="w-20 h-20 object-cover rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}

