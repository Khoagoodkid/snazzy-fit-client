import { Button } from "@/components/ui/button"

export default function FlashSaleSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-green-800 mb-2">Flash Sale!</h2>
            <p className="text-lg text-gray-600 mb-6">Get 25% off - Limited Time Offer!</p>
            <div className="flex gap-4 mb-8 text-center">
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-800">04</div>
                <div className="text-sm text-gray-600">Days</div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-800">14</div>
                <div className="text-sm text-gray-600">Hours</div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-800">48</div>
                <div className="text-sm text-gray-600">Minutes</div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-800">18</div>
                <div className="text-sm text-gray-600">Seconds</div>
              </div>
            </div>
            <Button className="bg-green-800 hover:bg-green-700 text-white px-8 py-3 rounded-lg">
              Shop Now →
            </Button>
          </div>
          <div className="flex gap-4">
            <div className="w-48 h-64 bg-gray-200 rounded-xl flex items-center justify-center">
              <span className="text-gray-500">Casual Wear Collection</span>
            </div>
            <div className="w-48 h-64 bg-gray-200 rounded-xl flex items-center justify-center mt-8">
              <span className="text-gray-500">Formal Wear Collection</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
