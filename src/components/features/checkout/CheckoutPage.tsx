"use client"

import Page from "../app/Page"
import Breadcrumb from "../app/Breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { CreditCard, Lock, Globe, User, Mail, Phone, MapPin, Home } from "lucide-react"
import React from "react";
import { useOrderService } from "@/services/client/order/useOrderService";
import { useState } from "react";
import { CreateOrderRequest } from "@/types/order/order.interface";
import { paymentMethods } from "@/constants/payment";
import { useSearchParams } from "next/navigation";
import { handleDecodeData } from "@/utils/handleEncodeData";
import { CartItem } from "@/types/cart/cart.interface";

export default function CheckoutPage() {
    const { createOrder } = useOrderService();
    const searchParams = useSearchParams();
    const data = searchParams.get("data");
    if (!data) {
        return null;
    }

    const checkoutData = handleDecodeData(data);
    console.log(checkoutData);


    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("credit-card");
    const [customerInfo, setCustomerInfo] = useState({
        customer_name: "",
        customer_email: "",
        customer_phone: "",
        customer_address: "",
        customer_state: "",
        customer_city: "",
        customer_zip: "",
        customer_country: "",
    });

    const subtotal = checkoutData.subtotal;
    const shipping = checkoutData.shipping;
    const tax = checkoutData.tax;
    const total = checkoutData.total;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomerInfo(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // Function to fill test data for development/testing
    const fillTestData = () => {
        setCustomerInfo({
            customer_name: "John Michael Doe",
            customer_email: "john.doe@example.com",
            customer_phone: "+1 (555) 123-4567",
            customer_address: "123 Fashion Street, Apartment 4B",
            customer_state: "NY",
            customer_city: "New York",
            customer_zip: "10001",
            customer_country: "United States",
        });
    };


    const handleCheckout = async () => {
        // Validate customer information
        if (!customerInfo.customer_name || !customerInfo.customer_email || !customerInfo.customer_phone ||
            !customerInfo.customer_address || !customerInfo.customer_city || !customerInfo.customer_state ||
            !customerInfo.customer_zip || !customerInfo.customer_country) {
            alert("Please fill in all customer information fields");
            return;
        }

        // Prepare order data
        const orderData: CreateOrderRequest = {
            items: checkoutData.items.map((item: {
                id?: string;
                variant_id: string;
                quantity: number;
                unit_price: number;
                total_price: number;
            }) => ({
                cart_id: item.id || null,
                variant_id: item.variant_id,
                quantity: item.quantity,
                unit_price: item.unit_price,
                total_price: item.total_price,
            })),
            total_amount: checkoutData.total,
            tax_amount: checkoutData.tax,
            shipping_amount: shipping,
            sub_total: checkoutData.subtotal,
            customer_name: customerInfo.customer_name,
            customer_email: customerInfo.customer_email,
            customer_phone: customerInfo.customer_phone,
            customer_address: customerInfo.customer_address,
            customer_state: customerInfo.customer_state,
            customer_city: customerInfo.customer_city,
            customer_zip: customerInfo.customer_zip,
            customer_country: customerInfo.customer_country,
            payment_method: selectedPaymentMethod,
        };

        console.log("Order Data:", orderData);

        if (selectedPaymentMethod === "credit-card") {
            try {

                const response = await createOrder(orderData);
                window.location.href = response.url;
            } catch (error) {
                console.log("Checkout error:", error);
                alert("Failed to process payment. Please try again.");
            }
        } else {
            alert(`Payment method ${selectedPaymentMethod} is not yet implemented`);
        }
    };

    return (
        <Page>
            <div className="max-w-7xl mx-auto px-6 py-16">
                <Breadcrumb />

                <div className="mt-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Checkout</h1>
                    <p className="text-gray-600 mb-8">Complete your order by filling in your information</p>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Customer Information & Payment Methods */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Customer Information */}
                            <Card className="rounded-xl shadow-sm">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-semibold text-gray-800">Customer Information</h2>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={fillTestData}
                                            className="text-xs"
                                        >
                                            Fill Test Data
                                        </Button>
                                    </div>

                                    <div className="space-y-4">
                                        {/* Full Name */}
                                        <div>
                                            <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700 mb-2">
                                                <User className="w-4 h-4 inline mr-2" />
                                                Full Name
                                            </label>
                                            <Input
                                                id="customer_name"
                                                name="customer_name"
                                                type="text"
                                                placeholder="John Doe"
                                                value={customerInfo.customer_name}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300"
                                                required
                                            />
                                        </div>

                                        {/* Email & Phone */}
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="customer_email" className="block text-sm font-medium text-gray-700 mb-2">
                                                    <Mail className="w-4 h-4 inline mr-2" />
                                                    Email Address
                                                </label>
                                                <Input
                                                    id="customer_email"
                                                    name="customer_email"
                                                    type="email"
                                                    placeholder="john@example.com"
                                                    value={customerInfo.customer_email}
                                                    onChange={handleInputChange}
                                                    className="w-full border border-gray-300"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="customer_phone" className="block text-sm font-medium text-gray-700 mb-2">
                                                    <Phone className="w-4 h-4 inline mr-2" />
                                                    Phone Number
                                                </label>
                                                <Input
                                                    id="customer_phone"
                                                    name="customer_phone"
                                                    type="text"
                                                    placeholder="+1 234 567 8900"
                                                    value={customerInfo.customer_phone}
                                                    onChange={handleInputChange}
                                                    className="w-full border border-gray-300"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Address */}
                                        <div>
                                            <label htmlFor="customer_address" className="block text-sm font-medium text-gray-700 mb-2">
                                                <Home className="w-4 h-4 inline mr-2" />
                                                Street Address
                                            </label>
                                            <Input
                                                id="customer_address"
                                                name="customer_address"
                                                type="text"
                                                placeholder="123 Main Street, Apt 4B"
                                                value={customerInfo.customer_address}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300"
                                                required
                                            />
                                        </div>

                                        {/* City, State/Province, ZIP */}
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div>
                                                <label htmlFor="customer_city" className="block text-sm font-medium text-gray-700 mb-2">
                                                    <MapPin className="w-4 h-4 inline mr-2" />
                                                    City
                                                </label>
                                                <Input
                                                    id="customer_city"
                                                    name="customer_city"
                                                    type="text"
                                                    placeholder="New York"
                                                    value={customerInfo.customer_city}
                                                    onChange={handleInputChange}
                                                    className="w-full border border-gray-300"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="customer_state" className="block text-sm font-medium text-gray-700 mb-2">
                                                    State/Province
                                                </label>
                                                <Input
                                                    id="customer_state"
                                                    name="customer_state"
                                                    type="text"
                                                    placeholder="NY"
                                                    value={customerInfo.customer_state}
                                                    onChange={handleInputChange}
                                                    className="w-full border border-gray-300"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="customer_zip" className="block text-sm font-medium text-gray-700 mb-2">
                                                    ZIP Code
                                                </label>
                                                <Input
                                                    id="customer_zip"
                                                    name="customer_zip"
                                                    type="text"
                                                    placeholder="10001"
                                                    value={customerInfo.customer_zip}
                                                    onChange={handleInputChange}
                                                    className="w-full border border-gray-300"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Country */}
                                        <div>
                                            <label htmlFor="customer_country" className="block text-sm font-medium text-gray-700 mb-2">
                                                <Globe className="w-4 h-4 inline mr-2" />
                                                Country
                                            </label>
                                            <Input
                                                id="customer_country"
                                                name="customer_country"
                                                type="text"
                                                placeholder="United States"
                                                value={customerInfo.customer_country}
                                                onChange={handleInputChange}
                                                className="w-full border border-gray-300"
                                                required
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Payment Methods */}
                            <Card className="rounded-xl shadow-sm">
                                <CardContent className="p-6">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Select Payment Method</h2>

                                    <RadioGroup defaultValue={selectedPaymentMethod} onValueChange={(value) => setSelectedPaymentMethod(value)} className="space-y-4">
                                        {paymentMethods.map((method) => {
                                            const IconComponent = method.icon;
                                            const isActive = method.id === selectedPaymentMethod;
                                            return (
                                                <div key={method.id} className={`relative ${isActive ? 'border-green-500' : 'border-gray-200'}`}>
                                                    <RadioGroupItem
                                                        value={method.id}
                                                        id={method.id}
                                                        className="sr-only"
                                                        checked={isActive}
                                                    />
                                                    <label
                                                        htmlFor={method.id}
                                                        className={`flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${isActive ? 'border-green-500' : 'border-gray-200'}`}
                                                    >
                                                        <div className="flex items-center space-x-4 flex-1">
                                                            <div className={`w-12 h-12 ${method.iconBg} rounded-lg flex items-center justify-center`}>
                                                                <IconComponent className={`w-6 h-6 ${method.iconColor}`} />
                                                            </div>
                                                            <div className="flex-1">
                                                                <h3 className="font-medium text-gray-900">{method.name}</h3>
                                                                <p className="text-sm text-gray-500">{method.description}</p>
                                                            </div>
                                                            <div className="flex space-x-2">
                                                                {method.logos.map((logo, index) => (
                                                                    <div
                                                                        key={index}
                                                                        className={`w-8 h-5 ${logo.bg} rounded text-white text-xs flex items-center justify-center font-bold`}
                                                                    >
                                                                        {logo.text}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </label>
                                                </div>
                                            );
                                        })}
                                    </RadioGroup>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <Card className="rounded-xl shadow-sm sticky top-8">
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>

                                    {/* Order Items */}
                                    <div className="space-y-4 mb-6 border-b border-gray-200 pb-6">
                                        {checkoutData.items.map((item: {
                                            variant_id: string;
                                            quantity: number;
                                            unit_price: number;
                                            total_price: number;
                                            product: {
                                                name: string;
                                            }
                                        }) => (
                                            <div key={item.variant_id} className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-900">{item?.product?.name}</p>
                                                    <p className="text-xs text-gray-500">Qty: {item.quantity} × ${item.unit_price.toFixed(2)}</p>
                                                </div>
                                                <p className="text-sm font-medium text-gray-900">${item.total_price.toFixed(2)}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Price Breakdown */}
                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Subtotal</span>
                                            <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Shipping</span>
                                            <span className="text-gray-900">${shipping?.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Tax</span>
                                            <span className="text-gray-900">${tax.toFixed(2)}</span>
                                        </div>
                                        <hr className="border-gray-200" />
                                        <div className="flex justify-between text-lg font-semibold">
                                            <span className="text-gray-800">Total</span>
                                            <span className="text-green-600">${total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-6">
                                        <Lock className="w-4 h-4" />
                                        <span className="text-xs text-center">Secure & encrypted payment</span>
                                    </div>

                                    <Button
                                        onClick={handleCheckout}
                                        className="w-full bg-green-800 hover:bg-green-700 text-white py-3 rounded-lg font-medium"
                                    >
                                        <CreditCard className="w-4 h-4 mr-2" />
                                        Complete Order
                                    </Button>

                                    <p className="text-xs text-gray-500 text-center mt-4">
                                        By completing your order, you agree to our Terms of Service and Privacy Policy
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
};