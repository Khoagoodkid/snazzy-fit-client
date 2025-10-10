"use client"

import Page from "../app/Page"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Breadcrumb from "../app/Breadcrumb"

export default function BlogPage() {
    const blogPosts = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1483985028355-82c1d93eea48?auto=format&fit=crop&w=400&q=80",
            title: "Fashion Trends 2024: What's Hot and What's Not",
            date: "15 April 2024",
            description: "Discover the latest fashion trends that are dominating 2024. From bold colors to sustainable fashion, we break down what's trending this season."
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=400&q=80",
            title: "The Ultimate Guide to Building a Capsule Wardrobe",
            date: "14 April 2024",
            description: "Learn how to create a versatile capsule wardrobe with essential pieces that can be mixed and matched for any occasion."
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=400&q=80",
            title: "Choosing the Perfect Dress for Every Body Type",
            date: "12 April 2024",
            description: "Find the perfect dress that flatters your figure. Our comprehensive guide covers styles for every body shape and occasion."
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80",
            title: "Sustainable Fashion: Making Ethical Style Choices",
            date: "11 April 2024",
            description: "Explore how to make more sustainable fashion choices without compromising on style. Tips for building an eco-friendly wardrobe."
        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80",
            title: "The Art of Layering: Master Your Winter Style",
            date: "10 April 2024",
            description: "Master the art of layering with our expert tips. Learn how to create stylish, warm outfits that look effortlessly chic."
        },
        {
            id: 6,
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80",
            title: "Accessorizing Like a Pro: Complete Style Guide",
            date: "09 April 2024",
            description: "Elevate your outfits with the perfect accessories. From jewelry to bags, discover how to accessorize like a fashion expert."
        },
        {
            id: 7,
            image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80",
            title: "Budget-Friendly Fashion: Look Expensive for Less",
            date: "08 April 2024",
            description: "Learn how to build a stylish wardrobe on a budget. Tips for finding quality pieces and styling them to look expensive."
        },
        {
            id: 8,
            image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=400&q=80",
            title: "Workwear Fashion: Professional Style That Works",
            date: "07 April 2024",
            description: "Navigate professional dress codes with confidence. Discover workwear essentials that are both stylish and appropriate."
        },
        {
            id: 9,
            image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=400&q=80",
            title: "Seasonal Color Analysis: Find Your Perfect Palette",
            date: "06 April 2024",
            description: "Discover which colors make you look your best. Our seasonal color analysis guide helps you find your perfect color palette."
        }
    ]

    return (
        <Page>
            <div className="max-w-7xl mx-auto px-6 py-16">
                <Breadcrumb />
                {/* Header Section */}
                <div className="text-center mb-12 mt-10">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-8 h-1 bg-yellow-500 rounded"></div>
                        <span className="text-sm text-gray-500">Fashion Blog</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Our Latest <span className="text-green-800">Fashion Insights</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Stay updated with the latest fashion trends, styling tips, and industry insights from our fashion experts.
                    </p>
                </div>

                {/* Blog Posts Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {blogPosts.map((post) => (
                        <Card key={post.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                            <CardContent className="p-0">
                                <div className="relative">
                                    <img 
                                        src={post.image} 
                                        alt={post.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <span className="absolute bottom-3 left-3 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                                        {post.date}
                                    </span>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold text-gray-800 mb-3 text-lg leading-tight">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                        {post.description}
                                    </p>
                                    <a 
                                        href="#" 
                                        className="text-green-800 text-sm font-medium hover:text-green-700 transition-colors duration-200"
                                    >
                                        Read More →
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-2">
                    <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    
                    <div className="flex gap-2">
                        <Button className="w-10 h-10 p-0 bg-yellow-500 hover:bg-yellow-600 text-white font-bold">
                            1
                        </Button>
                        <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                            2
                        </Button>
                        <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                            3
                        </Button>
                        <span className="flex items-center px-2 text-gray-500">...</span>
                        <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                            10
                        </Button>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </Page>
    )
}