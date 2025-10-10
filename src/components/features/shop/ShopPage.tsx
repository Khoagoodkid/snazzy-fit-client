"use client"

import Breadcrumb from "../app/Breadcrumb"
import Page from "../app/Page"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Clock, ShoppingCart } from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Product } from "@/types/product/product.interface"
import useProductService from "@/services/client/product/useProductService"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import useCategoriesService from "@/services/client/categories/useCategoriesService"
import { Category } from "@/types/categories/categories.interface"

export default function ShopPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const { getProducts } = useProductService();
    const { getCategories } = useCategoriesService();
    const [categories, setCategories] = useState<Category[]>([]);
    const router = useRouter();



    const handleGetProducts = useCallback(async () => {
        try {
            const response = await getProducts({});
            setProducts(response.data.products);
        } catch (error) {
            toast.error((error as Error).message);
        }
    }, [getProducts]);

    const handleGetCategories = useCallback(async () => {
        try {
            const response = await getCategories();
            setCategories(response.data);
        } catch (error) {
            toast.error((error as Error).message);
        }
    }, [getCategories]);

    useEffect(() => {
        Promise.all([handleGetProducts(), handleGetCategories()]);
    }, [handleGetProducts, handleGetCategories]);




    const trendingProducts = useMemo(() => {
        return products.sort((a, b) => b.ratingAvg - a.ratingAvg).slice(0, 8);
    }, [products]);

    const topFeaturedProducts = useMemo(() => {
        return products.filter((product) => product.isFeatured).sort((a, b) => b.ratingAvg - a.ratingAvg).slice(0, 8);
    }, [products]);

    const topDeals = useMemo(() => {
        return products.sort((a, b) => b.discount - a.discount).slice(0, 2);
    }, [products]);

    return (
        <Page>
            <div className="max-w-7xl mx-auto px-6 py-16">
                <Breadcrumb />

                {/* Hero Banner & Promotional Cards Section */}
                <section className="py-12 bg-white">
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        {/* Main Hero Banner */}
                        <div className="lg:col-span-2">
                            <div className="relative bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl overflow-hidden h-96">
                                <div className="absolute inset-0 flex items-center justify-between p-8">
                                    <div className="flex-1">
                                        <h2 className="text-4xl font-bold text-gray-800 mb-4">
                                            Fashion Forward
                                        </h2>
                                        <p className="text-xl text-gray-700 mb-6">
                                            Discover the latest trends in clothing, accessories, and style
                                        </p>
                                        <p className="text-lg text-gray-600 mb-8">
                                            Dresses, Tops, Shoes, Bags & More...
                                        </p>
                                        <Button className="bg-green-800 hover:bg-green-700 text-white px-8 py-3 rounded-lg">
                                            Shop Collection →
                                        </Button>
                                    </div>
                                    <div className="flex-1 flex justify-center">
                                        <img
                                            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80"
                                            alt="Fashion Collection"
                                            className="w-80 h-80 object-cover rounded-lg shadow-lg"
                                        />
                                    </div>
                                </div>
                                <div className="absolute top-4 right-4">
                                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors">
                                        <span className="text-gray-600">→</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Promotional Cards Grid */}
                        <div className="lg:col-span-1 grid grid-rows-2 gap-4">
                            {/* Top Row */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-orange-100 rounded-xl p-6 flex flex-col justify-between h-44">
                                    <div>
                                        <h3 className="font-bold text-gray-800 mb-2">Trendy Sneakers</h3>
                                        <p className="text-sm text-gray-600">Footwear & Shoes</p>
                                    </div>
                                    <img
                                        src="https://images.unsplash.com/photo-1542291026-7eec264c65f8?auto=format&fit=crop&w=150&q=80"
                                        alt="Trendy Sneakers"
                                        className="w-16 h-16 object-cover rounded-lg self-end"
                                    />
                                </div>

                                <div className="bg-pink-100 rounded-xl p-6 flex flex-col justify-between h-44">
                                    <div>
                                        <h3 className="font-bold text-gray-800 mb-2">Elegant Dresses</h3>
                                        <p className="text-sm text-gray-600">Women's Fashion</p>
                                    </div>
                                    <img
                                        src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=150&q=80"
                                        alt="Elegant Dresses"
                                        className="w-16 h-16 object-cover rounded-lg self-end"
                                    />
                                </div>
                            </div>

                            {/* Bottom Row */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-green-100 rounded-xl p-6 flex flex-col justify-between h-44">
                                    <div>
                                        <h3 className="font-bold text-gray-800 mb-2">Stylish Accessories</h3>
                                        <p className="text-sm text-gray-600">Jewelry & Bags</p>
                                    </div>
                                    <img
                                        src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=150&q=80"
                                        alt="Stylish Accessories"
                                        className="w-16 h-16 object-cover rounded-lg self-end"
                                    />
                                </div>

                                <div className="bg-purple-100 rounded-xl p-6 flex flex-col justify-between h-44">
                                    <div>
                                        <h3 className="font-bold text-gray-800 mb-2">Men's Fashion</h3>
                                        <p className="text-sm text-gray-600">Clothing & Style</p>
                                    </div>
                                    <img
                                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                                        alt="Men's Fashion"
                                        className="w-16 h-16 object-cover rounded-lg self-end"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Hot Trending Products Section */}
                <section className="py-12 bg-white">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">Hot Trending Products</h2>
                        <a href="#" className="text-green-800 hover:underline font-medium">
                            View All Products &gt;
                        </a>
                    </div>
                    <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide">
                        {trendingProducts.map((product) => (
                            <Card key={product.id} className="min-w-[280px] max-w-[280px] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <CardContent className="p-0">
                                    <div className="relative w-full h-48">
                                        <img
                                            src={product.mainImage || ""}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                        {product.discount && (
                                            <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded">
                                                -{product.discount}
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
                                        <div className="flex items-center mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < product.ratingAvg ? "text-yellow-500" : "text-gray-300"}`}
                                                    fill={i < product.ratingAvg ? "currentColor" : "none"}
                                                />
                                            ))}
                                            <span className="text-sm text-gray-600 ml-2">({product.ratingCount})</span>
                                        </div>
                                        <div className="flex items-baseline mb-4">
                                            <span className="text-xl font-bold text-green-800">${product.basePrice}</span>
                                            {product.basePrice && (
                                                <span className="text-sm text-gray-500 line-through ml-2">
                                                    ${product.basePrice}
                                                </span>
                                            )}
                                        </div>
                                        <Button
                                            onClick={() => router.push(`/collections/${product.collection.name}/${product.category.name}/${product.slug}`)}
                                            className="w-full bg-green-800 text-white hover:bg-green-700">
                                            View Product
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Popular Categories Section */}
                <section className="py-12 bg-gray-50">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Popular Categories</h2>
                    <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide">
                        {categories.map((category) => (
                            <Card key={category.id} className="min-w-[200px] max-w-[200px] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <CardContent className="p-0">
                                    <div className="w-full h-32">
                                        <img
                                            src={"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80"}
                                            alt={category.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-4 text-center">
                                        <h3 className="font-semibold text-gray-800 mb-1">{category.name}</h3>
                                        <p className="text-sm text-gray-600">{category.products?.length} Products</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Top Deals Section */}
                <section className="py-12 bg-white">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">Top Deals Of The Day</h2>
                        <div className="flex items-center gap-2 text-red-600">
                            <Clock className="w-5 h-5" />
                            <span className="font-medium">Hurry up! Offer ends in 00 Days 01 Hours 19 Minutes 36 Seconds</span>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {topDeals.map((deal) => (
                            <Card key={deal.id} className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <CardContent className="p-0">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="relative">
                                            <img
                                                src={deal.mainImage || ""}
                                                alt={deal.name}
                                                className="w-full h-64 object-cover"
                                            />
                                            <span className="absolute top-3 left-3 bg-green-600 text-white text-sm px-3 py-1 rounded">
                                                -{deal.discount}%
                                            </span>
                                        </div>
                                        <div className="p-6 flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800 mb-4">{deal.name}</h3>
                                                <div className="space-y-2 mb-4">
                                                    {deal.description.split("\n").map((detail, index) => (
                                                        <p key={index} className="text-sm text-gray-600">{detail}</p>
                                                    ))}
                                                </div>
                                                <div className="flex items-baseline mb-4">
                                                        <span className="text-2xl font-bold text-green-800">${(deal.basePrice * (1 - deal.discount / 100)).toFixed(2)}</span>
                                                        <span className="text-lg text-gray-500 line-through ml-2">
                                                        ${deal.basePrice.toFixed(2)}
                                                    </span>
                                                </div>
                                                <div className="mb-4">
                                                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                                                        <span>Sold: {deal.variants.reduce((acc, variant) => acc + variant.stock, 0)}/{deal.variants.reduce((acc, variant) => acc + variant.stock, 0)} products</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-green-600 h-2 rounded-full"
                                                            style={{ width: `${(deal.variants.reduce((acc, variant) => acc + variant.stock, 0) / deal.variants.reduce((acc, variant) => acc + variant.stock, 0)) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button
                                                onClick={() => router.push(`/collections/${deal.collection.name}/${deal.category.name}/${deal.slug}`)}
                                                className="w-full bg-green-800 text-white hover:bg-green-700">
                                                <ShoppingCart className="w-4 h-4 mr-2" />
                                                Add To Cart
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Promotional Cards */}
                <section className="py-8">
                    <div className="grid md:grid-cols-3 gap-6">
                        <Card className="bg-green-100 rounded-xl overflow-hidden">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-bold text-gray-800 mb-2">Summer Collection</h3>
                                        <p className="text-green-800 font-semibold">Up To -30%</p>
                                    </div>
                                    <img
                                        src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=100&q=80"
                                        alt="Summer Collection"
                                        className="w-16 h-16 object-cover rounded-lg"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-yellow-100 rounded-xl overflow-hidden">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-bold text-gray-800 mb-2">Accessories Sale</h3>
                                        <p className="text-yellow-800 font-semibold">Up To -20%</p>
                                    </div>
                                    <img
                                        src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=100&q=80"
                                        alt="Accessories"
                                        className="w-16 h-16 object-cover rounded-lg"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-orange-100 rounded-xl overflow-hidden">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-bold text-gray-800 mb-2">Footwear Deals</h3>
                                        <p className="text-orange-800 font-semibold">Up To -40%</p>
                                    </div>
                                    <img
                                        src="https://images.unsplash.com/photo-1542291026-7eec264c65f8?auto=format&fit=crop&w=100&q=80"
                                        alt="Footwear"
                                        className="w-16 h-16 object-cover rounded-lg"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Top Featured Products */}
                <section className="py-12 bg-gray-50">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Top Featured Products</h2>
                    <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide">
                        {topFeaturedProducts.map((product) => (
                            <Card key={product.id} className="min-w-[280px] max-w-[280px] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <CardContent className="p-0">
                                    <div className="relative w-full h-48">
                                        <img
                                            src={product.mainImage || ""}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                        {product.discount && (
                                            <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded">
                                                -{product.discount}
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
                                        <div className="flex items-center mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < product.ratingAvg ? "text-yellow-500" : "text-gray-300"}`}
                                                    fill={i < product.ratingAvg ? "currentColor" : "none"}
                                                />
                                            ))}
                                            <span className="text-sm text-gray-600 ml-2">({product.ratingCount})</span>
                                        </div>
                                        <div className="flex items-baseline mb-4">
                                            <span className="text-xl font-bold text-green-800">${product.basePrice}</span>
                                            {product.basePrice && (
                                                <span className="text-sm text-gray-500 line-through ml-2">
                                                    ${product.basePrice}
                                                </span>
                                            )}
                                        </div>
                                        <Button
                                            onClick={() => router.push(`/collections/${product.collection.name}/${product.category.name}/${product.slug}`)}
                                            className="w-full bg-green-800 text-white hover:bg-green-700">
                                            View Product
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>
        </Page>
    )
}