import { Card, CardContent } from "@/components/ui/card"

export default function CategoriesSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-4 gap-8">
        {/* Tops - Large Card */}
        <Card className="md:col-span-2 p-6 bg-white rounded-xl row-span-2">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-yellow-600 font-bold text-sm mb-2">1200+ Items</h3>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Tops</h2>
              <p className="text-gray-600 text-sm mb-4">
                From casual t-shirts to elegant blouses, find the perfect top for any occasion
              </p>
              <div className="grid grid-cols-2 gap-1 text-sm text-gray-600">
                <div>T-Shirts</div>
                <div>Blouses</div>
                <div>Tank Tops</div>
                <div>Hoodies</div>
                <div>Sweaters</div>
                <div>Polo Shirts</div>
                <div>Crop Tops</div>
                <div>Cardigans</div>
              </div>
            </div>
            <div className="ml-6">
              <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Tops Image</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Bottoms - Top Right */}
        <Card className="p-6 bg-white rounded-xl col-span-2">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-yellow-600 font-bold text-sm mb-2">800+ Items</h3>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Bottoms</h2>
              <div className="space-y-1 text-sm text-gray-600">
                <div>Jeans</div>
                <div>Trousers</div>
                <div>Shorts</div>
                <div>Skirts</div>
              </div>
            </div>
            <div className="ml-4">
              <div className="w-24 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-xs">Bottoms Image</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Accessories - Bottom Right */}
        <Card className="p-6 bg-white rounded-xl col-span-2">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-yellow-600 font-bold text-sm mb-2">500+ Items</h3>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Accessories</h2>
              <div className="space-y-1 text-sm text-gray-600">
                <div>Bags</div>
                <div>Jewelry</div>
                <div>Belts</div>
                <div>Scarves</div>
              </div>
            </div>
            <div className="ml-4">
              <div className="w-24 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-xs">Accessories Image</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
