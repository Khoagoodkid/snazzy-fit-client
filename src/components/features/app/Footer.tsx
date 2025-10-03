import { Facebook, Twitter, Instagram, Linkedin, Youtube, Phone, Mail, MapPin, ChevronDown } from "lucide-react"


export default function Footer() {
    return (
        <footer className="bg-green-800 text-white">
            {/* Main Footer Section */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Brand Information */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                                <span className="text-green-800 font-bold text-lg">S</span>
                            </div>
                            <span className="font-bold text-xl">SnazzyFit.</span>
                        </div>
                        <p className="text-green-100 text-sm mb-6 leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <div className="flex gap-3">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                <Facebook className="w-4 h-4 text-green-800" />
                            </div>
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                <Twitter className="w-4 h-4 text-green-800" />
                            </div>
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                <Instagram className="w-4 h-4 text-green-800" />
                            </div>
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                <Linkedin className="w-4 h-4 text-green-800" />
                            </div>
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                <Youtube className="w-4 h-4 text-green-800" />
                            </div>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-green-100 hover:text-white text-sm">About Us</a></li>
                            <li><a href="#" className="text-green-100 hover:text-white text-sm">Blog</a></li>
                            <li><a href="#" className="text-green-100 hover:text-white text-sm">Contact Us</a></li>
                            <li><a href="#" className="text-green-100 hover:text-white text-sm">Career</a></li>
                        </ul>
                    </div>

                    {/* Customer Services */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Customer Services</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-green-100 hover:text-white text-sm">My Account</a></li>
                            <li><a href="#" className="text-green-100 hover:text-white text-sm">Track Your Order</a></li>
                            <li><a href="#" className="text-green-100 hover:text-white text-sm">Return</a></li>
                            <li><a href="#" className="text-green-100 hover:text-white text-sm">FAQ</a></li>
                        </ul>
                    </div>

                    {/* Our Information & Contact Info */}
                    <div>
                        <div className="mb-6">
                            <h3 className="font-bold text-lg mb-4">Our Information</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-green-100 hover:text-white text-sm">Privacy</a></li>
                                <li><a href="#" className="text-green-100 hover:text-white text-sm">User Terms & Condition</a></li>
                                <li><a href="#" className="text-green-100 hover:text-white text-sm">Return Policy</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-4">Contact Info</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-green-100 text-sm">
                                    <Phone className="w-4 h-4" />
                                    <span>+0123-456-789</span>
                                </div>
                                <div className="flex items-center gap-2 text-green-100 text-sm">
                                    <Mail className="w-4 h-4" />
                                    <span>example@gmail.com</span>
                                </div>
                                <div className="flex items-center gap-2 text-green-100 text-sm">
                                    <MapPin className="w-4 h-4" />
                                    <span>8500 Preston Rd, Inglewood, Maine 98380</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="bg-yellow-500 py-4">
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <p className="text-gray-800 text-sm">Copyright © 2004 SnazzyFit. All Rights Reserved.</p>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-gray-800 text-sm">
                            <span>English</span>
                            <ChevronDown className="w-4 h-4" />
                        </div>
                        <div className="w-px h-4 bg-gray-600"></div>
                        <div className="flex items-center gap-1 text-gray-800 text-sm">
                            <span>USD</span>
                            <ChevronDown className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Shop Page Design Link */}
            <div className="bg-white py-2">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <a href="#" className="text-blue-600 underline text-sm">Shop Page Design</a>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="bg-green-800 py-4">
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <div className="text-white text-sm">
                        <span>Call Us: +123-456-789</span>
                    </div>
                    <div className="text-white text-sm">
                        <span>Sign up and GET 25% OFF for your first order. </span>
                        <a href="#" className="underline text-yellow-400">Sign up now</a>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                        <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                        <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                        <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                        <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                    </div>
                </div>
            </div>
        </footer>
    )
}