"use client"

import Page from "../app/Page"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react"
import Breadcrumb from "../app/Breadcrumb"

export default function ContactUsPage() {
    return (
        <Page className="">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <Breadcrumb />
                <div className="grid lg:grid-cols-2 gap-12 mb-16 mt-10">
                    {/* Contact Form Section */}
                    <div className="bg-white p-8 rounded-xl">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Get in Touch</h2>
                        <p className="text-gray-600 mb-8">
                            Have questions about our fashion collection or need styling advice? We'd love to hear from you!
                        </p>

                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Name *
                                </label>
                                <Input
                                    type="text"
                                    placeholder="Ex. Sarah Johnson"
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email *
                                </label>
                                <Input
                                    type="email"
                                    placeholder="sarah@example.com"
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Subject *
                                </label>
                                <Input
                                    type="text"
                                    placeholder="Enter Subject"
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Message *
                                </label>
                                <textarea
                                    placeholder="Tell us about your fashion needs, styling questions, or any other inquiries..."
                                    className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                                />
                            </div>

                            <Button className="w-full bg-green-800 hover:bg-green-700 text-white py-3">
                                Send Message
                            </Button>
                        </form>
                    </div>

                    {/* Contact Information Section */}
                    <Card className="bg-green-800 text-white rounded-xl">
                        <CardContent className="p-8">
                            <div className="space-y-8">
                                <div>
                                    <h3 className="font-bold text-white text-lg mb-3">Store Address</h3>
                                    <p className="text-white/90">
                                        123 Fashion Avenue<br />
                                        Downtown Shopping District<br />
                                        New York, NY 10001
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-white text-lg mb-3">Contact Info</h3>
                                    <div className="space-y-2 text-white/90">
                                        <p>Phone: +1 (555) 123-FASHION</p>
                                        <p>Email: hello@snazzyfit.com</p>
                                        <p>Customer Service: support@snazzyfit.com</p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-bold text-white text-lg mb-3">Store Hours</h3>
                                    <div className="space-y-2 text-white/90">
                                        <p>Monday - Friday: 10:00 AM - 8:00 PM</p>
                                        <p>Saturday: 10:00 AM - 6:00 PM</p>
                                        <p>Sunday: 12:00 PM - 5:00 PM</p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-bold text-white text-lg mb-4">Stay Connected</h3>
                                    <div className="flex gap-3">
                                        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors cursor-pointer">
                                            <Facebook className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors cursor-pointer">
                                            <Twitter className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors cursor-pointer">
                                            <Instagram className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors cursor-pointer">
                                            <Linkedin className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors cursor-pointer">
                                            <Youtube className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Map Section */}
                <div className="bg-gray-100 rounded-xl p-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Find Us</h3>
                    <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
                        {/* Placeholder for map - you can integrate with Google Maps or other map service */}
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-white text-2xl">📍</span>
                                </div>
                                <h4 className="text-lg font-semibold text-gray-800 mb-2">SnazzyFit Store</h4>
                                <p className="text-gray-600">123 Fashion Avenue, New York, NY</p>
                                <Button className="mt-4 bg-green-800 hover:bg-green-700 text-white">
                                    Get Directions
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Contact Options */}
                <div className="mt-16 grid md:grid-cols-3 gap-8">
                    <Card className="text-center p-6">
                        <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white text-2xl">📞</span>
                        </div>
                        <h3 className="font-bold text-gray-800 mb-2">Call Us</h3>
                        <p className="text-gray-600 mb-3">Speak directly with our fashion experts</p>
                        <p className="text-green-800 font-semibold">+1 (555) 123-FASHION</p>
                    </Card>

                    <Card className="text-center p-6">
                        <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white text-2xl">✉️</span>
                        </div>
                        <h3 className="font-bold text-gray-800 mb-2">Email Us</h3>
                        <p className="text-gray-600 mb-3">Get a response within 24 hours</p>
                        <p className="text-green-800 font-semibold">hello@snazzyfit.com</p>
                    </Card>

                    <Card className="text-center p-6">
                        <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white text-2xl">💬</span>
                        </div>
                        <h3 className="font-bold text-gray-800 mb-2">Live Chat</h3>
                        <p className="text-gray-600 mb-3">Chat with us in real-time</p>
                        <Button className="bg-green-800 hover:bg-green-700 text-white">
                            Start Chat
                        </Button>
                    </Card>
                </div>
            </div>
        </Page>
    )
}