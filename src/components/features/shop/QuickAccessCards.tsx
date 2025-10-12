import { ArrowRight } from "lucide-react"

const quickAccessItems = [
    {
        title: "Trendy Sneakers",
        subtitle: "Footwear & Shoes",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c65f8?auto=format&fit=crop&w=150&q=80",
        gradient: "from-cyan-400 to-teal-500"
    },
    {
        title: "Elegant Dresses",
        subtitle: "Women's Fashion",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=150&q=80",
        gradient: "from-pink-400 to-purple-500"
    },
    {
        title: "Stylish Accessories",
        subtitle: "Jewelry & Bags",
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=150&q=80",
        gradient: "from-emerald-400 to-green-500"
    },
    {
        title: "Men's Fashion",
        subtitle: "Clothing & Style",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        gradient: "from-slate-600 to-slate-700"
    }
]

export default function QuickAccessCards() {
    return (
        <div className="grid grid-cols-2 gap-4">
            {quickAccessItems.map((item, index) => (
                <div
                    key={index}
                    className={`bg-gradient-to-br ${item.gradient} rounded-2xl p-6 flex flex-col justify-between h-44 group hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden`}
                >
                    {/* Decorative Pattern */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyek0zNCAzMGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
                    
                    <div className="relative z-10 text-white">
                        <h3 className="font-bold text-lg mb-1 group-hover:translate-x-1 transition-transform">{item.title}</h3>
                        <p className="text-sm text-white/80">{item.subtitle}</p>
                    </div>
                    <div className="relative z-10 flex items-end justify-between">
                        <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-2 transition-transform" />
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-20 h-20 object-cover rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300"
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

