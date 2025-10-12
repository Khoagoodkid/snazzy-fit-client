import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export default function HeroSection() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="relative max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-cyan-300 to-teal-300 rounded-full blur-3xl opacity-30 -z-10 animate-pulse" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-gradient-to-br from-emerald-300 to-green-300 rounded-full blur-3xl opacity-30 -z-10 animate-pulse" style={{ animationDelay: "1s" }} />

      <div>
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-700 text-white px-4 py-2 rounded-full text-xs font-semibold mb-6 shadow-lg">
          <Sparkles className="w-4 h-4" />
          <span>The Best Online Fashion Store</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight mb-6">
          Explore Our Modern
          <span className="block bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
            Fashion Collection
          </span>
        </h1>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Discover the latest trends in fashion with our curated collection of stylish clothing for every occasion.
        </p>
        <div className="flex gap-4 mb-8">
          <Button className="bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all">
            Shop Now →
          </Button>
          <Button variant="outline" className="text-slate-700 border-slate-300 hover:bg-slate-50 rounded-full px-8 py-6 text-base font-semibold">
            View All Products
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-md">
                {i}
              </div>
            ))}
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full border-2 border-white flex items-center justify-center text-white text-sm font-bold shadow-md">
              +
            </div>
          </div>
          <div className="text-sm text-slate-700">
            <div className="font-bold flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              4.9 Ratings
            </div>
            <div className="text-xs text-gray-500">Trusted by 50k+ Customers</div>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="flex gap-6 overflow-x-auto pb-4">
          {/* Men's Collection Card */}
          <Card className="min-w-[300px] flex-shrink-0 group hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="relative w-full h-72 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=400&q=80" 
                  alt="Men's Collection"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <span className="absolute top-4 right-4 bg-white text-slate-900 text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">$89</span>
                <button className="absolute top-4 right-16 bg-slate-800 hover:bg-slate-700 text-white rounded-full w-9 h-9 flex items-center justify-center text-lg shadow-lg transition-colors">
                  ×
                </button>
              </div>
              <div className="p-5 bg-white">
                <h3 className="font-bold text-slate-900 text-lg">Men's Collection</h3>
                <p className="text-gray-500 text-sm mt-1">1,200+ Items</p>
              </div>
            </CardContent>
          </Card>

          {/* Women's Collection Card */}
          <Card className="min-w-[300px] flex-shrink-0 group hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="relative w-full h-72 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80" 
                  alt="Women's Collection"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <span className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-sm text-slate-900 text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">New Arrivals</span>
              </div>
              <div className="p-5 bg-white">
                <h3 className="font-bold text-slate-900 text-lg">Women's Collection</h3>
                <p className="text-gray-500 text-sm mt-1">1,800+ Items</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Carousel Navigation */}
        <div className="flex justify-center gap-3 mt-6">
          <button className="w-12 h-12 bg-slate-800 hover:bg-slate-700 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all">
            ←
          </button>
          <button className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all">
            →
          </button>
        </div>
      </div>
    </motion.section>
  )
}
