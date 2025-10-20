"use client"

import Page from "../app/Page"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useCallback, useEffect, useState } from "react";
import { Product } from "@/types/product/product.interface";
import useProductService from "@/services/client/product/useProductService";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { Category } from "@/types/categories/categories.interface";
import useCategoryService from "@/services/client/categories/useCategoriesService";
import PaginationComponent from "../app/Pagination"
import MultiSelectRadioGroup from "@/components/ui/multiple-radio-group"
import { Separator } from "@/components/ui/separator"
import { PriceRangeSlider } from "./PriceRangeSlider"
import { X, ShoppingCartIcon, Star, Search } from "lucide-react"
import BreadcrumbComponent from "../app/Breadcrumb"
import useCollectionService from "@/services/client/collection/useCollectionService";
import { Input } from "@/components/ui/input";
import ProductImage from "@/components/ui/product-image";



const STYLES = ["Casual", "Formal", "Sports", "Work", "Party"]

const SEASONS = ["Summer", "Winter", "Spring", "Autumn"]

const availabilityOptions = [
    { label: "In Stock", checked: true },
    { label: "Out of Stock", checked: false }
]



export const NUMBER_OF_PRODUCTS_PER_PAGE = 12;

interface Filters {
    price: {
        from: number;
        to: number;
    };
    seasons: string[];
    styles: string[];
    category: Category | null;
    keyword: string;
}

