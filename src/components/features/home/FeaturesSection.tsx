import { Package, Wallet, Headphones } from "lucide-react"

export default function FeaturesSection() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-6 text-center">
        <div>
          <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-800">
            <Package className="w-8 h-8 text-green-800" />
          </div>
          <h4 className="font-bold text-gray-800 mb-2">Free Shipping</h4>
          <p className="text-sm text-gray-600">Free shipping for order above $180</p>
        </div>
        <div>
          <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-800">
            <Wallet className="w-8 h-8 text-green-800" />
          </div>
          <h4 className="font-bold text-gray-800 mb-2">Flexible Payment</h4>
          <p className="text-sm text-gray-600">Multiple secure payment options</p>
        </div>
        <div>
          <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-800">
            <Headphones className="w-8 h-8 text-green-800" />
          </div>
          <h4 className="font-bold text-gray-800 mb-2">24x7 Support</h4>
          <p className="text-sm text-gray-600">We support online all days.</p>
        </div>
      </div>
    </section>
  )
}
