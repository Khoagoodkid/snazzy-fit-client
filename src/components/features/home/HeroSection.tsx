import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-md text-xs font-semibold mb-4">
          <span>👕</span>
          <span>The Best Online Fashion Store</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-green-900 leading-tight mb-4">
          Explore Our Modern <br /> Fashion Collection
        </h1>
        <p className="text-gray-600 mb-6">
          Discover the latest trends in fashion with our curated collection of stylish clothing for every occasion.
        </p>
        <div className="flex gap-4 mb-6">
          <Button className="bg-green-800 hover:bg-green-700 text-white rounded-full px-6 py-2">
            Shop Now →
          </Button>
          <Button variant="ghost" className="text-gray-700 underline px-6 py-2">
            View All Products
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center text-xs font-semibold">
                {i}
              </div>
            ))}
            <div className="w-8 h-8 bg-yellow-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
              +
            </div>
          </div>
          <div className="text-sm text-gray-700">
            <div className="font-bold">4.9 Ratings+</div>
            <div className="text-xs">Trusted by 50k+ Customers</div>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="flex gap-6 overflow-x-auto pb-4">
          {/* Men's Collection Card */}
          <Card className="min-w-[280px] flex-shrink-0">
            <CardContent className="p-0">
              <div className="relative w-full h-64">
                <img 
                  src="https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=400&q=80" 
                  alt="Men's Collection"
                  className="w-full h-full object-cover rounded-t-xl"
                />
                <span className="absolute top-3 right-3 bg-white text-sm px-2 py-1 rounded shadow-sm">$89</span>
                <button className="absolute top-3 right-12 bg-green-800 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">
                  ×
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">Men's Collection</h3>
                <p className="text-gray-500 text-sm">1,200+ Items</p>
              </div>
            </CardContent>
          </Card>

          {/* Women's Collection Card */}
          <Card className="min-w-[280px] flex-shrink-0">
            <CardContent className="p-0">
              <div className="relative w-full h-64">
                <img 
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80" 
                  alt="Women's Collection"
                  className="w-full h-full object-cover rounded-t-xl"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">Women's Collection</h3>
                <p className="text-gray-500 text-sm">1,800+ Items</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Carousel Navigation */}
        <div className="flex justify-center gap-2 mt-4">
          <button className="w-10 h-10 bg-green-800 text-white rounded-full flex items-center justify-center">
            ←
          </button>
          <button className="w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center">
            →
          </button>
        </div>
      </div>
    </section>
  )
}
