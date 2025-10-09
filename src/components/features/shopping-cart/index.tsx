"use client"

import { X, Plus, Minus, Truck, CreditCard, Headphones, Trash } from "lucide-react"
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


export default function ShoppingCartPage() {
    const [items, setItems] = useState<CartItemType[]>([])
    const [selectedItems, setSelectedItems] = useState<CartItemType[]>([]);

    const { getCart, removeCart, updateCart } = useCartService();
    const dispatch = useAppDispatch();

    const totalItems = useMemo(() => {
        return selectedItems.reduce((sum, item) => sum + item.quantity, 0);
    }, [selectedItems]);
    const subtotal = useMemo(() => {
        return selectedItems.reduce((sum, item) => sum + ((item.variant?.product?.basePrice || 0) * (1 - (item.variant?.product?.discount || 0) / 100)) * item.quantity, 0);
    }, [selectedItems]);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

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
            setItems((prev) => prev.map((item) => item.id === item.id ? { ...item, quantity: response.data.quantity } : item));

            setSelectedItems((prev) => prev.map((i) => i.id === item.id ? { ...i, quantity: response.data.quantity } : i));
        } catch (error) {
            toast.error((error as Error).message);
        }
    }, [updateCart]);
    

    const handleSelectItem = useCallback((item: CartItemType) => {
        setSelectedItems((prev) => [...prev, item]);
    }, []);

    const handleRemoveSelectedItem = useCallback((item: CartItemType) => {
        setSelectedItems((prev) => prev.filter((item) => item.id !== item.id));
    }, []);

    return (
        <Page>
            {/* Page Title Section */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <BreadcrumbComponent />
                <div className="text-left mb-12 mt-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Shopping Cart</h1>

                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 border border-gray-300 rounded-lg px-4 h-fit">
                        {/* Table Header */}
                        <div className=" text-black p-4 rounded-t-lg border-b border-gray-300">
                            <h2 className="text-lg font-bold">My Cart ({items.length})</h2>
                        </div>

                        {/* Cart Items */}
                        <div className=" ">
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
                        <div className="bg-gray-100 p-6 rounded-lg">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-700">
                                    <span>Items:</span>
                                    <span>{totalItems}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Sub Total:</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Shipping:</span>
                                    <span>$00.00</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Taxes:</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                              
                            </div>

                            <div className="border-t border-gray-300 pt-4 mb-6">
                                <div className="flex justify-between text-lg font-bold text-gray-800">
                                    <span>Total:</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <button className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Truck className="w-8 h-8 text-green-900" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Free Shipping</h3>
                        <p className="text-gray-600">Free shipping for order above $180</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CreditCard className="w-8 h-8 text-green-900" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Flexible Payment</h3>
                        <p className="text-gray-600">Multiple secure payment options</p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Headphones className="w-8 h-8 text-green-900" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">24x7 Support</h3>
                        <p className="text-gray-600">We support online all days.</p>
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

    useEffect(() => {
        
        onUpdateCart(item, debouncedQuantity);
    }, [debouncedQuantity]);

    return (
        <div key={item.id} className={`relative flex flex-row gap-4 p-4 items-center justify-between ${index !== items.length - 1 ? 'border-b border-gray-200' : ''}`}>
            <div className="flex flex-row gap-3 items-center">
                <div className="">
                    <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => { isSelected ? onRemoveSelectedItem(item) : onSelectItem(item) }}
                    />
                </div>
                <div className="flex  gap-3">
                    <div className="w-35 h-35 bg-gray-200 rounded-lg flex items-center justify-center">
                        <div className="w-35 h-35 bg-gray-300 rounded"></div>
                    </div>
                    <div className="flex flex-col justify-between flex-1">
                        <div className="space-y-2">
                            <h3 className="font-semibold text-gray-800">{item.variant?.product?.name}</h3>
                            <p className="text-gray-500 text-sm">{item.variant?.product?.brand}</p>
                            <p className="text-gray-500 text-sm">Color : <span className="font-medium text-black">{item.variant?.color}</span> | Size : <span className="font-medium text-black">{item.variant?.size}</span></p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="line-through text-gray-500 text-sm">${item.variant?.product?.basePrice.toFixed(2)}</span>
                            <span className="text-black text-xl font-bold">${((item.variant?.product?.basePrice || 0) * (1 - (item.variant?.product?.discount || 0) / 100)).toFixed(2)}</span>
                            <span className="text-red-500 text-md font-bold">{item.variant?.product?.discount}% OFF</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-full flex items-end flex-col ">
                <div className="flex items-center  rounded w-fit">
                    <Button
                        onClick={() => { setQuantity((prev) => prev - 1) }}
                        className="w-9 h-9 hover:opacity-80 rounded-none"
                    >
                        <Minus size={14} />
                    </Button>
                    <span className="w-9 h-9 flex items-center justify-center border-y border-gray-300 text-black">{quantity}</span>
                    <Button
                        onClick={() => { setQuantity((prev) => prev + 1) }}
                        className="w-9 h-9 hover:opacity-80 rounded-none"
                    >
                        <Plus size={14} />
                    </Button>
                </div>
                <a
                    onClick={() => { onRemoveCart(item.id) }}
                    className="text-gray-500 hover:text-red-500 cursor-pointer  flex items-center gap-2 "
                >
                    <Trash size={16} /> Remove
                </a>
            </div>
        </div>
    )
}
