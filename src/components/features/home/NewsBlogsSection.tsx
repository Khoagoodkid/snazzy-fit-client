import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function NewsBlogsSection() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-br from-lime-50/30 via-emerald-50/20 to-teal-50/30 py-20 overflow-hidden"
    >
      {/* Vibrant Background Blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-lime-200/30 to-emerald-200/30 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-teal-200/30 to-cyan-200/30 rounded-full blur-3xl opacity-40" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <span className="inline-block px-3 py-1 bg-slate-800 text-white font-bold text-xs rounded-full mb-3">News & Blogs</span>
            <h2 className="text-4xl font-bold text-slate-900">
              Our Latest <span className="bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">News & Insights</span>
            </h2>
          </div>
          <Button className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg">
            View All Blogs <ArrowRight className="w-4 h-4 ml-2 inline" />
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Blog Post 1 */}
          <Card className="group hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden border-0">
            <CardContent className="p-0">
              <div className="relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1483985028355-82c1d93eea48?auto=format&fit=crop&w=400&q=80" 
                  alt="Fashion Trends 2024"
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              </div>
              <div className="p-6">
                <div className="inline-flex items-center gap-2 text-cyan-600 text-xs font-semibold mb-3">
                  <Calendar className="w-3 h-3" />
                  15 April 2024
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-3 line-clamp-2">Fashion Trends 2024: What's Hot and What's Not</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  Discover the latest fashion trends and must-have pieces for the upcoming season. Stay ahead of the curve with our expert insights.
                </p>
                <button className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 hover:gap-3 transition-all font-semibold text-sm">
                  Read More <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Blog Post 2 */}
          <Card className="group hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden border-0">
            <CardContent className="p-0">
              <div className="relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=400&q=80" 
                  alt="Complete Style Guide"
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              </div>
              <div className="p-6">
                <div className="inline-flex items-center gap-2 text-emerald-600 text-xs font-semibold mb-3">
                  <Calendar className="w-3 h-3" />
                  12 April 2024
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-3 line-clamp-2">Complete Style Guide for Every Season</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  Master the art of seasonal dressing with our comprehensive guide to building a versatile wardrobe year-round.
                </p>
                <button className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 hover:gap-3 transition-all font-semibold text-sm">
                  Read More <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Blog Post 3 */}
          <Card className="group hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden border-0">
            <CardContent className="p-0">
              <div className="relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=400&q=80" 
                  alt="Capsule Wardrobe Tips"
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              </div>
              <div className="p-6">
                <div className="inline-flex items-center gap-2 text-teal-600 text-xs font-semibold mb-3">
                  <Calendar className="w-3 h-3" />
                  10 April 2024
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-3 line-clamp-2">How to Build a Capsule Wardrobe</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  Learn how to create a minimalist wardrobe with essential pieces that work together seamlessly for any occasion.
                </p>
                <button className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 hover:gap-3 transition-all font-semibold text-sm">
                  Read More <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.section>
  )
}
