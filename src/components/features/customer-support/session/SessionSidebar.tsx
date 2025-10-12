"use client"

import { Clock, CheckCircle, Package, User, Calendar, Tag, AlertCircle } from "lucide-react"
import { Ticket, TicketStatus, TicketType } from "@/types/customer-support/customer-support.interface"
import { formatDateAndTime } from "@/utils/handleConvertTimestamp"
import Image from "next/image"
import UserAvatar from "@/components/ui/user-avatar"

interface SessionSidebarProps {
    ticket: Ticket
}

export default function SessionSidebar({ ticket }: SessionSidebarProps) {
    const getStatusColor = (status: TicketStatus) => {
        switch (status) {
            case TicketStatus.PENDING:
                return "bg-yellow-100 text-yellow-800 border-yellow-300"
            case TicketStatus.RESOLVED:
                return "bg-green-100 text-green-800 border-green-300"
            default:
                return "bg-gray-100 text-gray-800 border-gray-300"
        }
    }

    const getTypeColor = (type: TicketType) => {
        switch (type) {
            case TicketType.GENERAL:
                return "bg-blue-100 text-blue-800"
            case TicketType.SUPPORT:
                return "bg-purple-100 text-purple-800"
            case TicketType.REVIEW:
                return "bg-indigo-100 text-indigo-800"
            case TicketType.COMPLAINT:
                return "bg-red-100 text-red-800"
            case TicketType.OTHER:
                return "bg-gray-100 text-gray-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const getStatusIcon = (status: TicketStatus) => {
        switch (status) {
            case TicketStatus.PENDING:
                return <Clock className="w-4 h-4" />
            case TicketStatus.RESOLVED:
                return <CheckCircle className="w-4 h-4" />
            default:
                return null
        }
    }

    return (
        <div className="bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-6 space-y-6">
                {/* Header */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Ticket Details</h3>
                    
                    {/* Status & Type */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(ticket.status)}`}>
                            {getStatusIcon(ticket.status)}
                            {ticket.status}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(ticket.type)}`}>
                            {ticket.type}
                        </span>
                    </div>

                    {/* Ticket ID */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <p className="text-xs text-gray-600 mb-1">Ticket ID</p>
                        <p className="text-sm font-mono font-semibold text-gray-800">
                            #{ticket.id.slice(0, 8)}
                        </p>
                    </div>

                    {/* Title */}
                    <div className="mb-4">
                        <p className="text-xs text-gray-600 mb-1">Subject</p>
                        <h4 className="text-sm font-semibold text-gray-800">{ticket.title}</h4>
                    </div>
                </div>

                {/* User Info */}
                <div className="border-t pt-4">
                    <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <h4 className="text-sm font-semibold text-gray-800">Customer</h4>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                            {ticket.user?.avatar ? (
                                <UserAvatar user={ticket.user} />
                            ) : (
                                <span className="text-gray-600 font-semibold text-sm">
                                    {ticket.user?.name?.charAt(0).toUpperCase()}
                                </span>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">
                                {ticket.user?.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                                {ticket.user?.email}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="border-t pt-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <h4 className="text-sm font-semibold text-gray-800">Timeline</h4>
                    </div>
                    <div className="space-y-2">
                        <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-600">Created</p>
                            <p className="text-sm font-medium text-gray-800">
                                {formatDateAndTime(Number(ticket.created_at))}
                            </p>
                        </div>
                        {ticket.updated_at && ticket.updated_at !== ticket.created_at && (
                            <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-xs text-gray-600">Last Updated</p>
                                <p className="text-sm font-medium text-gray-800">
                                    {formatDateAndTime(Number(ticket.updated_at))}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Description */}
                <div className="border-t pt-4">
                    <div className="flex items-center gap-2 mb-3">
                        <AlertCircle className="w-4 h-4 text-gray-500" />
                        <h4 className="text-sm font-semibold text-gray-800">Description</h4>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">
                            {ticket.description}
                        </p>
                    </div>
                </div>

                {/* Tags */}
                {ticket.tags && ticket.tags.length > 0 && (
                    <div className="border-t pt-4">
                        <div className="flex items-center gap-2 mb-3">
                            <Tag className="w-4 h-4 text-gray-500" />
                            <h4 className="text-sm font-semibold text-gray-800">Tags</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {ticket.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Images */}
                {ticket.images && ticket.images.length > 0 && (
                    <div className="border-t pt-4">
                        <h4 className="text-sm font-semibold text-gray-800 mb-3">Attachments</h4>
                        <div className="grid grid-cols-2 gap-2">
                            {ticket.images.map((image, index) => (
                                <Image
                                    key={index}
                                    src={image}
                                    width={1000}
                                    height={1000}
                                    alt={`Attachment ${index + 1}`}
                                    className="w-full h-24 object-cover rounded border border-gray-300 cursor-pointer hover:opacity-75 transition-opacity"
                                    onClick={() => window.open(image, '_blank')}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Related Order */}
                {ticket.order && (
                    <div className="border-t pt-4">
                        <div className="flex items-center gap-2 mb-3">
                            <Package className="w-4 h-4 text-gray-500" />
                            <h4 className="text-sm font-semibold text-gray-800">Related Order</h4>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-xs font-mono font-semibold text-blue-800">
                                    #{ticket.order.id.slice(0, 8)}
                                </p>
                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                                    ticket.order.status === 'PAID' 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {ticket.order.status}
                                </span>
                            </div>
                            <div className="space-y-1 text-xs text-blue-700">
                                <p>Total: <span className="font-semibold">${ticket.order.total_amount.toFixed(2)}</span></p>
                                <p>Items: <span className="font-semibold">{ticket.order.items?.length || 0}</span></p>
                                <p className="text-xs text-blue-600">
                                    {formatDateAndTime(Number(ticket.order.created_at))}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Session Info */}
                <div className="border-t pt-4">
                    <h4 className="text-sm font-semibold text-gray-800 mb-3">Session Info</h4>
                    <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <p className="text-xs font-semibold text-green-800">Active Session</p>
                        </div>
                        <p className="text-xs text-gray-600">Support Agent: <span className="font-medium text-gray-800">Sarah Johnson</span></p>
                        <p className="text-xs text-gray-600 mt-1">Response Time: <span className="font-medium text-gray-800">~2 min</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

