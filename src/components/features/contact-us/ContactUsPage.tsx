"use client"

import Page from "../app/Page"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Send, MapPin, Clock, Mail, Phone } from "lucide-react"
import Breadcrumb from "../app/Breadcrumb"

export default function ContactUsPage() {
    return (
        <Page className="bg-gradient-to-br from-indigo-50/30 via-purple-50/20 to-pink-50/30">
            <div className="relative">
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <Breadcrumb />
                    
                    {/* Hero Section */}
                    <div className="text-center mb-16 mt-10 relative z-10">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-700 text-white px-4 py-2 rounded-full font-bold text-sm mb-6 shadow-lg">
                            <Send className="w-4 h-4" />
                            Contact Us
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
                            Let's Start a
                            <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Conversation
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Have questions about our fashion collection or need styling advice? We'd love to hear from you!
                        </p>
                    </div>

                    {/* Decorative Blobs */}
                    <div className="absolute top-20 right-1/4 w-96 h-96 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl opacity-50 -z-10" />
                    <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl opacity-50 -z-10" />

                    <div className="grid lg:grid-cols-2 gap-12 mb-16 relative z-10">
                        {/* Contact Form Section */}
                        <div className="bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                                    <Send className="w-6 h-6 text-white" />
                                </div>
                                <h2 className="text-3xl font-bold text-slate-900">Get in Touch</h2>
                            </div>

                            <form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Your Name *
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Ex. Sarah Johnson"
                                        className="w-full h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Email *
                                    </label>
                                    <Input
                                        type="email"
                                        placeholder="sarah@example.com"
                                        className="w-full h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Subject *
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Enter Subject"
                                        className="w-full h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Your Message *
                                    </label>
                                    <textarea
                                        placeholder="Tell us about your fashion needs, styling questions, or any other inquiries..."
                                        className="w-full h-32 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                                    />
                                </div>

                                <Button className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
                                    Send Message
                                    <Send className="w-5 h-5 ml-2" />
                                </Button>
                            </form>
                        </div>

                        {/* Contact Information Section */}
                        <div className="space-y-6">
                            <Card className="bg-gradient-to-br from-slate-800 to-slate-700 text-white rounded-2xl border-0 shadow-2xl overflow-hidden">
                                {/* Pattern Overlay */}
                                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyek0zNCAzMGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
                                
                                <CardContent className="p-10 relative z-10">
                                    <div className="space-y-8">
                                        <div className="group">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                                                    <MapPin className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-white text-lg mb-2">Store Address</h3>
                                                    <p className="text-white/80 leading-relaxed">
                                                        123 Fashion Avenue<br />
                                                        Downtown Shopping District<br />
                                                        New York, NY 10001
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="group">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                                                    <Phone className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-white text-lg mb-2">Contact Info</h3>
                                                    <div className="space-y-1 text-white/80">
                                                        <p>Phone: +1 (555) 123-FASHION</p>
                                                        <p>Email: hello@snazzyfit.com</p>
                                                        <p>Support: support@snazzyfit.com</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="group">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                                                    <Clock className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-white text-lg mb-2">Store Hours</h3>
                                                    <div className="space-y-1 text-white/80">
                                                        <p>Monday - Friday: 10:00 AM - 8:00 PM</p>
                                                        <p>Saturday: 10:00 AM - 6:00 PM</p>
                                                        <p>Sunday: 12:00 PM - 5:00 PM</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-white/20">
                                            <h3 className="font-bold text-white text-lg mb-4">Stay Connected</h3>
                                            <div className="flex gap-3">
                                                <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-all cursor-pointer group hover:scale-110">
                                                    <Facebook className="w-5 h-5 text-white" />
                                                </div>
                                                <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-all cursor-pointer group hover:scale-110">
                                                    <Twitter className="w-5 h-5 text-white" />
                                                </div>
                                                <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-all cursor-pointer group hover:scale-110">
                                                    <Instagram className="w-5 h-5 text-white" />
                                                </div>
                                                <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-all cursor-pointer group hover:scale-110">
                                                    <Linkedin className="w-5 h-5 text-white" />
                                                </div>
                                                <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-all cursor-pointer group hover:scale-110">
                                                    <Youtube className="w-5 h-5 text-white" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Map Section */}
                    <div className="relative overflow-hidden">
                        {/* Decorative Blobs */}
                        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-rose-200/30 to-pink-200/30 rounded-full blur-3xl opacity-50 -z-10" />
                        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-br from-fuchsia-200/30 to-purple-200/30 rounded-full blur-3xl opacity-50 -z-10" />
                        
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-10 shadow-xl border border-gray-100">
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-700 text-white px-4 py-2 rounded-full font-bold text-sm mb-4 shadow-lg">
                                    <MapPin className="w-4 h-4" />
                                    Location
                                </div>
                                <h3 className="text-3xl font-bold text-slate-900">Find Us</h3>
                            </div>
                            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                                {/* Placeholder for map */}
                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
                                    <div className="text-center">
                                        <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                            <MapPin className="w-10 h-10 text-white" />
                                        </div>
                                        <h4 className="text-2xl font-bold text-slate-900 mb-2">SnazzyFit Store</h4>
                                        <p className="text-gray-600 text-lg mb-6">123 Fashion Avenue, New York, NY</p>
                                        <Button className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
                                            Get Directions
                                            <MapPin className="w-5 h-5 ml-2" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Contact Options */}
                    <div className="mt-16 grid md:grid-cols-3 gap-8 relative z-10">
                        {/* Call Us Card */}
                        <Card className="group hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden border-0 bg-white/80 backdrop-blur-sm">
                            <CardContent className="text-center p-8">
                                <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all">
                                    <Phone className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Call Us</h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">Speak directly with our fashion experts</p>
                                <p className="bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent font-bold text-lg">+1 (555) 123-FASHION</p>
                            </CardContent>
                        </Card>

                        {/* Email Us Card */}
                        <Card className="group hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden border-0 bg-white/80 backdrop-blur-sm">
                            <CardContent className="text-center p-8">
                                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all">
                                    <Mail className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Email Us</h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">Get a response within 24 hours</p>
                                <p className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent font-bold text-lg">hello@snazzyfit.com</p>
                            </CardContent>
                        </Card>

                        {/* Live Chat Card */}
                        <Card className="group hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden border-0 bg-white/80 backdrop-blur-sm">
                            <CardContent className="text-center p-8">
                                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all">
                                    <Send className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Live Chat</h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">Chat with us in real-time</p>
                                <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all">
                                    Start Chat
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </Page>
    )
}