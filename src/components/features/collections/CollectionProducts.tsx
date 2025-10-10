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
import Image from "next/image";



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


    return (
        <Page className="">
            <div className="flex gap-8 p-6 max-w-screen mx-auto">
                {/* Left Sidebar - Filter Options */}
                <div className="w-80 space-y-6 sticky top-6 self-start">


                    {/* Category Section */}
                    <div className="p-0">
                        <h3 className="text-lg font-bold text-black ">Category</h3>
                        <div
                            className="space-y-2 max-h-48 overflow-y-auto mt-2 pl-4"

                        >
                            {categories.map((category) => (

                                <div
                                    key={category.name}
                                    data-state={category.name.toLowerCase() === categoryName?.toLowerCase() ? "checked" : "unchecked"}
                                    className="text-sm text-gray-700 cursor-pointer hover:text-[var(--green-primary)] data-[state=checked]:text-[var(--green-primary)]
                                        data-[state=checked]:font-medium
                                    "
                                    onClick={() => handleCategoryChange(category.name)}>
                                    {category.name}
                                </div>
                            ))}
                        </div>
                    </div>

                    <Separator className="my-0" />
                    <h2 className="text-lg font-bold text-black mt-2">Filter By</h2>
                    {/* Price Section */}
                    <div className="p-0">
                        <h3 className="font-semibold text-black">Price</h3>
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
                        <h3 className="font-semibold text-black mb-3">Season</h3>
                        <MultiSelectRadioGroup
                            options={SEASONS}
                            selected={filters.seasons}
                            onSelect={handleSeasonsChange}
                            onRemove={handleSeasonsRemove}
                            type="checkbox" />

                    </div>


                    {/* Style Section */}
                    <div className="p-0">
                        <h3 className="font-semibold text-black mb-3">Style</h3>
                        <MultiSelectRadioGroup
                            options={STYLES}
                            selected={filters.styles}
                            onSelect={handleStylesChange}
                            onRemove={handleStylesRemove}
                            type="button" />
                    </div>


                    {/* Availability Section */}
                    <div className="p-0">
                        <h3 className="font-semibold text-black mb-3">Availability</h3>
                        <div className="space-y-2">
                            {availabilityOptions.map((option, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={option.label.toLowerCase().replace(' ', '-')}
                                        defaultChecked={option.checked}
                                        className="data-[state=checked]:bg-green-900 data-[state=checked]:border-green-900"
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
                    <div className="px-4">
                        <BreadcrumbComponent />
                    </div>
                    <div className="flex justify-between items-center  px-4">
                        <h3 className="font-bold text-black text-[48px]">{collectionName.charAt(0).toUpperCase() + collectionName.slice(1)}

                            {categoryId && <span className="text-sm text-gray-500 ml-2">/ {categories.find((category) => category.id === categoryId)?.name}</span>}
                        </h3>

                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-700">Sort by:</span>
                            <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                                <option>Default Sorting</option>
                            </select>
                        </div>
                    </div>


                    {/* Search */}
                    <div className="flex items-center justify-start gap-2 px-4 mt-8">
                        <div className="w-64">
                            <Input
                                prefix={<Search className="w-4 h-4 text-gray-600" />}
                                className="w-full border border-gray-300 rounded-md h-9 focus:ring-[var(--green-primary)]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                type="text"
                            />
                        </div>
                        <Button
                            onClick={hanldeSubmitSearch}
                            variant="outline" className="py-2 px-4 bg-[var(--green-primary)] text-white shadow-sm">
                            Search
                        </Button>
                        <div className="text-sm text-gray-500 px-4">Showing {Math.min(totalRecords, (currentPage - 1) * NUMBER_OF_PRODUCTS_PER_PAGE + 1)}-{Math.min(totalRecords, currentPage * NUMBER_OF_PRODUCTS_PER_PAGE)} of {totalRecords} results</div>

                    </div>
                    {/* Active Filters */}
                    <div className="px-4 flex flex-wrap gap-2 items-center mt-5 mb-1">

                        <ActiveFilters
                            filters={filters}
                            priceRange={priceRange}
                            onRemoveSeason={handleSeasonsRemove}
                            onRemoveStyle={handleStylesRemove}
                            onClearAll={handleClearAll}
                        />


                    </div>



                    {/* Product Grid */}
                    <div className="grid grid-cols-3 gap-4  mb-8 ">
                        {products.map((product, index) => (
                            <div key={index}
                                onClick={() => handleProductClick(product.category.name, product.slug)}
                                className="overflow-hidden space-y-2 hover:bg-gray-100 transition-all duration-300 p-3 rounded-xl cursor-pointer">
                                <div className="relative">
                                    <Image
                                        src={product.mainImage || ""}
                                        alt={product.name}
                                        className="w-full h-80 object-cover rounded-xl"
                                        width={320}
                                        height={320}
                                    />
                                    <div className="absolute top-2 left-2">
                                        <span className="bg-green-900 text-white px-3 py-1 rounded-full text-sm font-medium">
                                            {product.discount}% off
                                        </span>
                                    </div>
                                    <div className="absolute top-2 right-2 flex gap-2">
                                        <Button variant="ghost" size="icon" className="w-8 h-8 bg-white shadow-sm">
                                            <span className="text-gray-600 text-sm">♡</span>
                                        </Button>
                                        <Button variant="ghost" size="icon" className="w-8 h-8 bg-white shadow-sm">
                                            <span className="text-gray-600 text-sm">⧉</span>
                                        </Button>
                                    </div>
                                </div>
                                <div className=" mt-0">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="text-sm text-gray-500 mb-1">{product.category.name}</div>
                                        <div className="flex items-center gap-1 mb-2">
                                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                            <span className="text-sm text-gray-600 font-bold">{product.ratingAvg}</span>
                                        </div>
                                    </div>
                                    <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
                                    <p className="text-sm text-gray-500 mb-2">{product.brand}</p>

                                    <div className="flex items-end justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-gray-800 text-lg">${product.basePrice}.00</span>
                                            <span className="text-md text-gray-500 line-through">${product.basePrice}.00</span>
                                        </div>
                                        <button
                                            className="p-3 rounded-sm bg-[var(--green-primary)] shadow-sm hover:bg-[var(--green-primary)]/80 cursor-pointer"
                                        >
                                            <ShoppingCartIcon className="w-6 h-6 text-white" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-center gap-2">
                        <PaginationComponent
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
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
                        <div key={index} className="text-sm bg-gray-100 px-3 py-1 rounded-sm text-gray-500 font-normal flex items-center gap-2">
                            <label>{value}</label>
                            <X className="w-4 h-4 text-black cursor-pointer" onClick={(e) => {
                                e.stopPropagation();
                                console.log(value, filter.label);
                                handleRemoveActiveFilter(value, filter.label as "seasons" | "styles" | "category" | "price");
                            }} />
                        </div>
                    ))
                ))}
            </div>
            <Button variant="link" className="text-gray-800 p-0 h-auto" onClick={onClearAll}>
                Clear All
            </Button>
        </div>
    )
}