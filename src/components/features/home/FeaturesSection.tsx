import { Package, Wallet, Headphones } from "lucide-react"
import { motion } from "framer-motion"

export default function FeaturesSection() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-br from-violet-50/40 via-fuchsia-50/30 to-pink-50/40 py-12 sm:py-16 md:py-20 overflow-hidden"
    >
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-gradient-to-br from-violet-200 to-purple-200 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 right-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full blur-3xl opacity-20" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-6 relative z-10">
        <div className="group hover:scale-105 transition-transform duration-300">
          <div className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-lg hover:shadow-2xl transition-all">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:shadow-xl group-hover:rotate-6 transition-all">
              <Package className="w-10 h-10 text-white" />
            </div>
            <h4 className="font-bold text-slate-900 text-lg mb-2">Free Shipping</h4>
            <p className="text-gray-600">Free shipping for order above $180</p>
          </div>
        </div>
        <div className="group hover:scale-105 transition-transform duration-300">
          <div className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-lg hover:shadow-2xl transition-all">
            <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-lg group-hover:shadow-xl group-hover:rotate-6 transition-all">
              <Wallet className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
            </div>
            <h4 className="font-bold text-slate-900 text-base sm:text-lg mb-2">Flexible Payment</h4>
            <p className="text-sm sm:text-base text-gray-600">Multiple secure payment options</p>
          </div>
        </div>
        <div className="group hover:scale-105 transition-transform duration-300 sm:col-span-2 md:col-span-1">
          <div className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-lg hover:shadow-2xl transition-all">
            <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-lg group-hover:shadow-xl group-hover:rotate-6 transition-all">
              <Headphones className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
            </div>
            <h4 className="font-bold text-slate-900 text-base sm:text-lg mb-2">24/7 Support</h4>
            <p className="text-sm sm:text-base text-gray-600">We support online all days</p>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
