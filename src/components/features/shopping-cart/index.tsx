"use client"

import { X, Plus, Minus, Truck, CreditCard, Headphones } from "lucide-react"
import { useState } from "react"
import Page from "../app/Page"

interface CartItem {
    id: string
    name: string
    color: string
    price: number
    quantity: number
    image: string
}

const cartItems: CartItem[] = [
    {
        id: "1",
        name: "Wooden Sofa Chair",
        color: "Grey",
        price: 80.00,
        quantity: 4,
        image: "/api/placeholder/80/80"
    },
    {
        id: "2", 
        name: "Red Gaming Chair",
        color: "Black",
        price: 90.00,
        quantity: 2,
        image: "/api/placeholder/80/80"
    },
    {
        id: "3",
        name: "Swivel Chair", 
        color: "Brown",
        price: 60.00,
        quantity: 1,
        image: "/api/placeholder/80/80"
    },
    {
        id: "4",
        name: "Circular Sofa Chair",
        color: "Brown", 
        price: 90.00,
        quantity: 2,
        image: "/api/placeholder/80/80"
    }
]

export default function ShoppingCartPage() {
    const [items, setItems] = useState<CartItem[]>(cartItems)
    const [couponCode, setCouponCode] = useState("")

    const updateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity < 1) return
        setItems(items.map(item => 
            item.id === id ? { ...item, quantity: newQuantity } : item
        ))
    }

    const removeItem = (id: string) => {
        setItems(items.filter(item => item.id !== id))
    }

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const couponDiscount = 100.00
    const total = subtotal - couponDiscount

    return (
        <Page>
            {/* Page Title Section */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Shopping Cart</h1>
                    <div className="text-gray-500 text-lg">
                        <span>Home</span>
                        <span className="mx-2">/</span>
                        <span>Shopping Cart</span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        {/* Table Header */}
                        <div className="bg-orange-400 text-white p-4 rounded-t-lg">
                            <div className="grid grid-cols-12 gap-4 text-sm font-medium">
                                <div className="col-span-4">Product</div>
                                <div className="col-span-2">Price</div>
                                <div className="col-span-3">Quantity</div>
                                <div className="col-span-2">Subtotal</div>
                                <div className="col-span-1"></div>
                            </div>
                        </div>

                        {/* Cart Items */}
                        <div className="border border-gray-200 border-t-0">
                            {items.map((item, index) => (
                                <div key={item.id} className={`grid grid-cols-12 gap-4 p-4 items-center ${index !== items.length - 1 ? 'border-b border-gray-200' : ''}`}>
                                    <div className="col-span-1">
                                        <button 
                                            onClick={() => removeItem(item.id)}
                                            className="text-gray-600 hover:text-red-500"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                    <div className="col-span-3 flex items-center gap-3">
                                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                            <div className="w-12 h-12 bg-gray-300 rounded"></div>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                            <p className="text-gray-500 text-sm">Color : {item.color}</p>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <span className="text-gray-800 font-medium">${item.price.toFixed(2)}</span>
                                    </div>
                                    <div className="col-span-3">
                                        <div className="flex items-center border border-gray-300 rounded w-fit">
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-2 hover:bg-gray-100"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="px-4 py-2 border-x border-gray-300">{item.quantity}</span>
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-2 hover:bg-gray-100"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <span className="text-gray-800 font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                    <div className="col-span-1"></div>
                                </div>
                            ))}
                        </div>

                        {/* Coupon Section */}
                        <div className="mt-6 flex items-center gap-4">
                            <input
                                type="text"
                                placeholder="Coupon Code"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                                Apply Coupon
                            </button>
                            <button className="text-gray-600 hover:text-gray-800">
                                Clear Shopping Cart
                            </button>
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
                                    <span>$00.00</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Coupon Discount:</span>
                                    <span className="text-red-600">-${couponDiscount.toFixed(2)}</span>
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