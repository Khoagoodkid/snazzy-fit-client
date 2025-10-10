import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function PromotionalCardsSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Promotional Card */}
          <Card className="bg-white border-2 border-green-200 rounded-xl overflow-hidden">
            <CardContent className="p-8">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <span className="text-green-600 font-semibold text-sm">Flat 20% Discount</span>
                  <h3 className="text-2xl font-bold text-gray-800 mt-2 mb-4">Latest Summer Collection</h3>
                  <p className="text-gray-600 mb-6">
                    Discover our newest summer fashion trends with comfortable and stylish pieces perfect for warm weather.
                  </p>
                  <Button className="bg-green-800 hover:bg-green-700 text-white px-6 py-2 rounded-lg">
                    Shop Now →
                  </Button>
                </div>
                <div className="ml-6">
                  <img 
                    src="https://images.unsplash.com/photo-1523359346063-d879354c0ea5?auto=format&fit=crop&w=200&q=80" 
                    alt="Summer Collection"
                    className="w-48 h-48 object-cover rounded-lg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Promotional Card */}
          <Card className="bg-yellow-400 border-2 border-yellow-500 rounded-xl overflow-hidden">
            <CardContent className="p-8">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <span className="text-yellow-800 font-semibold text-sm">Flat 15% Discount</span>
                  <h3 className="text-2xl font-bold text-gray-800 mt-2 mb-4">Formal Wear Collection</h3>
                  <p className="text-gray-700 mb-6">
                    Elevate your professional wardrobe with our premium formal wear collection designed for success.
                  </p>
                  <Button className="bg-green-800 hover:bg-green-700 text-white px-6 py-2 rounded-lg">
                    Shop Now →
                  </Button>
                </div>
                <div className="ml-6">
                  <img 
                    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=200&q=80" 
                    alt="Formal Wear Collection"
                    className="w-48 h-48 object-cover rounded-lg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
