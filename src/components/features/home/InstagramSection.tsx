export default function InstagramSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-1 bg-yellow-500 rounded"></div>
            <span className="text-sm text-gray-500">Follow Us</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">
            Follow Us <span className="text-green-800">On Instagram</span>
          </h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="min-w-[200px] h-48 bg-gray-200 rounded-xl flex items-center justify-center relative flex-shrink-0">
              <span className="text-gray-500">Instagram Post {i}</span>
              {i === 2 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-gray-600 font-bold">📷</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
