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
          {[
            'https://images.unsplash.com/photo-1483985028355-82c1d93eea48?auto=format&fit=crop&w=300&q=80',
            'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=300&q=80',
            'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=300&q=80',
            'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=300&q=80',
            'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=300&q=80'
          ].map((src, i) => (
            <div key={i} className="min-w-[200px] h-48 rounded-xl relative flex-shrink-0 overflow-hidden">
              <img 
                src={src} 
                alt={`Instagram Post ${i + 1}`}
                className="w-full h-full object-cover"
              />
              {i === 1 && (
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
