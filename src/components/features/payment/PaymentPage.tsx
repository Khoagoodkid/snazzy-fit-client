"use client"

import Page from "../app/Page"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Download, ArrowLeft, Package, CreditCard, Calendar, Hash } from "lucide-react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { useOrderService } from "@/services/client/order/useOrderService"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Order } from "@/types/order/order.interface"
import { toast } from "react-toastify"

export default function PaymentPage() {
    const searchParams = useSearchParams()
    const status = searchParams.get("status") // "success" or "canceled"
    const orderId = searchParams.get("orderId") || "3846a59d-3e56-4ba7-96fa-53f62fa96228"
    const [orderDetails, setOrderDetails] = useState<Order | null>(null);

    if (!orderId) {
        return null;
    }

    const { getOrderDetails } = useOrderService();
    const handleGetOrderDetails = useCallback(async () => {
        try {
            const response = await getOrderDetails(orderId);
            setOrderDetails(response.data);
        } catch (error) {
            toast.error((error as Error).message);
        }
    }, [getOrderDetails, orderId]);

    useEffect(() => {
        handleGetOrderDetails();
    }, [handleGetOrderDetails]);

    // Mock order data
    const orderData = {
        orderId: orderId,
        paymentMethod: "Credit Card",
        transactionId: "TR5425SFE",
        estimatedDelivery: "24 April 2024",
        items: [
            {
                id: "1",
                name: "Classic Cotton T-Shirt - Navy Blue",
                color: "Navy Blue",
                price: 29.99,
                quantity: 2,
                image: "/products/tshirt-navy.jpg"
            },
            {
                id: "2",
                name: "Slim Fit Denim Jeans - Dark Wash",
                color: "Dark Wash",
                price: 79.99,
                quantity: 1,
                image: "/products/jeans-dark.jpg"
            },
            {
                id: "3",
                name: "Casual Sneakers - White/Black",
                color: "White/Black",
                price: 89.99,
                quantity: 1,
                image: "/products/sneakers-white.jpg"
            }
        ],
        subtotal: 229.96,
        shipping: 10.00,
        tax: 18.40,
        couponDiscount: 50.00,
        total: 208.36
    }

    const isSuccess = useMemo(() => {
        console.log(status);
        return status === "success";
    }, [status, searchParams]);

    return (
        <Page>
            <div className="max-w-4xl mx-auto px-6 py-16">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${isSuccess ? 'bg-green-100' : 'bg-red-100'}`}>
                        {isSuccess ? (
                            <CheckCircle className="w-12 h-12 text-green-600" />
                        ) : (
                            <XCircle className="w-12 h-12 text-red-600" />
                        )}
                    </div>

                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        {isSuccess ? "Your order is completed!" : "Order Canceled"}
                    </h1>
                    <p className="text-gray-600">
                        {isSuccess ? "Thank you. Your Order has been received." : "Your order has been canceled and no payment was processed."}
                    </p>
                </div>

                {isSuccess && (
                    <>
                        {/* Order Summary Banner */}
                        <Card className="bg-[var(--yellow-primary)] border-yellow-200 mb-8">
                            <CardContent className="p-6">
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 flex-1">
                                        <div className="flex items-center space-x-2">
                                            <Hash className="w-5 h-5 text-gray-600" />
                                            <div>
                                                <p className="text-sm text-gray-600">Order ID</p>
                                                <p className="font-semibold text-gray-900">{orderDetails?.id}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <CreditCard className="w-5 h-5 text-gray-600" />
                                            <div>
                                                <p className="text-sm text-gray-600">Payment Method</p>
                                                <p className="font-semibold text-gray-900">{orderDetails?.payment_method}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Hash className="w-5 h-5 text-gray-600" />
                                            <div>
                                                <p className="text-sm text-gray-600">Transaction ID</p>
                                                <p className="font-semibold text-gray-900">{"TR5425SFE"}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="w-5 h-5 text-gray-600" />
                                            <div>
                                                <p className="text-sm text-gray-600">Estimated Delivery</p>
                                                <p className="font-semibold text-gray-900">{"24 April 2024"}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                                        <Download className="w-4 h-4 mr-2" />
                                        Download Invoice
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Order Details */}
                        <Card className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-800 px-6">Order Details</h2>
                            <CardContent className="px-6">
                            <Separator />
                            <h2 className="text-dm font-semibold text-gray-800  mt-6 ">Products</h2>
                                {/* Products List */}
                                <div className="space-y-4 mb-6">
                                    {orderDetails?.items.map((item) => (
                                        <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                                <Package className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-medium text-gray-900">{item.variant?.product?.name}</h3>
                                                <p className="text-sm text-gray-500">Color: {item.variant?.color}</p>
                                                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-gray-900">${(item.variant?.price * item.quantity).toFixed(2)}</p>
                                                <p className="text-sm text-gray-500">${item.variant?.price.toFixed(2)} each</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Cost Breakdown */}
                                <div className="border-t border-gray-200 pt-6">
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Sub Total</span>
                                            <span className="text-gray-900">${orderDetails?.sub_total?.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Shipping</span>
                                            <span className="text-gray-900">${orderDetails?.shipping_amount?.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Taxes</span>
                                            <span className="text-gray-900">${orderDetails?.tax_amount?.toFixed(2)}</span>
                                        </div>

                                        <hr className="border-gray-200" />
                                        <div className="flex justify-between text-lg font-semibold">
                                            <span className="text-gray-800">Total</span>
                                            <span className="text-green-600">${orderDetails?.total_amount?.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </>
                )}

                {!isSuccess && (
                    <Card className="mb-8">
                        <CardContent className="p-6 text-center">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">What happened?</h2>
                            <p className="text-gray-600 mb-6">
                                Your order was canceled. This could be due to payment issues,
                                insufficient stock, or if you chose to cancel during checkout.
                            </p>
                            <div className="space-y-3">
                                <p className="text-sm text-gray-500">Order ID: #{orderData.orderId}</p>
                                <p className="text-sm text-gray-500">No payment was processed</p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/shop">
                        <Button variant="outline" className="w-full sm:w-auto">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Continue Shopping
                        </Button>
                    </Link>
                    {isSuccess && (
                        <Link href="/collections">
                            <Button className="w-full sm:w-auto bg-green-800 hover:bg-green-700">
                                View Order Status
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </Page>
    )
}