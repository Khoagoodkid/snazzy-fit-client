import { Instagram, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function InstagramSection() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-br from-amber-50/30 via-orange-50/20 to-yellow-50/30 py-20 overflow-hidden"
    >
      {/* Warm Gradient Blobs */}
      <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-1/4 left-1/3 w-[450px] h-[450px] bg-gradient-to-br from-yellow-200/30 to-amber-200/30 rounded-full blur-3xl opacity-40" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-xs rounded-full mb-3">
            Follow Us
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Follow Us <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">On Instagram</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our community and get daily style inspiration @snazzyfit
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            'https://images.unsplash.com/photo-1483985028355-82c1d93eea48?auto=format&fit=crop&w=300&q=80',
            'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=300&q=80',
            'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=300&q=80',
            'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=300&q=80',
            'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=300&q=80'
          ].map((src, i) => (
            <div key={i} className="aspect-square rounded-2xl relative overflow-hidden group cursor-pointer">
              <img 
                src={src} 
                alt={`Instagram Post ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-purple-500/0 group-hover:from-pink-500/80 group-hover:to-purple-500/80 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-3 text-white">
                  <div className="flex items-center gap-1">
                    <Heart className="w-5 h-5 fill-white" />
                    <span className="font-bold">{Math.floor(Math.random() * 500) + 100}</span>
                  </div>
                  <Instagram className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all">
            <Instagram className="w-5 h-5 mr-2 inline" />
            Follow @snazzyfit
          </Button>
        </div>
      </div>
    </motion.section>
  )
}
