"use client"

import Page from "../app/Page"
import { Card } from "@/components/ui/card"
import { Facebook, Instagram, Linkedin, Twitter, Sparkles, Award, Users, Heart } from "lucide-react"
import Breadcrumb from "../app/Breadcrumb"

export default function AboutUsPage() {
    return (
        <Page className="bg-gradient-to-br from-sky-50/30 via-cyan-50/20 to-teal-50/30">
            <div className="pt-10">
                <div className="max-w-7xl mx-auto px-6">
                    <Breadcrumb />
                </div>
                
                {/* Our Story Section */}
                <section className="relative py-20 overflow-hidden">
                    {/* Decorative Blobs */}
                    <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-cyan-200/30 to-teal-200/30 rounded-full blur-3xl opacity-50 -z-10" />
                    <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-br from-emerald-200/30 to-green-200/30 rounded-full blur-3xl opacity-50 -z-10" />

                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16 relative z-10">
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-700 text-white px-4 py-2 rounded-full font-bold text-sm mb-6 shadow-lg">
                                <Sparkles className="w-4 h-4" />
                                Our Story
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mt-4 mb-6">
                                Fashion Forward:
                                <span className="block bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                                    Quality Clothing, Timeless Style
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                Since our founding, we've been dedicated to bringing you the finest fashion pieces that combine quality craftsmanship with contemporary style. Our journey began with a simple vision: to make premium clothing accessible to everyone, everywhere.
                            </p>
                        </div>
                        
                        <div className="flex justify-center mb-12">
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-xl border border-gray-100">
                                <div className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2" style={{fontFamily: 'cursive'}}>
                                    James Ha
                                </div>
                                <div className="text-gray-600 font-medium">Founder & CEO</div>
                            </div>
                        </div>

                        {/* Crafting Images Grid */}
                        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                            <div className="md:col-span-1 group">
                                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                                    <img 
                                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80" 
                                        alt="Fashion Design Process"
                                        className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <h3 className="text-2xl font-bold mb-1">Our Craft</h3>
                                        <p className="text-white/90">Where style meets quality</p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-rows-2 gap-6">
                                <div className="group relative overflow-hidden rounded-2xl shadow-xl">
                                    <img 
                                        src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300&q=80" 
                                        alt="Quality Control"
                                        className="w-full h-44 object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/50 to-transparent" />
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <h4 className="font-bold">Quality Control</h4>
                                    </div>
                                </div>
                                <div className="group relative overflow-hidden rounded-2xl shadow-xl">
                                    <img 
                                        src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=300&q=80" 
                                        alt="Fashion Design Studio"
                                        className="w-full h-44 object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 to-transparent" />
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <h4 className="font-bold">Design Studio</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Statistics Bar */}
                <section className="relative py-16 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 overflow-hidden">
                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyek0zNCAzMGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
                    
                    {/* Decorative Gradients */}
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-400/30 to-teal-400/30 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-emerald-400/30 to-green-400/30 rounded-full blur-3xl" />

                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                            <div className="text-center group">
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">15+</div>
                                <div className="text-white/80 font-medium">Years of Excellence</div>
                            </div>
                            <div className="text-center group">
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">50+</div>
                                <div className="text-white/80 font-medium">Store Locations</div>
                            </div>
                            <div className="text-center group">
                                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">100k+</div>
                                <div className="text-white/80 font-medium">Happy Customers</div>
                            </div>
                            <div className="text-center group">
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">25+</div>
                                <div className="text-white/80 font-medium">Industry Awards</div>
                            </div>
                            <div className="text-center group">
                                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-300 to-green-300 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">99%</div>
                                <div className="text-white/80 font-medium">Satisfaction Rate</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Product Quality Section */}
                <section className="relative py-20 overflow-hidden">
                    {/* Soft Gradient Background */}
                    <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-gradient-to-br from-violet-200/30 to-purple-200/30 rounded-full blur-3xl opacity-40 -z-10" />
                    <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-gradient-to-br from-pink-200/30 to-rose-200/30 rounded-full blur-3xl opacity-40 -z-10" />

                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div className="order-2 md:order-1 group">
                                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                                    <img 
                                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80" 
                                        alt="Quality Fashion"
                                        className="w-full h-[500px] object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                                </div>
                            </div>
                            <div className="order-1 md:order-2">
                                <span className="inline-block px-3 py-1 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold text-xs rounded-full mb-6 shadow-lg">
                                    Our Product Quality
                                </span>
                                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-6">
                                    Setting the Standard for
                                    <span className="block bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                                        Quality Fashion
                                    </span>
                                </h2>
                                <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                                    Every piece in our collection undergoes rigorous quality checks to ensure it meets our high standards. We work with the finest materials and skilled artisans to create clothing that's not just beautiful, but built to last.
                                </p>
                                
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4 group">
                                        <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl group-hover:rotate-6 transition-all">
                                            <Award className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 text-lg mb-2">Premium Materials</h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                We source only the finest fabrics and materials from trusted suppliers worldwide, ensuring durability and comfort in every garment.
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-4 group">
                                        <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl group-hover:rotate-6 transition-all">
                                            <Heart className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 text-lg mb-2">Style-Driven Design</h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                Our design team creates pieces that blend timeless elegance with contemporary trends, ensuring you always look and feel your best.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Statistics Bar */}
                <section className="relative py-16 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 overflow-hidden">
                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyek0zNCAzMGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
                    
                    {/* Decorative Gradients */}
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-400/30 to-teal-400/30 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-emerald-400/30 to-green-400/30 rounded-full blur-3xl" />

                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                            <div className="text-center group">
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">15+</div>
                                <div className="text-white/80 font-medium">Years of Excellence</div>
                            </div>
                            <div className="text-center group">
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">50+</div>
                                <div className="text-white/80 font-medium">Store Locations</div>
                            </div>
                            <div className="text-center group">
                                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">100k+</div>
                                <div className="text-white/80 font-medium">Happy Customers</div>
                            </div>
                            <div className="text-center group">
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">25+</div>
                                <div className="text-white/80 font-medium">Industry Awards</div>
                            </div>
                            <div className="text-center group">
                                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-300 to-green-300 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">99%</div>
                                <div className="text-white/80 font-medium">Satisfaction Rate</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Team Section */}
                <section className="relative py-20 overflow-hidden">
                    {/* Warm Gradient Background */}
                    <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-3xl opacity-40 -z-10" />
                    <div className="absolute bottom-1/4 right-1/3 w-[450px] h-[450px] bg-gradient-to-br from-yellow-200/30 to-amber-200/30 rounded-full blur-3xl opacity-40 -z-10" />

                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-full font-bold text-sm mb-4 shadow-lg">
                                <Users className="w-4 h-4" />
                                Our Team
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
                                Meet Our <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Creative Team</span>
                            </h2>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Team Member 1 */}
                            <Card className="group hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden border-0">
                                <div className="relative overflow-hidden">
                                    <img 
                                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" 
                                        alt="James Ha"
                                        className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/30 to-transparent" />
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="flex gap-2 mb-4">
                                            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                                                <Facebook className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                                                <Twitter className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                                                <Instagram className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                                                <Linkedin className="w-5 h-5 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 bg-white">
                                    <h3 className="font-bold text-slate-900 text-xl mb-1">James Ha</h3>
                                    <p className="text-gray-600">CEO & Founder</p>
                                </div>
                            </Card>

                            {/* Team Member 2 */}
                            <Card className="group hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden border-0">
                                <div className="relative overflow-hidden">
                                    <img 
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80" 
                                        alt="Michael Chen"
                                        className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/30 to-transparent" />
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="flex gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                                                <Instagram className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                                                <Linkedin className="w-5 h-5 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 bg-white">
                                    <h3 className="font-bold text-slate-900 text-xl mb-1">Michael Chen</h3>
                                    <p className="text-gray-600">Lead Designer</p>
                                </div>
                            </Card>

                            {/* Team Member 3 */}
                            <Card className="group hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden border-0">
                                <div className="relative overflow-hidden">
                                    <img 
                                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80" 
                                        alt="Emma Rodriguez"
                                        className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/30 to-transparent" />
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="flex gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                                                <Instagram className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                                                <Twitter className="w-5 h-5 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 bg-white">
                                    <h3 className="font-bold text-slate-900 text-xl mb-1">Emma Rodriguez</h3>
                                    <p className="text-gray-600">Senior Stylist</p>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>
            </div>
        </Page>
    )
}
