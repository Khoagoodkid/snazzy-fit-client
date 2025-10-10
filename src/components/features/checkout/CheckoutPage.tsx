"use client"

import Page from "../app/Page"
import Breadcrumb from "../app/Breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Smartphone, Building2, Lock, Wallet, Globe } from "lucide-react"
import React from "react";
import { BASE_URL } from "@/config/config";
import { privateAxios } from "@/middleware/axiosInstance";
import { useStripeService } from "@/services/client/payment/useStripeService";
import { useState } from "react";

export default function CheckoutPage() {
    const { createCheckoutSession } = useStripeService();
    const data = {
        orderId: "667d56b2875155f16e8e74c8",
        amount: 100,
        currency: "USD",
    };

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("credit-card");
    const paymentMethods = [
        {
            id: "credit-card",
            name: "Credit/Debit Card",
            description: "Pay securely with Visa, Mastercard, or American Express",
            icon: CreditCard,
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
            logos: [
                { text: "V", bg: "bg-blue-600" },
                { text: "MC", bg: "bg-red-600" },
                { text: "AE", bg: "bg-green-600" }
            ],
            isDefault: true
        },
        {
            id: "sepay",
            name: "SEPAY",
            description: "Single Euro Payments Area - Direct bank transfer for EU customers",
            icon: Building2,
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
            logos: [
                { text: "SEPA", bg: "bg-blue-600" }
            ],
            isDefault: false
        },
        {
            id: "google-pay",
            name: "Google Pay",
            description: "Pay quickly and securely with your Google account",
            icon: Wallet,
            iconBg: "bg-gray-100",
            iconColor: "text-gray-600",
            logos: [
                { text: "G", bg: "bg-blue-600" },
                { text: "Pay", bg: "bg-green-600" }
            ],
            isDefault: false
        }
    ];

    const handleCheckout = async () => {

        if (selectedPaymentMethod === "credit-card") {
            try {
                const response = await createCheckoutSession(data);
                window.location.href = response.url;
            } catch (error) {
                console.log(error);
            }
        } 
    };

    return (
        <Page>
            <div className="max-w-7xl mx-auto px-6 py-16">
                <Breadcrumb />
                
                <div className="mt-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Method</h1>
                    <p className="text-gray-600 mb-8">Choose your preferred payment method to complete your order</p>
                    
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Payment Methods */}
                        <div className="lg:col-span-2">
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
                                    
                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Subtotal</span>
                                            <span className="text-gray-900">$90.00</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Shipping</span>
                                            <span className="text-gray-900">$10.00</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Tax</span>
                                            <span className="text-gray-900">$0.00</span>
                                        </div>
                                        <hr className="border-gray-200" />
                                        <div className="flex justify-between text-lg font-semibold">
                                            <span className="text-gray-800">Total</span>
                                            <span className="text-green-600">$100.00</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-6">
                                        <Lock className="w-4 h-4" />
                                        <span>Your payment information is secure and encrypted</span>
                                    </div>

                                    <Button 
                                        onClick={handleCheckout}
                                        className="w-full bg-green-800 hover:bg-green-700 text-white py-3 rounded-lg font-medium"
                                    >
                                        <CreditCard className="w-4 h-4 mr-2" />
                                        Proceed to Payment
                                    </Button>

                                    <p className="text-xs text-gray-500 text-center mt-4">
                                        By clicking "Proceed to Payment", you agree to our Terms of Service and Privacy Policy
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