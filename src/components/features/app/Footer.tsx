import { Facebook, Twitter, Instagram, Linkedin, Youtube, Phone, Mail, MapPin, ChevronDown, Sparkles } from "lucide-react"


export default function Footer() {
    return (
        <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDMwaC0ydi0yaDJ2MnptMC00aC0ydi0yaDJ2MnptMC00aC0ydi0yaDJ2MnptMC00aC0ydi0yaDJ2MnptMC00aC0ydi0yaDJ2MnptMC00aC0ydi0yaDJ2MnptMC00aC0ydi0yaDJ2MnptMC00aC0ydi0yaDJ2MnptMC00aC0ydi0yaDJ2MnpNMzQgMzBoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
            
            {/* Decorative Gradients */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-full blur-3xl" />

            {/* Main Footer Section */}
            <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
                <div className="grid md:grid-cols-4 gap-12">
                    {/* Brand Information */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-xl">S</span>
                            </div>
                            <span className="font-bold text-2xl">SnazzyFit.</span>
                        </div>
                        <p className="text-white/70 text-sm mb-6 leading-relaxed">
                            Elevate your style with our curated fashion collections. Quality clothing, timeless design, and exceptional service.
                        </p>
                        <div className="flex gap-3">
                            <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer group">
                                <Facebook className="w-5 h-5 text-white" />
                            </div>
                            <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer group">
                                <Twitter className="w-5 h-5 text-white" />
                            </div>
                            <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer group">
                                <Instagram className="w-5 h-5 text-white" />
                            </div>
                            <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer group">
                                <Linkedin className="w-5 h-5 text-white" />
                            </div>
                            <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer group">
                                <Youtube className="w-5 h-5 text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-6 text-white">Company</h3>
                        <ul className="space-y-3">
                            <li><a href="/about-us" className="text-white/70 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block">About Us</a></li>
                            <li><a href="/blog" className="text-white/70 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block">Blog</a></li>
                            <li><a href="/contact-us" className="text-white/70 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block">Contact Us</a></li>
                            <li><a href="#" className="text-white/70 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block">Career</a></li>
                        </ul>
                    </div>

                    {/* Customer Services */}
                    <div>
                        <h3 className="font-bold text-lg mb-6 text-white">Customer Services</h3>
                        <ul className="space-y-3">
                            <li><a href="/profile" className="text-white/70 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block">My Account</a></li>
                            <li><a href="/profile?tab=orders" className="text-white/70 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block">Track Your Order</a></li>
                            <li><a href="#" className="text-white/70 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block">Return</a></li>
                            <li><a href="#" className="text-white/70 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block">FAQ</a></li>
                        </ul>
                    </div>

                    {/* Our Information & Contact Info */}
                    <div>
                        <div className="mb-8">
                            <h3 className="font-bold text-lg mb-6 text-white">Our Information</h3>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-white/70 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block">Privacy</a></li>
                                <li><a href="#" className="text-white/70 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block">User Terms & Condition</a></li>
                                <li><a href="#" className="text-white/70 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block">Return Policy</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-4 text-white">Contact Info</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-white/70 text-sm group">
                                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="group-hover:text-white transition-colors">+0123-456-789</span>
                                </div>
                                <div className="flex items-center gap-3 text-white/70 text-sm group">
                                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="group-hover:text-white transition-colors">example@gmail.com</span>
                                </div>
                                <div className="flex items-start gap-3 text-white/70 text-sm group">
                                    <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="group-hover:text-white transition-colors">8500 Preston Rd, Inglewood, Maine 98380</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Promo Banner */}
            <div className="relative bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 py-6 overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyek0zNCAzMGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
                
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <Phone className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-white font-semibold">
                            Call Us: <span className="font-normal">+123-456-789</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                        <Sparkles className="w-5 h-5" />
                        <span className="font-medium">Sign up and GET 25% OFF for your first order.</span>
                        <a href="/signup" className="underline font-bold hover:text-cyan-200 transition-colors">Sign up now</a>
                    </div>
                    <div className="flex gap-2">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6 opacity-80 hover:opacity-100 transition-opacity" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 opacity-80 hover:opacity-100 transition-opacity" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6 opacity-80 hover:opacity-100 transition-opacity" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" className="h-6 opacity-80 hover:opacity-100 transition-opacity" />
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="bg-slate-950/50 backdrop-blur-sm py-4 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/60 text-sm">Copyright © 2024 SnazzyFit. All Rights Reserved.</p>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-white/70 text-sm cursor-pointer hover:text-white transition-colors">
                            <span className="font-medium">English</span>
                            <ChevronDown className="w-4 h-4" />
                        </div>
                        <div className="w-px h-4 bg-white/20"></div>
                        <div className="flex items-center gap-2 text-white/70 text-sm cursor-pointer hover:text-white transition-colors">
                            <span className="font-medium">USD</span>
                            <ChevronDown className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}