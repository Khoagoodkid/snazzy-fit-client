"use client"

import { X, Plus, Minus, Truck, CreditCard, Headphones, Trash, ShoppingBag, Package } from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"
import Page from "../app/Page"
import { useCartService } from "@/services/client/cart/useCartService";
import { toast } from "react-toastify";
import { CartItem as CartItemType } from "@/types/cart/cart.interface";
import BreadcrumbComponent from "../app/Breadcrumb";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/hooks";
import { showAlert } from "@/lib/features/alert/alertSlice";
import { useDebounce, } from "@/hooks/useDebounce";
import { Checkbox } from "@/components/ui/checkbox";
import { handleEncodeData } from "@/utils/handleEncodeData";
import { useRouter } from "next/navigation";
import { getProductUrl } from "@/utils/handleGetProductUrl";
import ProductImage from "@/components/ui/product-image";


export default function ShoppingCartPage() {
    const { getCart, removeCart, updateCart } = useCartService();
    const router = useRouter();
    const dispatch = useAppDispatch();


    const [items, setItems] = useState<CartItemType[]>([])
    const [selectedItems, setSelectedItems] = useState<CartItemType[]>([]);

    const totalItems = useMemo(() => {
        return selectedItems.reduce((sum, item) => sum + item.quantity, 0);
    }, [selectedItems]);
    const subtotal = useMemo(() => {
        return selectedItems.reduce((sum, item) => sum + ((item.variant?.product?.basePrice || 0) * (1 - (item.variant?.product?.discount || 0) / 100)) * item.quantity, 0);
    }, [selectedItems]);
    const tax = subtotal * 0.1;
    const shipping = 2;
    const total = subtotal + tax + shipping;

    const handleGetCart = useCallback(async () => {
        try {
            const response = await getCart();
            setItems(response.data);
        } catch (error) {
            toast.error((error as Error).message);
        }
    }, [getCart]);

    const handleRemoveCart = useCallback(async (id: string) => {
        console.log(id);
        dispatch(showAlert({
            title: "Remove Item",
            message: "Are you sure you want to remove this item from your cart?",
            type: "warning",
            onConfirm: async () => {
                try {
                    await removeCart(id);

                    setItems(items.filter((item) => item.id !== id));
                } catch (error) {
                    toast.error((error as Error).message);
                }
            }
        }))


    }, [removeCart, dispatch, setItems]);

    useEffect(() => {
        handleGetCart();
    }, [handleGetCart]);

    const handleUpdateCart = useCallback(async (item: CartItemType, quantity: number) => {
        try {
            const response = await updateCart(item.id, { quantity: quantity });
            setItems((prev) => prev.map((i) => i.id === item.id ? { ...i, quantity: response.data.quantity } : i));

            setSelectedItems((prev) => prev.map((i) => i.id === item.id ? { ...i, quantity: response.data.quantity } : i));
        } catch (error) {
            toast.error((error as Error).message);
        }
    }, [updateCart]);


    const handleSelectItem = useCallback((item: CartItemType) => {
        setSelectedItems((prev) => [...prev, item]);
    }, []);

    const handleRemoveSelectedItem = useCallback((item: CartItemType) => {
        setSelectedItems((prev) => prev.filter((i) => i.id !== item.id));
    }, []);

    const handleCheckout = useCallback(() => {
        const checkoutData = {
            items: selectedItems.map((item) => ({
                id: item.id,
                variant_id: item.variant_id,
                quantity: item.quantity,
                unit_price: ((item.variant?.product?.basePrice || 0) * (1 - (item.variant?.product?.discount || 0) / 100)) || 0,
                total_price: ((item.variant?.product?.basePrice || 0) * (1 - (item.variant?.product?.discount || 0) / 100)) * item.quantity || 0,
                product: item.variant?.product,
            })),
            shipping: shipping,
            totalItems: totalItems,
            subtotal: subtotal,
            tax: tax,
            total: total,
        }
        const encodedData = handleEncodeData(checkoutData)
        router.push(`/checkout?data=${encodedData}`)
    }, [selectedItems, totalItems, subtotal, tax, total]);

    return (
        <Page className="bg-gradient-to-br from-cyan-50/30 via-teal-50/20 to-emerald-50/30">
            <div className="relative">
                {/* Decorative Blobs */}
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-cyan-200/30 to-teal-200/30 rounded-full blur-3xl opacity-50 -z-10" />
                <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-teal-200/30 to-emerald-200/30 rounded-full blur-3xl opacity-50 -z-10" />
                <div className="absolute bottom-1/4 right-1/3 w-[450px] h-[450px] bg-gradient-to-br from-emerald-200/30 to-green-200/30 rounded-full blur-3xl opacity-50 -z-10" />

                {/* Page Title Section */}
                <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
                    <BreadcrumbComponent />
                    <div className="text-center mb-12 mt-10">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-700 text-white px-4 py-2 rounded-full font-bold text-sm mb-6 shadow-lg">
                            <ShoppingBag className="w-4 h-4" />
                            Shopping Cart
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
                            Your <span className="bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">Shopping Cart</span>
                        </h1>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-xl h-fit overflow-hidden">
                            {/* Table Header */}
                            <div className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white p-6 flex items-center gap-3">
                                <ShoppingBag className="w-6 h-6" />
                                <h2 className="text-xl font-bold">My Cart ({items.length})</h2>
                            </div>

                            {/* Cart Items */}
                            <div className="p-2">
                                {items.map((item, index) => (
                                    <CartItem
                                        key={item.id}
                                        item={item}
                                        index={index}
                                        items={items}
                                        onRemoveCart={handleRemoveCart}
                                        onSelectItem={handleSelectItem}
                                        isSelected={selectedItems.find((i) => i.id === item.id) ? true : false}
                                        onRemoveSelectedItem={handleRemoveSelectedItem}
                                        onUpdateCart={handleUpdateCart}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100 sticky top-6">
                                <h2 className="text-2xl font-bold text-slate-900 mb-6">Order Summary</h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-700">
                                        <span className="font-medium">Items:</span>
                                        <span className="font-semibold text-slate-900">{totalItems}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-700">
                                        <span className="font-medium">Sub Total:</span>
                                        <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-700">
                                        <span className="font-medium">Shipping:</span>
                                        <span className="font-semibold text-slate-900">${shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-700">
                                        <span className="font-medium">Taxes:</span>
                                        <span className="font-semibold text-slate-900">${tax.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="border-t-2 border-gray-200 pt-6 mb-8">
                                    <div className="flex justify-between text-xl font-bold text-slate-900">
                                        <span>Total:</span>
                                        <span className="bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <Button
                                    onClick={() => {
                                        handleCheckout()
                                    }}
                                    disabled={selectedItems.length === 0}
                                    className="w-full bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 hover:from-cyan-700 hover:via-teal-700 hover:to-emerald-700 text-white h-14 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                                    Proceed to Checkout
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="group text-center bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 hover:shadow-xl transition-all">
                            <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                                <Truck className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Free Shipping</h3>
                            <p className="text-gray-600">Free shipping for order above $180</p>
                        </div>
                        <div className="group text-center bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 hover:shadow-xl transition-all">
                            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                                <CreditCard className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Flexible Payment</h3>
                            <p className="text-gray-600">Multiple secure payment options</p>
                        </div>
                        <div className="group text-center bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 hover:shadow-xl transition-all">
                            <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                                <Headphones className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">24x7 Support</h3>
                            <p className="text-gray-600">We support online all days.</p>
                        </div>
                    </div>
                </div>
            </div>

        </Page>
    )
}

interface CartItemProps {
    item: CartItemType;
    index: number;
    items: CartItemType[];
    onRemoveCart: (id: string) => void;
    onSelectItem: (item: CartItemType) => void;
    isSelected: boolean;
    onRemoveSelectedItem: (item: CartItemType) => void;
    onUpdateCart: (item: CartItemType, quantity: number) => void;
}

const CartItem = ({ item, index, items, onRemoveCart, onSelectItem, isSelected, onRemoveSelectedItem, onUpdateCart }: CartItemProps) => {
    const [quantity, setQuantity] = useState(item.quantity);
    const debouncedQuantity = useDebounce(quantity, 500);
    const router = useRouter();
    useEffect(() => {
        setQuantity(item.quantity);
    }, [item.quantity]);

    useEffect(() => {
        if(!debouncedQuantity) return;
        onUpdateCart(item, debouncedQuantity);
    }, [debouncedQuantity]);


    const handleRedirectToProduct = useCallback(() => {
        console.log("1", item);
        router.push(getProductUrl(item.variant?.product || null));
    }, [item.variant?.product]);

    return (
        <div key={item.id} className={`relative flex flex-row gap-4 p-5 items-center justify-between hover:bg-gradient-to-r hover:from-cyan-50/30 hover:to-teal-50/30 transition-all rounded-xl ${index !== items.length - 1 ? 'border-b border-gray-100' : ''}`}>
            <div className="flex flex-row gap-4 items-center flex-1">
                <div className="">
                    <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => { isSelected ? onRemoveSelectedItem(item) : onSelectItem(item) }}
                        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-600 data-[state=checked]:to-teal-600 data-[state=checked]:border-cyan-600 w-5 h-5"
                    />
                </div>
                <div className="flex gap-4 flex-1">
                    <div className="w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                        <ProductImage
                            src={item.variant?.product?.mainImage || ""}
                            alt={item.variant?.product?.name || ""}
                            width={112}
                            height={112}
                            className="w-full h-full object-cover"
                            fallbackClassName="w-full h-full bg-gradient-to-br from-cyan-100 to-teal-100"
                        />
                    </div>
                    <div className="flex flex-col justify-between flex-1">
                        <div className="space-y-2">
                            <h3 className="font-bold text-slate-900 text-lg cursor-pointer hover:text-teal-600 transition-colors"
                                onClick={() => { handleRedirectToProduct() }}
                            >{item.variant?.product?.name}</h3>
                            <p className="text-gray-600 text-sm font-medium">{item.variant?.product?.brand}</p>
                            <div className="flex items-center gap-3 text-sm">
                                <span className="text-gray-600">Color: <span className="font-semibold text-slate-900">{item.variant?.color}</span></span>
                                <span className="text-gray-300">|</span>
                                <span className="text-gray-600">Size: <span className="font-semibold text-slate-900">{item.variant?.size}</span></span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="line-through text-gray-400 text-sm">${item.variant?.price.toFixed(2)}</span>
                            <span className="text-slate-900 text-2xl font-bold">${((item.variant?.price || 0) * (1 - (item.variant?.product?.discount || 0) / 100)).toFixed(2)}</span>
                            <span className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white px-2 py-1 rounded-full text-xs font-bold">{item.variant?.product?.discount}% OFF</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-full flex items-end flex-col gap-4">
                <div className="flex items-center rounded-xl border-2 border-gray-200 overflow-hidden">
                    <Button
                        onClick={() => { setQuantity((prev) => prev - 1) }}
                        className="w-10 h-10 hover:bg-teal-50 rounded-none border-0 bg-transparent text-slate-700 hover:text-teal-600"
                    >
                        <Minus size={16} />
                    </Button>
                    <span className="w-12 h-10 flex items-center justify-center border-x-2 border-gray-200 text-slate-900 font-bold">{quantity}</span>
                    <Button
                        onClick={() => { setQuantity((prev) => prev + 1) }}
                        className="w-10 h-10 hover:bg-teal-50 rounded-none border-0 bg-transparent text-slate-700 hover:text-teal-600"
                    >
                        <Plus size={16} />
                    </Button>
                </div>
                <a
                    onClick={() => { onRemoveCart(item.id) }}
                    className="text-gray-500 hover:text-red-500 cursor-pointer flex items-center gap-2 font-medium transition-colors"
                >
                    <Trash size={16} /> Remove
                </a>
            </div>
        </div>
    )
}
