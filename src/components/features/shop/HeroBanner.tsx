import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import ProductImage from "@/components/ui/product-image"

export default function HeroBanner() {
    return (
        <div className="relative bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl overflow-hidden h-96 shadow-2xl">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyek0zNCAzMGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
            
            {/* Decorative Gradient */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-400/30 to-teal-400/30 rounded-full blur-3xl" />

            <div className="relative z-10 flex items-center justify-between p-12 h-full">
                <div className="flex-1 text-white">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-sm mb-6">
                        <Sparkles className="w-4 h-4" />
                        NEW COLLECTION
                    </div>
                    <h2 className="text-5xl font-bold mb-4">
                        Fashion Forward
                    </h2>
                    <p className="text-2xl text-white/90 mb-4">
                        Discover the latest trends
                    </p>
                    <p className="text-lg text-white/70 mb-8">
                        Dresses, Tops, Shoes, Bags & More...
                    </p>
                    <Button className="bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-500 hover:to-teal-600 text-white font-bold px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all">
                        Shop Collection →
                    </Button>
                </div>
                <div className="flex-1 flex justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-teal-400/20 rounded-3xl blur-2xl" />
                    <div className="w-80 h-80 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300 relative z-10 overflow-hidden">
                        <ProductImage
                            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80"
                            alt="Fashion Collection"
                            width={400}
                            height={400}
                            className=""
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

