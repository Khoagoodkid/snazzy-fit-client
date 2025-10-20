"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Page from "../app/Page";
import BreadcrumbComponent from "../app/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Heart, Plus, Minus, Share2, Star, ShoppingCart } from "lucide-react";
import useProductService from "@/services/client/product/useProductService";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { Product } from "@/types/product/product.interface";
import useCartService from "@/services/client/cart/useCartService";
import { handleEncodeData } from "@/utils/handleEncodeData";
import { useRouter } from "next/navigation";
import ProductReviewSection from "./ProductReviewSection";
// Mock data for the product
const mockProduct = {
    id: "1",
    name: "Red Gaming Chair",
    slug: "red-gaming-chair",
    category: "Chair",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    basePrice: 100.00,
    discount: 10,
    currency: "USD",
    mainImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop&crop=center",
    images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&h=800&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&h=800&fit=crop&crop=center"
    ],
    ratingAvg: 4.9,
    ratingCount: 245,
    stock: 10,
    sku: "FRNC87654ABC",
    tags: ["Furniture", "Office", "Gaming Chair", "Chair"],
    variants: [
        { color: "Black", hex: "#000000" },
        { color: "Brown", hex: "#8B4513" },
        { color: "Light Green", hex: "#90EE90" },
        { color: "Blue", hex: "#0000FF" }
    ]
};

const mockRelatedProducts = [
    {
        id: "2",
        name: "Swivel Chair",
        price: 100.00,
        discount: 40,
        image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=400&fit=crop&crop=center",
        rating: 4.8
    },
    {
        id: "3",
        name: "Circular Sofa Chair",
        price: 120.00,
        discount: 10,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center",
        rating: 5.0
    },
    {
        id: "4",
        name: "Brown Swivel chair",
        price: 100.00,
        discount: 10,
        image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=400&fit=crop&crop=center",
        rating: 5.0
    },
    {
        id: "5",
        name: "Wingback Chair",
        price: 200.00,
        discount: 20,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center",
        rating: 4.9
    }
];

