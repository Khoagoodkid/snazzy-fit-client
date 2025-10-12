"use client"

import Page from "../app/Page"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar, BookOpen, ArrowRight } from "lucide-react"
import Breadcrumb from "../app/Breadcrumb"

export default function BlogPage() {
    const blogPosts = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1483985028355-82c1d93eea48?auto=format&fit=crop&w=400&q=80",
            title: "Fashion Trends 2024: What's Hot and What's Not",
            date: "15 April 2024",
            category: "Trends",
            description: "Discover the latest fashion trends that are dominating 2024. From bold colors to sustainable fashion, we break down what's trending this season."
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=400&q=80",
            title: "The Ultimate Guide to Building a Capsule Wardrobe",
            date: "14 April 2024",
            category: "Style Guide",
            description: "Learn how to create a versatile capsule wardrobe with essential pieces that can be mixed and matched for any occasion."
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=400&q=80",
            title: "Choosing the Perfect Dress for Every Body Type",
            date: "12 April 2024",
            category: "Fashion Tips",
            description: "Find the perfect dress that flatters your figure. Our comprehensive guide covers styles for every body shape and occasion."
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80",
            title: "Sustainable Fashion: Making Ethical Style Choices",
            date: "11 April 2024",
            category: "Sustainability",
            description: "Explore how to make more sustainable fashion choices without compromising on style. Tips for building an eco-friendly wardrobe."
        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80",
            title: "The Art of Layering: Master Your Winter Style",
            date: "10 April 2024",
            category: "Seasonal",
            description: "Master the art of layering with our expert tips. Learn how to create stylish, warm outfits that look effortlessly chic."
        },
        {
            id: 6,
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80",
            title: "Accessorizing Like a Pro: Complete Style Guide",
            date: "09 April 2024",
            category: "Accessories",
            description: "Elevate your outfits with the perfect accessories. From jewelry to bags, discover how to accessorize like a fashion expert."
        },
        {
            id: 7,
            image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80",
            title: "Budget-Friendly Fashion: Look Expensive for Less",
            date: "08 April 2024",
            category: "Shopping",
            description: "Learn how to build a stylish wardrobe on a budget. Tips for finding quality pieces and styling them to look expensive."
        },
        {
            id: 8,
            image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=400&q=80",
            title: "Workwear Fashion: Professional Style That Works",
            date: "07 April 2024",
            category: "Workwear",
            description: "Navigate professional dress codes with confidence. Discover workwear essentials that are both stylish and appropriate."
        },
        {
            id: 9,
            image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&q=80",
            title: "Seasonal Color Analysis: Find Your Perfect Palette",
            date: "06 April 2024",
            category: "Color Guide",
            description: "Discover which colors make you look your best. Our seasonal color analysis guide helps you find your perfect color palette."
        }
    ]

    return (
        <Page className="bg-gradient-to-br from-lime-50/30 via-emerald-50/20 to-teal-50/30">
            <div className="relative">
                {/* Decorative Blobs */}
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-lime-200/30 to-emerald-200/30 rounded-full blur-3xl opacity-50 -z-10" />
                <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl opacity-50 -z-10" />
                <div className="absolute bottom-1/4 right-1/3 w-[450px] h-[450px] bg-gradient-to-br from-teal-200/30 to-cyan-200/30 rounded-full blur-3xl opacity-50 -z-10" />

                <div className="max-w-7xl mx-auto px-6 py-16">
                    <Breadcrumb />
                    
                    {/* Header Section */}
                    <div className="text-center mb-16 mt-10 relative z-10">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-700 text-white px-4 py-2 rounded-full font-bold text-sm mb-6 shadow-lg">
                            <BookOpen className="w-4 h-4" />
                            Fashion Blog
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
                            Our Latest
                            <span className="block bg-gradient-to-r from-lime-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                Fashion Insights
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Stay updated with the latest fashion trends, styling tips, and industry insights from our fashion experts.
                        </p>
                    </div>

                    {/* Blog Posts Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 relative z-10">
                        {blogPosts.map((post, index) => {
                            // Alternate gradient colors
                            const gradients = [
                                'from-lime-500 to-emerald-500',
                                'from-emerald-500 to-teal-500',
                                'from-teal-500 to-cyan-500',
                            ]
                            const categoryGradients = [
                                'from-lime-600 to-emerald-600',
                                'from-emerald-600 to-teal-600',
                                'from-teal-600 to-cyan-600',
                            ]
                            const gradient = gradients[index % 3]
                            const categoryGradient = categoryGradients[index % 3]

                            return (
                                <Card key={post.id} className="group hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden border-0 bg-white">
                                    <CardContent className="p-0">
                                        <div className="relative overflow-hidden">
                                            <img 
                                                src={post.image} 
                                                alt={post.title}
                                                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            
                                            {/* Category Badge */}
                                            <div className={`absolute top-4 left-4 bg-gradient-to-r ${gradient} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg`}>
                                                {post.category}
                                            </div>
                                            
                                            {/* Date Badge */}
                                            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg">
                                                <Calendar className="w-3.5 h-3.5 text-gray-600" />
                                                <span className="text-xs font-semibold text-gray-700">
                                                    {post.date}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="font-bold text-slate-900 mb-3 text-xl leading-tight group-hover:text-emerald-600 transition-colors">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                                                {post.description}
                                            </p>
                                            <a 
                                                href="#" 
                                                className={`inline-flex items-center gap-2 bg-gradient-to-r ${categoryGradient} bg-clip-text text-transparent text-sm font-bold group-hover:gap-3 transition-all`}
                                            >
                                                Read More
                                                <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                                            </a>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-3 relative z-10">
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-11 h-11 p-0 rounded-xl border-2 border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                        
                        <div className="flex gap-2">
                            <Button className="w-11 h-11 p-0 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl shadow-lg">
                                1
                            </Button>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-11 h-11 p-0 rounded-xl border-2 border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all font-semibold"
                            >
                                2
                            </Button>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-11 h-11 p-0 rounded-xl border-2 border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all font-semibold"
                            >
                                3
                            </Button>
                            <span className="flex items-center px-2 text-gray-500 font-bold">...</span>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-11 h-11 p-0 rounded-xl border-2 border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all font-semibold"
                            >
                                10
                            </Button>
                        </div>
                        
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-11 h-11 p-0 rounded-xl border-2 border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </Page>
    )
}