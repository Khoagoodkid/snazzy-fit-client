import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function CategoriesSection() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="relative max-w-7xl mx-auto px-6 py-20 overflow-hidden"
    >
      {/* Soft Background Gradient */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-amber-100/40 to-orange-100/40 rounded-full blur-3xl opacity-50 -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-cyan-100/40 to-teal-100/40 rounded-full blur-3xl opacity-50 -z-10" />
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">Shop by Category</h2>
        <p className="text-gray-600 text-lg">Explore our diverse collection across all categories</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Tops - Large Card */}
        <Card className="md:col-span-2 p-8 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl row-span-2 group hover:shadow-2xl transition-all duration-300 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10 flex justify-between items-start">
            <div className="flex-1 text-white">
              <span className="inline-block px-3 py-1 bg-amber-400 text-slate-900 font-bold text-xs rounded-full mb-3">1200+ Items</span>
              <h2 className="text-3xl font-bold mb-4">Tops</h2>
              <p className="text-white/80 text-sm mb-6 leading-relaxed">
                From casual t-shirts to elegant blouses, find the perfect top for any occasion
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm text-white/70 mb-6">
                <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" /> T-Shirts</div>
                <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" /> Blouses</div>
                <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-teal-400 rounded-full" /> Tank Tops</div>
                <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-teal-400 rounded-full" /> Hoodies</div>
                <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> Sweaters</div>
                <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> Polo Shirts</div>
              </div>
              <button className="inline-flex items-center gap-2 text-white hover:gap-3 transition-all font-semibold">
                Explore <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="ml-6">
              <img 
                src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80" 
                alt="Tops Collection"
                className="w-48 h-56 object-cover rounded-xl shadow-2xl group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </Card>

        {/* Bottoms - Top Right */}
        <Card className="p-6 bg-white rounded-2xl col-span-2 group hover:shadow-2xl transition-all duration-300 border-0">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <span className="inline-block px-3 py-1 bg-cyan-100 text-cyan-800 font-bold text-xs rounded-full mb-3">800+ Items</span>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Bottoms</h2>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-cyan-500 rounded-full" /> Jeans</div>
                <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-teal-500 rounded-full" /> Trousers</div>
                <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Shorts</div>
                <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Skirts</div>
              </div>
              <button className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 hover:gap-3 transition-all font-semibold text-sm">
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="ml-4">
              <img 
                src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=120&q=80" 
                alt="Bottoms Collection"
                className="w-28 h-36 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </Card>

        {/* Accessories - Bottom Right */}
        <Card className="p-6 bg-white rounded-2xl col-span-2 group hover:shadow-2xl transition-all duration-300 border-0">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full mb-3">500+ Items</span>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Accessories</h2>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-cyan-500 rounded-full" /> Bags</div>
                <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-teal-500 rounded-full" /> Jewelry</div>
                <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Belts</div>
                <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Scarves</div>
              </div>
              <button className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 hover:gap-3 transition-all font-semibold text-sm">
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="ml-4">
              <img 
                src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=120&q=80" 
                alt="Accessories Collection"
                className="w-28 h-36 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </Card>
      </div>
    </motion.section>
  )
}
