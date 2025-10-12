import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { motion } from "framer-motion"

export default function TestimonialsSection() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-br from-sky-50/40 via-cyan-50/30 to-teal-50/40 py-20 overflow-hidden"
    >
      {/* Soft Gradient Blobs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-br from-sky-200/30 to-cyan-200/30 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-1/4 right-1/3 w-[450px] h-[450px] bg-gradient-to-br from-teal-200/30 to-emerald-200/30 rounded-full blur-3xl opacity-40" />
      <div className="max-w-7xl mx-auto px-6 text-center">
        <span className="inline-block px-3 py-1 bg-slate-100 text-slate-800 font-bold text-xs rounded-full mb-3">Testimonials</span>
        <h2 className="text-4xl font-bold text-slate-900 mb-4">What Our Clients Say</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Don't just take our word for it - hear from our satisfied customers who love their Snazzy Fit experience
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Testimonial 1 */}
          <Card className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 text-left border border-gray-100 shadow-lg hover:shadow-2xl transition-all group">
            <CardContent className="p-0">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-full flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-white font-bold text-lg">LA</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Leslie Alexander</h4>
                    <p className="text-sm text-gray-500">Fashion Blogger & Influencer</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
              <div className="relative">
                <Quote className="w-12 h-12 text-cyan-200 absolute -top-2 -left-2" />
                <p className="text-gray-700 relative z-10 pl-10 text-base leading-relaxed">
                  SnazzyFit has completely transformed my wardrobe! The quality is exceptional and the styles are always on-trend. I've been shopping here for months and never been disappointed.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Testimonial 2 */}
          <Card className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 text-left border border-gray-100 shadow-lg hover:shadow-2xl transition-all group">
            <CardContent className="p-0">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-green-400 rounded-full flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-white font-bold text-lg">JW</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Jenny Wilson</h4>
                    <p className="text-sm text-gray-500">Stylist & Fashion Consultant</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
              <div className="relative">
                <Quote className="w-12 h-12 text-emerald-200 absolute -top-2 -left-2" />
                <p className="text-gray-700 relative z-10 pl-10 text-base leading-relaxed">
                  As a professional stylist, I recommend SnazzyFit to all my clients. Their collection offers the perfect balance of style, comfort, and affordability. The customer service is outstanding!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.section>
  )
}
