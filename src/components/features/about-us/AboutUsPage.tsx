"use client"

import Page from "../app/Page"
import { Card } from "@/components/ui/card"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import Breadcrumb from "../app/Breadcrumb"

export default function AboutUsPage() {
    return (
        <Page className="max-w-7xl mx-auto pt-10">
            <Breadcrumb />
            {/* Our Story Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <span className="text-yellow-600 text-lg font-medium">Our Story</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-green-900 mt-4 mb-6">
                            Fashion Forward: Quality Clothing, Timeless Style
                        </h1>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Since our founding, we've been dedicated to bringing you the finest fashion pieces that combine quality craftsmanship with contemporary style. Our journey began with a simple vision: to make premium clothing accessible to everyone, everywhere.
                        </p>
                    </div>
                    
                    <div className="flex justify-center mb-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-900 mb-2" style={{fontFamily: 'cursive'}}>
                                James Ha
                            </div>
                            <div className="text-gray-600">James Ha - CEO</div>
                        </div>
                    </div>

                    {/* Crafting Images Grid */}
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        <div className="md:col-span-1">
                            <img 
                                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80" 
                                alt="Fashion Design Process"
                                className="w-full h-80 object-cover rounded-xl"
                            />
                        </div>
                        <div className="grid grid-rows-2 gap-4">
                            <img 
                                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300&q=80" 
                                alt="Quality Control"
                                className="w-full h-36 object-cover rounded-xl"
                            />
                            <img 
                                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=300&q=80" 
                                alt="Fashion Design Studio"
                                className="w-full h-36 object-cover rounded-xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Bar */}
            <section className="py-12 bg-yellow-500">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2">15+</div>
                            <div className="text-white font-medium">Years</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
                            <div className="text-white font-medium">Stores</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2">100k+</div>
                            <div className="text-white font-medium">Customers</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2">25+</div>
                            <div className="text-white font-medium">Awards</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2">99%</div>
                            <div className="text-white font-medium">Satisfied</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Product Quality Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <img 
                                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80" 
                                alt="Quality Fashion"
                                className="w-full h-96 object-cover rounded-xl"
                            />
                        </div>
                        <div className="order-1 md:order-2">
                            <span className="text-yellow-600 text-lg font-medium">Our Product Quality</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mt-4 mb-6">
                                Setting the Standard for Quality Fashion
                            </h2>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Every piece in our collection undergoes rigorous quality checks to ensure it meets our high standards. We work with the finest materials and skilled artisans to create clothing that's not just beautiful, but built to last.
                            </p>
                            
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <div className="w-6 h-6 bg-white rounded-full"></div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 mb-2">Premium Materials</h3>
                                        <p className="text-gray-600">
                                            We source only the finest fabrics and materials from trusted suppliers worldwide, ensuring durability and comfort in every garment.
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <div className="w-6 h-6 bg-white rounded-full"></div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 mb-2">Style-Driven Design</h3>
                                        <p className="text-gray-600">
                                            Our design team creates pieces that blend timeless elegance with contemporary trends, ensuring you always look and feel your best.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Team Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <span className="text-yellow-600 text-lg font-medium">Our Team</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-green-900 mt-4">Meet Our Team</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="bg-white rounded-xl overflow-hidden shadow-sm">
                            <div className="relative">
                                <img 
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" 
                                    alt="James Ha"
                                    className="w-full h-80 object-cover"
                                />
                                <div className="absolute bottom-4 left-4 flex gap-2">
                                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                                        <Facebook className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                                        <Twitter className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                                        <Instagram className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                                        <Linkedin className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-gray-800 mb-1">James Ha</h3>
                                <p className="text-gray-600">[CEO, Fashion]</p>
                            </div>
                        </Card>

                        <Card className="bg-white rounded-xl overflow-hidden shadow-sm">
                            <div className="relative">
                                <img 
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80" 
                                    alt="Michael Chen"
                                    className="w-full h-80 object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-gray-800 mb-1">Michael Chen</h3>
                                <p className="text-gray-600">[Designer]</p>
                            </div>
                        </Card>

                        <Card className="bg-white rounded-xl overflow-hidden shadow-sm">
                            <div className="relative">
                                <img 
                                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80" 
                                    alt="Emma Rodriguez"
                                    className="w-full h-80 object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-gray-800 mb-1">Emma Rodriguez</h3>
                                <p className="text-gray-600">[Stylist]</p>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>
        </Page>
    )
}