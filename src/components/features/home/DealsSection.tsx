import { Card, CardContent } from "@/components/ui/card"
import { Heart, Share, ShoppingCart, Star } from "lucide-react"
import { motion } from "framer-motion"

export default function DealsSection() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-br from-blue-50/30 via-indigo-50/20 to-purple-50/30 py-20 overflow-hidden"
    >
      {/* Soft Background Blobs */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-gradient-to-br from-blue-200/40 to-indigo-200/40 rounded-full blur-3xl opacity-40 -z-10" />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-gradient-to-br from-purple-200/40 to-pink-200/40 rounded-full blur-3xl opacity-40 -z-10" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <span className="inline-block px-3 py-1 bg-cyan-100 text-cyan-800 font-bold text-xs rounded-full mb-3">Today's Specials</span>
            <h2 className="text-4xl font-bold text-slate-900">Deals of the Day</h2>
          </div>
          <p className="text-gray-600 max-w-md">
            Discover amazing deals on trending fashion items. Limited stock available - grab them while they last!
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Product Card 1 */}
          <Card className="group hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden border-0">
            <CardContent className="p-0">
              <div className="relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80" 
                  alt="Premium Cotton T-Shirt"
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                <span className="absolute top-4 left-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">20% OFF</span>
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
                    <Heart className="w-4 h-4 text-slate-700" />
                  </button>
                  <button className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
                    <ShoppingCart className="w-4 h-4 text-slate-700" />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-slate-900 text-lg mb-2">Premium Cotton T-Shirt</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl font-bold text-slate-900">$24.00</span>
                  <span className="text-sm text-gray-400 line-through">$30.00</span>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">(5.0)</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Comfortable and stylish everyday wear</p>
                <button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl transition-colors">
                  Add to Cart
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Product Card 2 */}
          <Card className="group hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden border-0">
            <CardContent className="p-0">
              <div className="relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=400&q=80" 
                  alt="Classic Blue Jeans"
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                <span className="absolute top-4 left-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">20% OFF</span>
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
                    <Heart className="w-4 h-4 text-slate-700" />
                  </button>
                  <button className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
                    <ShoppingCart className="w-4 h-4 text-slate-700" />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-slate-900 text-lg mb-2">Classic Blue Jeans</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl font-bold text-slate-900">$56.00</span>
                  <span className="text-sm text-gray-400 line-through">$70.00</span>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                  <Star className="w-4 h-4 text-gray-300" />
                  <span className="text-sm text-gray-600 ml-1">(4.8)</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Perfect fit for any occasion</p>
                <button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl transition-colors">
                  Add to Cart
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Product Card 3 */}
          <Card className="group hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden border-0">
            <CardContent className="p-0">
              <div className="relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80" 
                  alt="Cozy Winter Hoodie"
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                <span className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">20% OFF</span>
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
                    <Heart className="w-4 h-4 text-slate-700" />
                  </button>
                  <button className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
                    <ShoppingCart className="w-4 h-4 text-slate-700" />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-slate-900 text-lg mb-2">Cozy Winter Hoodie</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl font-bold text-slate-900">$68.00</span>
                  <span className="text-sm text-gray-400 line-through">$85.00</span>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">(4.9)</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Warm and comfortable for cold days</p>
                <button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl transition-colors">
                  Add to Cart
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.section>
  )
}
