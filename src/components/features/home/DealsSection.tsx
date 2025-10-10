import { Card, CardContent } from "@/components/ui/card"
import { Heart, Share, X, Star } from "lucide-react"

export default function DealsSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <p className="text-sm text-gray-500 mb-2">Today Deals</p>
            <h2 className="text-3xl font-bold text-green-800">Deals of the Day</h2>
          </div>
          <p className="text-gray-600 max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Product Card 1 */}
          <Card className="bg-white rounded-xl overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80" 
                  alt="Premium Cotton T-Shirt"
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded">20% off</span>
                <div className="absolute top-3 right-3 flex gap-2">
                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Share className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Premium Cotton T-Shirt</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-green-800">$24.00</span>
                  <span className="text-sm text-gray-500 line-through">$30.00</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600">5.0</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Comfortable and stylish everyday wear</p>
                <a href="#" className="text-green-800 text-sm font-medium">Shop Now →</a>
              </div>
            </CardContent>
          </Card>

          {/* Product Card 2 */}
          <Card className="bg-white rounded-xl overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=400&q=80" 
                  alt="Classic Blue Jeans"
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded">20% off</span>
                <div className="absolute top-3 right-3 flex gap-2">
                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Share className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Classic Blue Jeans</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-green-800">$56.00</span>
                  <span className="text-sm text-gray-500 line-through">$70.00</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600">4.8</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Perfect fit for any occasion</p>
                <a href="#" className="text-green-800 text-sm font-medium">Shop Now →</a>
              </div>
            </CardContent>
          </Card>

          {/* Product Card 3 */}
          <Card className="bg-white rounded-xl overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80" 
                  alt="Cozy Winter Hoodie"
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded">20% off</span>
                <div className="absolute top-3 right-3 flex gap-2">
                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Share className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Cozy Winter Hoodie</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-green-800">$68.00</span>
                  <span className="text-sm text-gray-500 line-through">$85.00</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600">4.9</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Warm and comfortable for cold days</p>
                <a href="#" className="text-green-800 text-sm font-medium">Shop Now →</a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
