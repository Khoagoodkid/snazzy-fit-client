import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function NewsBlogsSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-1 bg-yellow-500 rounded"></div>
              <span className="text-sm text-gray-500">News & Blogs</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              Our Latest <span className="text-green-800">News & Blogs</span>
            </h2>
          </div>
          <Button className="bg-green-800 hover:bg-green-700 text-white px-6 py-2 rounded-lg">
            View All Blogs
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Blog Post 1 */}
          <Card className="bg-white rounded-xl overflow-hidden shadow-sm">
            <CardContent className="p-0">
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Fashion Trends Image</span>
              </div>
              <div className="p-6">
                <span className="inline-block bg-yellow-500 text-white text-xs px-2 py-1 rounded mb-3">15 April 2024</span>
                <h3 className="font-bold text-gray-800 mb-3">Fashion Trends 2024: What's Hot and What's Not</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <a href="#" className="text-green-800 text-sm font-medium">Read More</a>
              </div>
            </CardContent>
          </Card>

          {/* Blog Post 2 */}
          <Card className="bg-white rounded-xl overflow-hidden shadow-sm">
            <CardContent className="p-0">
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Style Guide Image</span>
              </div>
              <div className="p-6">
                <span className="inline-block bg-yellow-500 text-white text-xs px-2 py-1 rounded mb-3">12 April 2024</span>
                <h3 className="font-bold text-gray-800 mb-3">Complete Style Guide for Every Season</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <a href="#" className="text-green-800 text-sm font-medium">Read More</a>
              </div>
            </CardContent>
          </Card>

          {/* Blog Post 3 */}
          <Card className="bg-white rounded-xl overflow-hidden shadow-sm">
            <CardContent className="p-0">
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Wardrobe Tips Image</span>
              </div>
              <div className="p-6">
                <span className="inline-block bg-yellow-500 text-white text-xs px-2 py-1 rounded mb-3">10 April 2024</span>
                <h3 className="font-bold text-gray-800 mb-3">How to Build a Capsule Wardrobe</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <a href="#" className="text-green-800 text-sm font-medium">Read More</a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
