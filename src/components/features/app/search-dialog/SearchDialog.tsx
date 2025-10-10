"use client"

import { useState, useEffect, useMemo } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { X, Search, Clock, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Product } from "@/types/product/product.interface"
import useProductService from "@/services/client/product/useProductService"
import { useRouter } from "next/navigation"
import { useDebounce } from "@/hooks/useDebounce"

interface SearchDialogProps {
    children: React.ReactNode
}

export default function SearchDialog({ children }: SearchDialogProps) {
    const [open, setOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const debouncedSearchQuery = useDebounce(searchQuery, 300)
    const [searchResults, setSearchResults] = useState<Product[]>([])
    const [recentSearches, setRecentSearches] = useState<string[]>([])
    const [isSearching, setIsSearching] = useState(false)

    const { getProducts } = useProductService()
    const router = useRouter()

    // Load recent searches from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('recentSearches')
        if (saved) {
            setRecentSearches(JSON.parse(saved))
        }
    }, [])

    // Save recent searches to localStorage
    const saveRecentSearch = (query: string) => {
        if (query.trim() && !recentSearches.includes(query.trim())) {
            const updated = [query.trim(), ...recentSearches].slice(0, 5)
            setRecentSearches(updated)
            localStorage.setItem('recentSearches', JSON.stringify(updated))
        }
    }

    // Clear recent searches
    const clearRecentSearches = () => {
        setRecentSearches([])
        localStorage.removeItem('recentSearches')
    }

    // Handle search
    const handleSearch = async (query: string) => {
        if (!query.trim()) {
            setSearchResults([])
            return
        }

        setIsSearching(true)
        try {
            const response = await getProducts({
                keyword: query.trim(),
                limit: 10
            })
            setSearchResults(response.data.products)
            saveRecentSearch(query.trim())
        } catch (error) {
            console.error('Search error:', error)
            setSearchResults([])
        } finally {
            setIsSearching(false)
        }
    }

    // Debounced search
    useEffect(() => {
        handleSearch(debouncedSearchQuery)

    }, [debouncedSearchQuery])

    // Navigate to product
    const navigateToProduct = (product: Product) => {
        router.push(`/collections/${product.collection.name}/${product.category.name}/${product.slug}`)
        setOpen(false)
        setSearchQuery("")
    }

    // Handle recent search click
    const handleRecentSearchClick = (query: string) => {
        setSearchQuery(query)
    }

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                {children}
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
                <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-2xl max-h-[80vh] bg-white rounded-xl shadow-lg z-50 overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b">
                        <Dialog.Title className="text-xl font-semibold text-gray-800">
                            Search Products
                        </Dialog.Title>
                        <Dialog.Close asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <X className="h-4 w-4" />
                            </Button>
                        </Dialog.Close>
                    </div>

                    {/* Search Input */}
                    <div className="p-6 pb-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search for products, brands, categories..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 h-12 text-lg"
                                autoFocus
                            />
                        </div>
                    </div>

                    {/* Search Results */}
                    <div className="px-6 pb-6 max-h-96 overflow-y-auto">
                        {isSearching && (
                            <div className="flex items-center justify-center py-8">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                                <span className="ml-2 text-gray-600">Searching...</span>
                            </div>
                        )}

                        {!isSearching && searchQuery && searchResults.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                    Search Results ({searchResults.length})
                                </h3>
                                <div className="space-y-3">
                                    {searchResults.map((product) => (
                                        <div
                                            key={product.id}
                                            onClick={() => navigateToProduct(product)}
                                            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                        >
                                            <img
                                                src={product.mainImage || ""}
                                                alt={product.name}
                                                className="w-12 h-12 object-cover rounded-lg"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-gray-900 truncate">
                                                    {product.name}
                                                </h4>
                                                <p className="text-sm text-gray-500 truncate">
                                                    {product.category.name} • {product.collection.name}
                                                </p>
                                                <p className="text-sm font-semibold text-green-600">
                                                    ${product.basePrice}
                                                </p>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex items-center">
                                                    <span className="text-yellow-500">★</span>
                                                    <span className="text-sm text-gray-600 ml-1">
                                                        {product.ratingAvg.toFixed(1)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {!isSearching && searchQuery && searchResults.length === 0 && (
                            <div className="text-center py-8">
                                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    No products found
                                </h3>
                                <p className="text-gray-500">
                                    Try searching with different keywords or check your spelling
                                </p>
                            </div>
                        )}

                        {!searchQuery && recentSearches.length > 0 && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide flex items-center">
                                        <Clock className="h-4 w-4 mr-2" />
                                        Recent Searches
                                    </h3>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={clearRecentSearches}
                                        className="text-xs text-gray-500 hover:text-gray-700"
                                    >
                                        Clear all
                                    </Button>
                                </div>
                                <div className="space-y-2">
                                    {recentSearches.map((search, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleRecentSearchClick(search)}
                                            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                        >
                                            <div className="flex items-center">
                                                <Clock className="h-4 w-4 text-gray-400 mr-3" />
                                                <span className="text-gray-700">{search}</span>
                                            </div>
                                            <TrendingUp className="h-4 w-4 text-gray-400" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {!searchQuery && recentSearches.length === 0 && (
                            <div className="text-center py-8">
                                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Start searching
                                </h3>
                                <p className="text-gray-500">
                                    Enter a product name, category, or brand to find what you're looking for
                                </p>
                            </div>
                        )}
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
