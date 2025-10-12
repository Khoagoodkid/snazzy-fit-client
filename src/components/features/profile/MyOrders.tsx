"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Package, Truck, Eye, X, Star } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { useOrderService } from "@/services/client/order/useOrderService"
import { Order } from "@/types/order/order.interface"
import { toast } from "react-toastify"
import { RefreshCw } from "lucide-react"
import { formatDateAndTime } from "@/utils/handleConvertTimestamp"

export default function MyOrders() {
    const { getOrders } = useOrderService()
    const [orders, setOrders] = useState<Order[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [sortBy, setSortBy] = useState("all")

    const handleGetOrders = useCallback(async () => {
        try {
            setIsLoading(true)
            const response = await getOrders()
            setOrders(response.data)
        } catch (error) {
            toast.error((error as Error).message)
            console.error("Failed to fetch orders:", error)
        } finally {
            setIsLoading(false)
        }
    }, [getOrders])

    useEffect(() => {
        handleGetOrders()
    }, [handleGetOrders])


    // Helper function to get status color and text
    const getStatusInfo = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return {
                    color: 'bg-yellow-100 text-yellow-800',
                    text: 'Your order is being processed'
                }
            case 'accepted':
            case 'confirmed':
                return {
                    color: 'bg-orange-100 text-orange-800',
                    text: 'Your order has been accepted'
                }
            case 'shipped':
                return {
                    color: 'bg-blue-100 text-blue-800',
                    text: 'Your order has been shipped'
                }
            case 'delivered':
                return {
                    color: 'bg-green-100 text-green-800',
                    text: 'Your order has been delivered'
                }
            case 'cancelled':
            case 'canceled':
                return {
                    color: 'bg-red-100 text-red-800',
                    text: 'Your order has been cancelled'
                }
            default:
                return {
                    color: 'bg-gray-100 text-gray-800',
                    text: `Order status: ${status}`
                }
        }
    }

  

    // Helper function to get actions based on status
    const getOrderActions = (order: Order) => {
        const actions = []

        switch (order.status.toLowerCase()) {
            case 'pending':
            case 'accepted':
            case 'confirmed':
                actions.push(
                    { label: "Track Order", type: "primary", icon: Truck },
                    { label: "Invoice", type: "secondary", icon: Eye },
                    { label: "Cancel Order", type: "danger", icon: X }
                )
                break
            case 'shipped':
                actions.push(
                    { label: "Track Order", type: "primary", icon: Truck },
                    { label: "Invoice", type: "secondary", icon: Eye }
                )
                break
            case 'delivered':
                actions.push(
                    { label: "Add Review", type: "primary", icon: Star },
                    { label: "Invoice", type: "secondary", icon: Eye }
                )
                break
            case 'cancelled':
            case 'canceled':
                actions.push(
                    { label: "Invoice", type: "secondary", icon: Eye }
                )
                break
            default:
                actions.push(
                    { label: "Invoice", type: "secondary", icon: Eye }
                )
        }

        return actions
    }

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">Orders</h2>
                </div>
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading orders...</p>
                    </div>
                </div>
            </div>
        )
    }

    // Filter orders based on sort selection
    const filteredOrders = orders.filter(order => {
        if (sortBy === "all") return true
        return order.status.toLowerCase() === sortBy.toLowerCase()
    })

    const displayOrders = filteredOrders

    if (!isLoading && orders.length === 0) {
        return (
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">Orders (0)</h2>
                </div>

                {/* Empty State */}
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Package className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-600 mb-6">You haven't placed any orders yet. Start shopping to see your orders here.</p>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                        Start Shopping
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Orders ({displayOrders.length})</h2>
                <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Sort by:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="all">All</option>
                            <option value="pending">Pending</option>
                            <option value="accepted">Accepted</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                    <Button
                        onClick={handleGetOrders}
                        variant="outline"
                        size="sm"
                        disabled={isLoading}
                        className="flex items-center space-x-1"
                    >
                        <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                        <span>Refresh</span>
                    </Button>
                </div>
            </div>

            {/* Orders List */}
            <div className="space-y-6">

                {displayOrders.map((order) => {
                    const statusInfo = getStatusInfo(order.status)
                    const actions = getOrderActions(order)

                    return (
                        <div key={order.id} className="border border-gray-200 shadow-md rounded-lg">
                            <div className="p-0">
                                {/* Order Header */}
                                <div className="bg-yellow-50 border-b border-gray-200 p-4 rounded-t-lg">
                                    <div className="flex flex-wrap items-center justify-between gap-4">
                                        <div className="flex items-center space-x-4">
                                            <span className="font-semibold text-gray-800">#{order.id}</span>
                                            <span className="font-semibold text-gray-800">${order.total_amount.toFixed(2)}</span>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <span className="text-sm text-gray-600">
                                                {formatDateAndTime(Number(order.created_at))}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="p-4">
                                    <div className="space-y-3">
                                        {order.items && order.items.length > 0 ? (
                                            order.items.map((item, index) => (
                                                <div key={index} className="flex items-center space-x-4">
                                                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                                        <Package className="w-6 h-6 text-gray-400" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-medium text-gray-900">
                                                            {item.variant?.product?.name || 'Product Name'}
                                                        </h3>
                                                        <p className="text-sm text-gray-500">
                                                            {item.variant?.color && `Color: ${item.variant.color}`}
                                                            {item.variant?.size && `, Size: ${item.variant.size}`}
                                                            {` - Qty: ${item.quantity} × $${item.unit_price?.toFixed(2) || 0}`}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-medium text-gray-900">
                                                            ${item.total_price.toFixed(2) || 0}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                                    <Package className="w-6 h-6 text-gray-400" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-gray-900">Order Items</h3>
                                                    <p className="text-sm text-gray-500">
                                                        Item details not available
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Order Summary */}
                                <div className="border-t border-gray-200 p-4 bg-gray-50">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-600">Subtotal</p>
                                            <p className="font-medium">${order.sub_total.toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Shipping</p>
                                            <p className="font-medium">${order.shipping_amount.toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Tax</p>
                                            <p className="font-medium">${order.tax_amount.toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Total</p>
                                            <p className="font-semibold text-lg">${order.total_amount.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Footer */}
                                <div className="border-t border-gray-200 p-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                        <div className="flex items-center space-x-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                                                {order.status}
                                            </span>
                                            <span className="text-sm text-gray-600">{statusInfo.text}</span>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {actions.map((action, index) => {
                                                const IconComponent = action.icon
                                                return (
                                                    <Button
                                                        key={index}
                                                        variant={action.type === "primary" ? "default" : action.type === "secondary" ? "outline" : "ghost"}
                                                        size="sm"
                                                        className={
                                                            action.type === "primary"
                                                                ? "bg-green-600 hover:bg-green-700 text-white"
                                                                : action.type === "danger"
                                                                    ? "text-red-600 hover:text-red-700 hover:bg-red-50"
                                                                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                                                        }
                                                    >
                                                        <IconComponent className="w-4 h-4 mr-1" />
                                                        {action.label}
                                                    </Button>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