export default function ProductDetail() {
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("description");
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedColor, setSelectedColor] = useState<number>(0);
    const [selectedSize, setSelectedSize] = useState<number>(0);
    const router = useRouter();


    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            />
        ));
    };
    const { getProductBySlug } = useProductService();
    const { addToCart } = useCartService();
    const params = useParams();
    const slug = params.slug as string;


    const handleGetProductDetail = useCallback(async () => {
        try {
            const response = await getProductBySlug(slug);
            setProduct(response.data);
        } catch (error) {
            toast.error((error as Error).message);
        }
    }, [getProductBySlug, slug]);

    const handleSelectColor = useCallback((index: number) => {
        setSelectedColor(index);

        const isSizeAvailable = product?.variants?.some((variant) => variant.color === colors[index]?.color && variant.size === sizes[selectedSize]);

        console.log("isSizeAvailable", isSizeAvailable);
        if (!isSizeAvailable) {
            const availableSize = product?.variants?.find((variant) => variant.color === colors[index]?.color)?.size;
            setSelectedSize(sizes.indexOf(availableSize || "") || 0);
        }
    }, []);

    useEffect(() => {
        handleGetProductDetail();
    }, [handleGetProductDetail]);



    const colors = useMemo(() => {
        if (!product) return [];
        let alreadyAddedColors: string[] = [];
        return product.variants?.map((variant) => {
            if (alreadyAddedColors.includes(variant.color)) return null;
            alreadyAddedColors.push(variant.color);
            return {
                color: variant.color,
                color_code: variant.color_code
            }
        }).filter(Boolean) || [];
    }, [product]);

    const sizes = ["S", "M", "L", "XL"];

    const selectedVariant = useMemo(() => {
        return product?.variants?.find((variant) => variant.color === colors[selectedColor]?.color && variant.size === sizes[selectedSize]);
    }, [product, colors, selectedColor, selectedSize]);

    const handleAddToCart = useCallback(() => {
        try {
            if (selectedVariant) {
                addToCart({ variantId: selectedVariant.id, quantity: quantity });
                toast.success("Product added to cart");
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    }, [selectedVariant, quantity, addToCart]);


    useEffect(() => {
        setQuantity((prev) => Math.min(prev, selectedVariant?.stock || 1));
    }, [selectedVariant]);


    const handleBuyNow = useCallback(() => {

        const unit_price = (selectedVariant?.price || 0) * (1 - (product?.discount || 0) / 100) || 0;
        const shipping = 2;
        const subtotal = unit_price * quantity || 0;
        const tax = subtotal * 0.1;
        const total = subtotal + tax + shipping;
        const checkoutData = {
            items: [{
                variant_id: selectedVariant?.id,
                quantity: quantity,
                unit_price: unit_price,
                total_price: unit_price * quantity,
            }],
            shipping: shipping,
            totalItems: quantity,
            subtotal: subtotal,
            tax: tax,
            total: total,
        }
        const encodedData = handleEncodeData(checkoutData)
        router.push(`/checkout?data=${encodedData}`)
    }, [selectedVariant, quantity, router]);

    if (!product) return null;
    return (
        <Page className="bg-gradient-to-br from-cyan-50/30 via-teal-50/20 to-emerald-50/30">
            <div className="relative">
                {/* Decorative Blobs */}
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-cyan-200/30 to-teal-200/30 rounded-full blur-3xl opacity-50 -z-10" />
                <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-teal-200/30 to-emerald-200/30 rounded-full blur-3xl opacity-50 -z-10" />
                <div className="absolute bottom-1/4 right-1/3 w-[450px] h-[450px] bg-gradient-to-br from-emerald-200/30 to-green-200/30 rounded-full blur-3xl opacity-50 -z-10" />

                <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
                    <BreadcrumbComponent />

                    {/* Product Display Section */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 mt-8 border border-gray-100" >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Side - Product Images */}
                        <div className="space-y-4">
                            {/* Main Image */}
                            <div className="relative">
                                <img
                                    src={"https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=400&fit=crop&crop=center"}
                                    alt={product?.name || ""}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                                {/* Navigation Arrows */}
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg hover:bg-gray-50"
                                    onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : (product?.images?.length || 0) - 1)}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg hover:bg-gray-50"
                                    onClick={() => setSelectedImage(prev => prev < (product?.images?.length || 0) - 1 ? prev + 1 : 0)}
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>

                            {/* Thumbnail Images */}
                            <div className="flex gap-2">
                                {product?.images?.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index ? 'border-emerald-500 shadow-lg' : 'border-gray-200 hover:border-emerald-300'
                                            }`}
                                    >
                                        <img
                                            src={"https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=400&fit=crop&crop=center"}
                                            alt={`${product?.name} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right Side - Product Details */}
                        <div className="space-y-6">
                            {/* Category */}
                            <p className="text-gray-500 text-sm">{product.category.name}</p>

                            {/* Product Title */}
                            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

                            {/* Stock Status */}
                            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 text-sm font-semibold border border-emerald-200">
                                In Stock
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-2">
                                <div className="flex">
                                    {renderStars(product.ratingAvg || 0)}
                                </div>
                                <span className="text-sm text-gray-600">
                                    {product.ratingAvg} ({product.ratingCount} Review)
                                </span>
                            </div>

                            {/* Price */}
                            <div className="flex items-center gap-3">
                                <span className="text-2xl font-bold text-gray-900">
                                    ${(selectedVariant?.price ? (selectedVariant?.price * (1 - (product.discount || 0) / 100)) : 0).toFixed(2) || 0}
                                </span>
                                <span className="text-lg text-gray-500 line-through">
                                    ${selectedVariant?.price?.toFixed(2) || 0}
                                </span>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                            </p>

                            {/* Color Selector */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Color: {colors[selectedColor]?.color || ""}
                                </label>
                                <div className="flex gap-2 flex-wrap w-3/5 mt-2">
                                    {colors.map((color, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSelectColor(index)}
                                            className={`w-8 h-8 rounded-full border-2 ${selectedColor === index ? 'border-gray-800' : 'border-gray-300'
                                                }`}
                                            style={{ backgroundColor: color?.color_code }}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Size: {sizes[selectedSize] || ""}
                                </label>
                                <div className="flex gap-2 flex-wrap w-3/5 mt-2">
                                    {sizes.map((size, index) => {
                                        const isAvailable = product.variants?.some((variant) => variant.size === size && variant.color === colors[selectedColor]?.color);
                                        return (
                                            <Button
                                                key={index}
                                                disabled={!isAvailable}
                                                onClick={() => setSelectedSize(index)}
                                                className={`w-20 rounded-sm text-black bg-gray-300 hover:bg-gray-400 border  ${selectedSize === index ? ' bg-gray-400' : 'border-transparent'
                                                    }`}
                                            >
                                                {size}
                                            </Button>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Quantity Selector */}
                            <div className="flex items-center gap-4">
                                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        disabled={quantity <= 1}
                                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                    >
                                        <Minus className="w-4 h-4" />
                                    </Button>
                                    <span className="px-4 py-2 text-sm font-medium">{quantity}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        disabled={quantity >= (selectedVariant?.stock || 0)}
                                        className="h-8 w-8"
                                        onClick={() => setQuantity(prev => Math.min(prev + 1, selectedVariant?.stock || 0))}
                                    >
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>

                                <label>Stock: {selectedVariant?.stock}</label>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-4">
                                <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold" onClick={handleAddToCart}>
                                    <ShoppingCart className="w-4 h-4 mr-2" />
                                    Add To Cart
                                </Button>
                                <Button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold" onClick={handleBuyNow}>
                                    Buy Now
                                </Button>
                                <Button variant="outline" size="icon" className="w-12 h-12 border-2 border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 rounded-xl transition-all">
                                    <Heart className="w-5 h-5 text-gray-600 hover:text-emerald-600" />
                                </Button>
                            </div>



                            {/* Tags */}
                            <div className="text-sm text-gray-600">
                                <span className="font-medium">Tags:</span> {product.tags.join(", ")}
                            </div>

                            {/* Share Icons */}
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-700">Share:</span>
                                <div className="flex gap-2">
                                    {['facebook', 'twitter', 'pinterest', 'email'].map((social) => (
                                        <Button
                                            key={social}
                                            variant="outline"
                                            size="icon"
                                            className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border-0 rounded-lg shadow-md hover:shadow-lg transition-all"
                                        >
                                            <Share2 className="w-4 h-4" />
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                    {/* Product Information Tabs */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl mb-8 border border-gray-100">
                        <div className="border-b border-gray-200">
                            <nav className="flex space-x-8 px-8">
                                {[
                                    { id: 'description', label: 'Description' },
                                    { id: 'additional', label: 'Additional Information' },
                                    { id: 'review', label: 'Review' }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`py-4 px-1 border-b-2 font-semibold text-sm transition-all ${activeTab === tab.id
                                            ? 'border-emerald-500 text-emerald-600'
                                            : 'border-transparent text-gray-500 hover:text-emerald-600 hover:border-emerald-300'
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>
                        </div>

                    <div className="p-8">
                        {activeTab === 'description' && (
                            <div className="space-y-4">
                                <p className="text-gray-600 leading-relaxed">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                                <ul className="space-y-2">
                                    {[
                                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                                        'Sed do eiusmod tempor incididunt ut labore et dolore magna',
                                        'Ut enim ad minim veniam, quis nostrud exercitation',
                                        'Duis aute irure dolor in reprehenderit in voluptate velit'
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mt-2 flex-shrink-0" />
                                            <span className="text-gray-600">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {activeTab === 'additional' && (
                            <div className="space-y-4">
                                <p className="text-gray-600">Additional information will be displayed here.</p>
                            </div>
                        )}

                        {activeTab === 'review' && product && (
                            <ProductReviewSection productId={product.id} />
                        )}
                    </div>
                </div>

                    {/* Related Products Section */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-700 text-white px-4 py-2 rounded-full font-bold text-sm mb-4 shadow-lg">
                                Related Products
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">
                                <span className="bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                                    Explore Related Products
                                </span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {mockRelatedProducts.map((relatedProduct) => (
                                <Card key={relatedProduct.id} className="group hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden border-0 bg-white">
                                    <CardHeader className="relative p-0">
                                        <div className="relative overflow-hidden">
                                            <img
                                                src={relatedProduct.image}
                                                alt={relatedProduct.name}
                                                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            <div className="absolute top-3 left-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                                                {relatedProduct.discount}% off
                                            </div>
                                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="flex gap-1">
                                                    <Button variant="outline" size="icon" className="w-8 h-8 bg-white/90 backdrop-blur-sm hover:bg-white rounded-lg shadow-lg">
                                                        <Heart className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="outline" size="icon" className="w-8 h-8 bg-white/90 backdrop-blur-sm hover:bg-white rounded-lg shadow-lg">
                                                        <Share2 className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="outline" size="icon" className="w-8 h-8 bg-white/90 backdrop-blur-sm hover:bg-white rounded-lg shadow-lg">
                                                        <ShoppingCart className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-5">
                                        <h3 className="font-bold text-slate-900 mb-2 text-lg group-hover:text-emerald-600 transition-colors">{relatedProduct.name}</h3>
                                        <div className="flex items-center gap-1 mb-3">
                                            {renderStars(relatedProduct.rating)}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl font-bold text-slate-900">
                                                ${(relatedProduct.price - (relatedProduct.price * relatedProduct.discount / 100)).toFixed(2)}
                                            </span>
                                            <span className="text-sm text-gray-400 line-through">
                                                ${relatedProduct.price.toFixed(2)}
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}