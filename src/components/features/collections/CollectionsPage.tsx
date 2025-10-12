"use client"

import { useCallback, useEffect, useState } from "react"
import Page from "../app/Page"
import { Button } from "@/components/ui/button"
import { ArrowRight, Grid3x3, Sparkles } from "lucide-react"
import Breadcrumb from "../app/Breadcrumb"
import useCollectionService from "@/services/client/collection/useCollectionService"
import { CollectionWithCategories } from "@/types/collection/collection.interface"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import ProductImage from "@/components/ui/product-image"

export default function CollectionsPage() {
    const { getCollectionsWithCategories, isLoading } = useCollectionService()
    const [collections, setCollections] = useState<CollectionWithCategories[]>([])
    const router = useRouter()

    const fetchCollections = useCallback(async () => {
        try {
            const response = await getCollectionsWithCategories()
            setCollections(response.data)
        } catch (error) {
            toast.error((error as Error).message)
        }
    }, [getCollectionsWithCategories])

    useEffect(() => {
        fetchCollections()
    }, [fetchCollections])

    const handleCollectionClick = useCallback((collectionName: string) => {
        const formattedName = collectionName.toLowerCase().replace(/ /g, '-')
        router.push(`/collections/${formattedName}`)
    }, [router])

    const handleCategoryClick = useCallback((collectionName: string, categoryName: string) => {
        const formattedCollection = collectionName.toLowerCase().replace(/ /g, '-')
        const formattedCategory = categoryName.toLowerCase().replace(/ /g, '-')
        router.push(`/collections/${formattedCollection}/${formattedCategory}`)
    }, [router])

    return (
        <Page className="bg-gradient-to-br from-lime-50/30 via-emerald-50/20 to-teal-50/30">
            <div className="relative min-h-screen">
                {/* Decorative Blobs */}
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-lime-200/30 to-emerald-200/30 rounded-full blur-3xl opacity-50 -z-10" />
                <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl opacity-50 -z-10" />
                <div className="absolute bottom-1/4 right-1/3 w-[450px] h-[450px] bg-gradient-to-br from-teal-200/30 to-cyan-200/30 rounded-full blur-3xl opacity-50 -z-10" />

                <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
                    <Breadcrumb />

                    {/* Hero Section */}
                    <div className="text-center mb-16 mt-10">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-700 text-white px-4 py-2 rounded-full font-bold text-sm mb-6 shadow-lg">
                            <Grid3x3 className="w-4 h-4" />
                            Our Collections
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
                            Explore Our
                            <span className="block bg-gradient-to-r from-lime-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                Fashion Collections
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Discover curated collections designed to elevate your style. From casual to formal, find the perfect pieces for every occasion.
                        </p>
                    </div>

                    {/* Loading State */}
                    {isLoading && (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-600"></div>
                        </div>
                    )}

                    {/* Collections Grid */}
                    {!isLoading && collections.length > 0 && (
                        <div className="space-y-16">
                            {collections.map((collection, collectionIndex) => (
                                <div key={collection.id} className="space-y-6">
                                    {/* Collection Header */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-4xl font-bold text-slate-900 mb-2">
                                                {collection.name}
                                            </h2>
                                            <p className="text-gray-600">
                                                {collection.categories.length} {collection.categories.length === 1 ? 'Category' : 'Categories'}
                                            </p>
                                        </div>
                                        <Button
                                            onClick={() => handleCollectionClick(collection.name)}
                                            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all group"
                                        >
                                            View All
                                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </div>

                                    {/* Categories Grid */}
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {collection.categories.map((category, categoryIndex) => {
                                            // Alternate gradient colors
                                            const gradients = [
                                                'from-lime-500 to-emerald-500',
                                                'from-emerald-500 to-teal-500',
                                                'from-teal-500 to-cyan-500',
                                            ]
                                            const gradient = gradients[categoryIndex % 3]

                                            return (
                                                <div
                                                    key={category.id}
                                                    onClick={() => handleCategoryClick(collection.name, category.name)}
                                                    className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border-0"
                                                >
                                                    <div className="relative overflow-hidden h-64">
                                                        <ProductImage
                                                            src=""
                                                            alt={category.name}
                                                            width={400}
                                                            height={256}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                            fallbackClassName={`w-full h-full bg-gradient-to-br from-lime-100 to-emerald-100`}
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/30 to-transparent" />
                                                        
                                                        {/* Category Badge */}
                                                        <div className={`absolute top-4 left-4 bg-gradient-to-r ${gradient} text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg`}>
                                                            {collection.name}
                                                        </div>

                                                        {/* Category Info */}
                                                        <div className="absolute bottom-4 left-4 right-4">
                                                            <h3 className="text-2xl font-bold text-white mb-2">
                                                                {category.name}
                                                            </h3>
                                                            <div className="flex items-center justify-between">
                                                                <p className="text-white/90 text-sm">
                                                                    Explore Collection
                                                                </p>
                                                                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-2 transition-transform" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    {/* Separator between collections (except last) */}
                                    {collectionIndex < collections.length - 1 && (
                                        <div className="pt-8">
                                            <div className="h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent"></div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {!isLoading && collections.length === 0 && (
                        <div className="text-center py-20">
                            <div className="w-24 h-24 bg-gradient-to-br from-lime-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Sparkles className="w-12 h-12 text-emerald-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">No Collections Found</h3>
                            <p className="text-gray-600">Check back soon for new collections!</p>
                        </div>
                    )}
                </div>
            </div>
        </Page>
    )
}