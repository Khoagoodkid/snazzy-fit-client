import {
    Search,
    Heart,
    ShoppingCart,
    User,
} from "lucide-react"

export default function Header() {
    return (
        <header className="w-full bg-white">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-2">
                    <div className="bg-green-600 text-white rounded-sm p-2 font-bold text-sm">F</div>
                    <span className="font-bold text-lg text-green-900">SnazzyFit.</span>
                </div>
                <nav className="hidden md:flex gap-6 text-gray-700 text-sm">
                    <a href="#" className="hover:text-green-900">Home</a>
                    <a href="#" className="hover:text-green-900">Shop</a>
                    <a href="#" className="hover:text-green-900">Categories</a>
                    <a href="#" className="hover:text-green-900">About Us</a>
                    <a href="#" className="hover:text-green-900">Contact Us</a>
                    <a href="#" className="hover:text-green-900">Blog</a>
                </nav>
                <div className="flex gap-4 items-center text-gray-700">
                    <button className="hover:text-green-900"><Search /></button>
                    <button className="hover:text-green-900"><Heart /></button>
                    <button className="hover:text-green-900"><ShoppingCart /></button>
                    <button className="hover:text-green-900"><User /></button>
                </div>
            </div>
        </header>
    )
}