export default function CollectionProducts() {

    const { getProducts } = useProductService();
    const { getCategories } = useCategoryService();
    const { getCollections } = useCollectionService();
    const searchParams = useSearchParams();
    const params = useParams();
    const router = useRouter();
    const collectionName = params.collectionName as string;
    const categoryName = params.categoryName as string;

    const [categoryId, setCategoryId] = useState<string | null>(null);
    const [collectionId, setCollectionId] = useState<string | null>(null);

    const page = parseInt(searchParams.get("page") as string) || 1;
    const priceFrom = parseInt(searchParams.get("price_from") as string);
    const priceTo = parseInt(searchParams.get("price_to") as string);
    const seasons = searchParams.get("season");
    const styles = searchParams.get("style");
    const keyword = searchParams.get("keyword");

    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [filters, setFilters] = useState<Filters>({
        price: {
            from: 0,
            to: 0,
        },
        category: null,
        seasons: seasons?.split(",") || [],
        styles: styles?.split(",") || [],
        keyword: keyword || "",
    })
    const [searchTerm, setSearchTerm] = useState(keyword || "");

    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(page);
    const [totalRecords, setTotalRecords] = useState(0);
    const [priceRange, setPriceRange] = useState({
        from: priceFrom || 0,
        to: priceTo || 0,
    });
    const [maxPrice, setMaxPrice] = useState(0);
    const [sortBy, setSortBy] = useState<string>("default");

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
        if (categoryName) {
            router.push(`/collections/${collectionName}/${categoryName}?page=${page}`);
        } else {
            router.push(`/collections/${collectionName}?page=${page}`);
        }
    }, [collectionName, categoryName, router]);



    const fetchProducts = useCallback(async () => {
        console.log(priceFrom, priceTo);
        if (!collectionId) {
            return;
        }

        if (categoryName && !categoryId) {
            return;
        }
        try {
            const response = await getProducts({
                limit: NUMBER_OF_PRODUCTS_PER_PAGE,
                offset: (page - 1) * NUMBER_OF_PRODUCTS_PER_PAGE,
                collection_id: collectionId,
                ...(categoryId && { category_id: categoryId }),
                ...(priceFrom && { price_from: priceFrom }),
                ...(priceTo && { price_to: priceTo }),
                ...(seasons && { seasons: seasons }),
                ...(styles && { styles: styles }),
                ...(keyword && { keyword: keyword }),
            });
            setProducts(response.data.products);
            setMaxPrice(Math.ceil(response.data.maxPrice));
            if (!priceTo) {
                setPriceRange({ ...priceRange, to: Math.ceil(response.data.maxPrice) });
            }
            setTotalRecords(response.totalRecord);
            setTotalPages(Math.ceil(response.totalRecord / NUMBER_OF_PRODUCTS_PER_PAGE));
            console.log(response.data);
        } catch (error) {
            toast.error((error as Error).message);
        }
    }, [getProducts, collectionId, categoryId, priceFrom, priceTo, seasons, styles, keyword]);


    const fetchCategories = useCallback(async () => {
        try {
            const response = await getCategories();
            setCategories(response.data);
            console.log(response.data);

            // Set categoryId if categoryName exists in URL
            if (categoryName) {
                const foundCategory = response.data?.find((category) =>
                    category.name.toLowerCase().replace(/ /g, '-') === categoryName.toLowerCase()
                );
                if (foundCategory) {
                    setCategoryId(foundCategory.id);
                    setFilters({ ...filters, category: foundCategory });
                }
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    }, [getCategories, categoryName]);

    const fetchCollections = useCallback(async () => {
        try {
            const response = await getCollections({ keyword: collectionName });
            setCollectionId(response.data[0].id);
        } catch (error) {
            toast.error((error as Error).message);
        }
    }, [getCollections]);


    useEffect(() => {
        Promise.all([fetchCollections(), fetchCategories()]);
    }, [fetchCollections, fetchCategories]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        if (!collectionId) {
            return;
        }
        const urlSearchParams = new URLSearchParams({
            ...(currentPage && { page: currentPage.toString() }),
            ...(filters.keyword && { keyword: filters.keyword }),
        });
        if (filters.price.from) {
            urlSearchParams.set("price_from", filters.price.from.toString());
        }
        if (filters.price.to) {
            urlSearchParams.set("price_to", filters.price.to.toString());
        }
        if (filters.seasons.length > 0) {
            urlSearchParams.set("season", filters.seasons.join(","));
        }
        if (filters.styles.length > 0) {
            urlSearchParams.set("style", filters.styles.join(","));
        }

        const queryString = urlSearchParams.toString();
        const baseUrl = categoryName
            ? `/collections/${collectionName}/${categoryName}`
            : `/collections/${collectionName}`;

        router.push(`${baseUrl}${queryString ? `?${queryString}` : ''}`);
    }, [filters, currentPage, router, collectionId, collectionName, categoryName]);

    const handleCategoryChange = useCallback((categoryName: string) => {
        const formattedCategoryName = categoryName.toLowerCase().replace(/ /g, '-');
        router.push(`/collections/${collectionName}/${formattedCategoryName}`);
    }, [collectionName, router]);

    const handlePriceRangeChange = useCallback((value: number, type: "from" | "to") => {
        // setFilters({ ...filters, price: { ...filters.price, [type]: value } });
        setPriceRange({ ...priceRange, [type]: value });
    }, [priceRange]);

    const handleSubmitPriceRange = useCallback(() => {
        setFilters((prev) => ({ ...prev, price: { ...prev.price, from: priceRange.from, to: priceRange.to } }));
    }, [priceRange]);

    const handleSeasonsRemove = useCallback((value: string) => {
        setFilters((prev) => ({ ...prev, seasons: prev.seasons.filter(season => season !== value) }));
    }, []);

    const handleSeasonsChange = useCallback((value: string) => {
        setFilters((prev) => ({ ...prev, seasons: [...prev.seasons, value] }));
    }, []);

    const handleStylesRemove = useCallback((value: string) => {
        setFilters((prev) => ({ ...prev, styles: prev.styles.filter(style => style !== value) }));
    }, []);

    const handleStylesChange = useCallback((value: string) => {
        setFilters((prev) => ({ ...prev, styles: [...prev.styles, value] }));
    }, []);

    const handleClearAll = useCallback(() => {
        setPriceRange({ from: 0, to: maxPrice });
        setFilters((prev) => ({ ...prev, price: { from: 0, to: 0 }, seasons: [], styles: [] }));
    }, []);

    const hanldeSubmitSearch = useCallback(() => {
        setFilters((prev) => ({ ...prev, keyword: searchTerm }));
    }, [searchTerm]);

    const handleProductClick = useCallback((categoryName: string, slug: string) => {
        const formatedCategoryName = categoryName[0].toLowerCase() + categoryName.slice(1);
        router.push(`/collections/${collectionName}/${formatedCategoryName}/${slug}`);

    }, [collectionName, router]);

    const handleSortChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(event.target.value);
    }, []);

    // Sort products based on selected sort option
    const sortedProducts = [...products].sort((a, b) => {
        switch (sortBy) {
            case "rating":
                return (b.ratingAvg || 0) - (a.ratingAvg || 0);
            case "price-low-high":
                return a.basePrice - b.basePrice;
            case "price-high-low":
                return b.basePrice - a.basePrice;
            case "newest":
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            case "oldest":
                return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
            default:
                return 0;
        }
    });


    return (
        <Page className="bg-gradient-to-br from-cyan-50/30 via-teal-50/20 to-emerald-50/30">
            <div className="relative">
                {/* Decorative Blobs */}
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-cyan-200/30 to-teal-200/30 rounded-full blur-3xl opacity-50 -z-10" />
                <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-teal-200/30 to-emerald-200/30 rounded-full blur-3xl opacity-50 -z-10" />
                <div className="absolute bottom-1/4 right-1/3 w-[450px] h-[450px] bg-gradient-to-br from-emerald-200/30 to-green-200/30 rounded-full blur-3xl opacity-50 -z-10" />

                <div className="flex gap-8 p-6 max-w-screen mx-auto relative z-10">
                    {/* Left Sidebar - Filter Options */}
                    <div className="w-80 space-y-6 sticky top-6 self-start bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-100">
                        {/* Category Section */}
                        <div className="p-0">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Category</h3>
                            <div className="space-y-2 max-h-48 overflow-y-auto mt-2 pl-4">
                                {categories.map((category) => (
                                    <div
                                        key={category.name}
                                        data-state={category.name.toLowerCase() === categoryName?.toLowerCase() ? "checked" : "unchecked"}
                                        className="text-sm text-gray-700 cursor-pointer hover:text-emerald-600 data-[state=checked]:text-emerald-600
                                            data-[state=checked]:font-semibold transition-all
                                        "
                                        onClick={() => handleCategoryChange(category.name)}>
                                        {category.name}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Separator className="my-0" />
                        <h2 className="text-lg font-bold text-slate-900 mt-2 mb-4">Filter By</h2>
                        
                        {/* Price Section */}
                        <div className="p-0">
                            <h3 className="font-semibold text-slate-900 mb-3">Price</h3>
                            <div className="">
                                <PriceRangeSlider
                                    maxPrice={maxPrice}
                                    min={priceRange.from}
                                    max={priceRange.to}
                                    onMinChange={(value) => handlePriceRangeChange(value, "from")}
                                    onMaxChange={(value) => handlePriceRangeChange(value, "to")}
                                    onSubmit={handleSubmitPriceRange}
                                />
                            </div>
                        </div>

                        {/* Season Section */}
                        <div className="p-0">
                            <h3 className="font-semibold text-slate-900 mb-3">Season</h3>
                            <MultiSelectRadioGroup
                                options={SEASONS}
                                selected={filters.seasons}
                                onSelect={handleSeasonsChange}
                                onRemove={handleSeasonsRemove}
                                type="checkbox" />
                        </div>

                        {/* Style Section */}
                        <div className="p-0">
                            <h3 className="font-semibold text-slate-900 mb-3">Style</h3>
                            <MultiSelectRadioGroup
                                options={STYLES}
                                selected={filters.styles}
                                onSelect={handleStylesChange}
                                onRemove={handleStylesRemove}
                                type="button" />
                        </div>

                        {/* Availability Section */}
                        <div className="p-0">
                            <h3 className="font-semibold text-slate-900 mb-3">Availability</h3>
                            <div className="space-y-2">
                                {availabilityOptions.map((option, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={option.label.toLowerCase().replace(' ', '-')}
                                            defaultChecked={option.checked}
                                            className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-emerald-600 data-[state=checked]:to-teal-600 data-[state=checked]:border-emerald-600"
                                        />
                                        <label htmlFor={option.label.toLowerCase().replace(' ', '-')} className="text-sm text-gray-700 cursor-pointer">
                                            {option.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Main Content */}
                    <div className="flex-1 min-h-screen">
                        {/* Top Section */}
                        <div className="px-4 mb-6">
                            <BreadcrumbComponent />
                        </div>
                        <div className="flex justify-between items-center px-4 mb-6">
                            <div>
                                <h3 className="font-bold text-slate-900 text-5xl mb-2">
                                    {collectionName.charAt(0).toUpperCase() + collectionName.slice(1)}
                                </h3>
                                {categoryId && (
                                    <span className="text-lg text-gray-600 font-medium">
                                        {categories.find((category) => category.id === categoryId)?.name}
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-slate-700">Sort by:</span>
                                <select 
                                    value={sortBy}
                                    onChange={handleSortChange}
                                    className="border-2 border-gray-200 rounded-xl px-4 py-2 text-sm font-medium focus:border-emerald-500 focus:outline-none transition-all cursor-pointer">
                                    <option value="default">Default Sorting</option>
                                    <option value="rating">Rating (High to Low)</option>
                                    <option value="price-low-high">Price (Low to High)</option>
                                    <option value="price-high-low">Price (High to Low)</option>
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                </select>
                            </div>
                        </div>

                        {/* Search */}
                        <div className="flex items-center justify-start gap-3 px-4 mt-8">
                            <div className="w-72">
                                <Input
                                    prefix={<Search className="w-4 h-4 text-gray-600" />}
                                    className="w-full border-2 border-gray-200 rounded-xl h-11 focus:ring-emerald-500 focus:border-emerald-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    type="text"
                                    placeholder="Search products..."
                                />
                            </div>
                            <Button
                                onClick={hanldeSubmitSearch}
                                className="px-6 py-3 h-11 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
                                Search
                            </Button>
                            <div className="text-sm text-gray-600 px-4 font-medium">
                                Showing {Math.min(totalRecords, (currentPage - 1) * NUMBER_OF_PRODUCTS_PER_PAGE + 1)}-{Math.min(totalRecords, currentPage * NUMBER_OF_PRODUCTS_PER_PAGE)} of {totalRecords} results
                            </div>
                        </div>
                        
                        {/* Active Filters */}
                        <div className="px-4 flex flex-wrap gap-2 items-center mt-6 mb-4">
                            <ActiveFilters
                                filters={filters}
                                priceRange={priceRange}
                                onRemoveSeason={handleSeasonsRemove}
                                onRemoveStyle={handleStylesRemove}
                                onClearAll={handleClearAll}
                            />
                        </div>



                        {/* Product Grid */}
                        <div className="grid grid-cols-3 gap-6 mb-8 px-4">
                            {sortedProducts.map((product, index) => (
                                <div key={index}
                                    onClick={() => handleProductClick(product.category.name, product.slug)}
                                    className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border-0">
                                    <div className="relative overflow-hidden">
                                        <ProductImage
                                            src={product.mainImage || ""}
                                            alt={product.name}
                                            width={320}
                                            height={320}
                                            className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                                            fallbackClassName="w-full h-80 bg-gradient-to-br from-cyan-100 to-teal-100"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        
                                        <div className="absolute top-3 left-3">
                                            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                                                {product.discount}% off
                                            </span>
                                        </div>
                                        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <Button variant="ghost" size="icon" className="w-9 h-9 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-xl">
                                                <span className="text-gray-700 text-lg">♡</span>
                                            </Button>
                                            <Button variant="ghost" size="icon" className="w-9 h-9 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-xl">
                                                <span className="text-gray-700 text-lg">⧉</span>
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <div className="flex items-center justify-between gap-2 mb-2">
                                            <div className="text-sm text-gray-500 font-medium">{product.category.name}</div>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-amber-400 fill-current" />
                                                <span className="text-sm text-slate-900 font-bold">{product.ratingAvg}</span>
                                            </div>
                                        </div>
                                        <h3 className="font-bold text-slate-900 mb-1 text-lg group-hover:text-emerald-600 transition-colors">{product.name}</h3>
                                        <p className="text-sm text-gray-600 mb-3 font-medium">{product.brand}</p>

                                        <div className="flex items-end justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-slate-900 text-xl">${product.basePrice}</span>
                                                <span className="text-sm text-gray-400 line-through">${product.basePrice}</span>
                                            </div>
                                            <button
                                                className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all"
                                            >
                                                <ShoppingCartIcon className="w-5 h-5 text-white" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-center gap-2 px-4">
                            <PaginationComponent
                                totalPages={totalPages}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Page >
    )
}


const ActiveFilters = ({
    filters,
    priceRange,
    onRemoveSeason,
    onRemoveStyle,
    onClearAll,
}: {
    filters: Filters,
    priceRange: { from: number, to: number },
    onRemoveSeason: (value: string) => void,
    onRemoveStyle: (value: string) => void,
    onClearAll: () => void,
}) => {
    const activeFilters: Array<{ label: string; value: string | string[] }> = [];



    // Add seasons filter
    if (filters.seasons.length > 0) {
        activeFilters.push({
            label: "seasons",
            value: filters.seasons
        });
    }

    // Add styles filter
    if (filters.styles.length > 0) {
        activeFilters.push({
            label: "styles",
            value: filters.styles
        });
    }


    // Add price filter
    if (priceRange.from >= 0 || priceRange.to > 0) {
        activeFilters.push({
            label: "price",
            value: [`Price: $${priceRange.from} - $${priceRange.to}`]
        });
    }

    const handleRemoveActiveFilter = (value: string, type: "seasons" | "styles" | "category" | "price") => {
        if (type === "seasons") {
            onRemoveSeason(value);
        } else if (type === "styles") {
            onRemoveStyle(value);
        }
    }


    return (
        <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2">
                {activeFilters.map((filter) => (
                    Array.isArray(filter.value) && filter.value.map((value, index) => (
                        <div key={index} className="text-sm bg-gradient-to-r from-cyan-100 to-teal-100 px-4 py-2 rounded-full text-slate-700 font-semibold flex items-center gap-2 border border-teal-200 shadow-sm">
                            <label>{value}</label>
                            <X className="w-4 h-4 text-teal-600 cursor-pointer hover:text-teal-800 transition-colors" onClick={(e) => {
                                e.stopPropagation();
                                console.log(value, filter.label);
                                handleRemoveActiveFilter(value, filter.label as "seasons" | "styles" | "category" | "price");
                            }} />
                        </div>
                    ))
                ))}
            </div>
            <Button variant="link" className="text-teal-600 hover:text-teal-800 p-0 h-auto font-semibold" onClick={onClearAll}>
                Clear All
            </Button>
        </div>
    )
}