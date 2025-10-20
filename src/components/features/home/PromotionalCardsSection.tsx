import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export default function PromotionalCardsSection() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-br from-rose-50/30 via-pink-50/20 to-fuchsia-50/30 py-12 sm:py-16 md:py-20 overflow-hidden"
    >
      {/* Vibrant Soft Blobs */}
      <div className="absolute top-1/3 left-1/4 w-80 sm:w-96 md:w-[500px] h-80 sm:h-96 md:h-[500px] bg-gradient-to-br from-rose-200/30 to-pink-200/30 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-1/3 right-1/4 w-64 sm:w-80 md:w-[450px] h-64 sm:h-80 md:h-[450px] bg-gradient-to-br from-fuchsia-200/30 to-purple-200/30 rounded-full blur-3xl opacity-50" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Left Promotional Card */}
          <Card className="relative bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl overflow-hidden border-0 shadow-2xl group">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyek0zNCAzMGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
            <CardContent className="p-10 relative z-10">
              <div className="flex justify-between items-center">
                <div className="flex-1 text-white">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold mb-4">
                    <Sparkles className="w-3 h-3" />
                    FLAT 20% OFF
                  </div>
                  <h3 className="text-3xl font-bold mt-2 mb-4">Latest Summer Collection</h3>
                  <p className="text-white/90 mb-6 leading-relaxed">
                    Discover our newest summer fashion trends with comfortable and stylish pieces perfect for warm weather.
                  </p>
                  <Button className="bg-white text-cyan-700 hover:bg-gray-50 font-bold px-6 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all group-hover:scale-105">
                    Shop Now <ArrowRight className="w-4 h-4 ml-2 inline" />
                  </Button>
                </div>
                <div className="ml-6">
                  <img 
                    src="https://images.unsplash.com/photo-1523359346063-d879354c0ea5?auto=format&fit=crop&w=200&q=80" 
                    alt="Summer Collection"
                    className="w-56 h-56 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Promotional Card */}
          <Card className="relative bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl overflow-hidden border-0 shadow-2xl group">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyek0zNCAzMGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
            <CardContent className="p-10 relative z-10">
              <div className="flex justify-between items-center">
                <div className="flex-1 text-white">
                  <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-900 px-3 py-1.5 rounded-full text-xs font-bold mb-4">
                    <Sparkles className="w-3 h-3" />
                    FLAT 15% OFF
                  </div>
                  <h3 className="text-3xl font-bold mt-2 mb-4">Formal Wear Collection</h3>
                  <p className="text-white/90 mb-6 leading-relaxed">
                    Elevate your professional wardrobe with our premium formal wear collection designed for success.
                  </p>
                  <Button className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-900 font-bold px-6 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all group-hover:scale-105">
                    Shop Now <ArrowRight className="w-4 h-4 ml-2 inline" />
                  </Button>
                </div>
                <div className="ml-6">
                  <img 
                    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=200&q=80" 
                    alt="Formal Wear Collection"
                    className="w-56 h-56 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.section>
  )
}
