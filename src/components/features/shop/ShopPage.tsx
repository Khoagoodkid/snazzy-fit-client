"use client"

import Breadcrumb from "../app/Breadcrumb"
import Page from "../app/Page"
import { Clock, TrendingUp } from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Product } from "@/types/product/product.interface"
import useProductService from "@/services/client/product/useProductService"
import { toast } from "react-toastify"
import useCategoriesService from "@/services/client/categories/useCategoriesService"
import { Category } from "@/types/categories/categories.interface"
import HeroBanner from "./HeroBanner"
import QuickAccessCards from "./QuickAccessCards"
import ProductCard from "./ProductCard"
import CategoryCard from "./CategoryCard"
import DealCard from "./DealCard"
import PromotionBanner from "./PromotionBanner"

export default function ShopPage() {
    const [products, setProducts] = useState<Product[]>([])
    const { getProducts } = useProductService()
    const { getCategories } = useCategoriesService()
    const [categories, setCategories] = useState<Category[]>([])

    const handleGetProducts = useCallback(async () => {
        try {
            const response = await getProducts({})
            setProducts(response.data.products)
        } catch (error) {
            toast.error((error as Error).message)
        }
    }, [getProducts])

    const handleGetCategories = useCallback(async () => {
        try {
            const response = await getCategories()
            setCategories(response.data)
        } catch (error) {
            toast.error((error as Error).message)
        }
    }, [getCategories])

    useEffect(() => {
        Promise.all([handleGetProducts(), handleGetCategories()])
    }, [handleGetProducts, handleGetCategories])

    const trendingProducts = useMemo(() => {
        return products.sort((a, b) => b.ratingAvg - a.ratingAvg).slice(0, 8)
    }, [products])

    const topFeaturedProducts = useMemo(() => {
        return products.filter((product) => product.isFeatured).sort((a, b) => b.ratingAvg - a.ratingAvg).slice(0, 8)
    }, [products])

    const topDeals = useMemo(() => {
        return products.sort((a, b) => b.discount - a.discount).slice(0, 2)
    }, [products])

    return (
        <Page className="bg-gradient-to-br from-cyan-50/30 via-teal-50/20 to-emerald-50/30">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <Breadcrumb />

                {/* Hero Banner & Quick Access Cards Section */}
                <section className="py-12">
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        {/* Main Hero Banner */}
                        <div className="lg:col-span-2">
                            <HeroBanner />
                        </div>

                        {/* Quick Access Cards */}
                        <div className="lg:col-span-1">
                            <QuickAccessCards />
                        </div>
                    </div>
                </section>

                {/* Hot Trending Products Section */}
                <section className="py-12">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-bold text-xs mb-3">
                                <TrendingUp className="w-3 h-3" />
                                TRENDING NOW
                            </div>
                            <h2 className="text-4xl font-bold text-slate-900">Hot Trending Products</h2>
                        </div>
                        <button className="text-slate-700 hover:text-slate-900 font-semibold flex items-center gap-2 group">
                            View All Products
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {trendingProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>

                {/* Popular Categories Section */}
                <section className="py-12">
                    <div className="text-center mb-10">
                        <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full mb-3">
                            CATEGORIES
                        </span>
                        <h2 className="text-4xl font-bold text-slate-900">Popular Categories</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {categories.map((category) => (
                            <CategoryCard key={category.id} category={category} />
                        ))}
                    </div>
                </section>

                {/* Top Deals Section */}
                <section className="py-12">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                        <div>
                            <span className="inline-block px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs rounded-full mb-3">
                                TODAY'S DEALS
                            </span>
                            <h2 className="text-4xl font-bold text-slate-900">Top Deals Of The Day</h2>
                        </div>
                        <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full border border-red-200">
                            <Clock className="w-5 h-5 text-red-600" />
                            <span className="font-semibold text-red-600 text-sm">Ends in 00:01:19:36</span>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {topDeals.map((deal) => (
                            <DealCard key={deal.id} deal={deal} />
                        ))}
                    </div>
                </section>

                {/* Promotional Banners */}
                <section className="py-12">
                    <PromotionBanner />
                </section>

                {/* Top Featured Products */}
                <section className="py-12">
                    <div className="text-center mb-10">
                        <span className="inline-block px-3 py-1 bg-slate-800 text-white font-bold text-xs rounded-full mb-3">
                            FEATURED
                        </span>
                        <h2 className="text-4xl font-bold text-slate-900">Top Featured Products</h2>
                        <p className="text-gray-600 mt-2">Handpicked favorites from our collection</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {topFeaturedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} showAddToCart={false} />
                        ))}
                    </div>
                </section>
            </div>
        </Page>
    )
}