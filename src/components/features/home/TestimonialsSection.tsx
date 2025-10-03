import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function TestimonialsSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm text-gray-500 mb-2">Testimonials</p>
        <h2 className="text-3xl font-bold text-gray-800 mb-12">What Our Clients Say</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Testimonial 1 */}
          <Card className="bg-white rounded-xl p-8 text-left">
            <CardContent className="p-0">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                  <span className="text-gray-600 font-semibold">LA</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Leslie Alexander</h4>
                  <p className="text-sm text-gray-600">Fashion Blogger & Influencer</p>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600">5.0</span>
                </div>
              </div>
              <div className="relative">
                <div className="text-6xl text-gray-300 absolute -top-4 -left-2">"</div>
                <p className="text-gray-700 relative z-10 pl-8">
                  SnazzyFit has completely transformed my wardrobe! The quality is exceptional and the styles are always on-trend. I've been shopping here for months and never been disappointed.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Testimonial 2 */}
          <Card className="bg-white rounded-xl p-8 text-left">
            <CardContent className="p-0">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                  <span className="text-gray-600 font-semibold">JW</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Jenny Wilson</h4>
                  <p className="text-sm text-gray-600">Stylist & Fashion Consultant</p>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600">5.0</span>
                </div>
              </div>
              <div className="relative">
                <div className="text-6xl text-gray-300 absolute -top-4 -left-2">"</div>
                <p className="text-gray-700 relative z-10 pl-8">
                  As a professional stylist, I recommend SnazzyFit to all my clients. Their collection offers the perfect balance of style, comfort, and affordability. The customer service is outstanding!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
