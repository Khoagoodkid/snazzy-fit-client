import { Card } from "@/components/ui/card"

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
              <img 
                src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80" 
                alt="Tops Collection"
                className="w-48 h-48 object-cover rounded-lg"
              />
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
              <img 
                src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=120&q=80" 
                alt="Bottoms Collection"
                className="w-24 h-32 object-cover rounded-lg"
              />
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
              <img 
                src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=120&q=80" 
                alt="Accessories Collection"
                className="w-24 h-32 object-cover rounded-lg"
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
