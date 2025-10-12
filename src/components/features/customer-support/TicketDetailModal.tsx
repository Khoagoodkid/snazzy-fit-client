"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Clock, CheckCircle, Package } from "lucide-react"
import { Ticket, TicketStatus, TicketType } from "@/types/customer-support/customer-support.interface"
import { formatDateAndTime } from "@/utils/handleConvertTimestamp"
import UserAvatar from "@/components/ui/user-avatar"
import Image from "next/image"

interface TicketDetailModalProps {
    ticket: Ticket | null
    isOpen: boolean
    onClose: () => void
}

export default function TicketDetailModal({ ticket, isOpen, onClose }: TicketDetailModalProps) {
    if (!ticket) return null

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
                return <Clock className="w-5 h-5" />
            case TicketStatus.RESOLVED:
                return <CheckCircle className="w-5 h-5" />
            default:
                return null
        }
    }

    return (
        <Dialog

            open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto"
                showCloseButton={false}
            >
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-start justify-between border-b pb-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-3">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center gap-1 ${getStatusColor(ticket.status)}`}>
                                    {getStatusIcon(ticket.status)}
                                    {ticket.status}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(ticket.type)}`}>
                                    {ticket.type}
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                {ticket.title}
                            </h2>
                            <p className="text-sm text-gray-500">
                                Ticket #{ticket.id.slice(0, 8)}
                            </p>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* User Info */}
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                            {ticket.user?.avatar ? (
                                <UserAvatar user={ticket.user} />
                            ) : (
                                <span className="text-gray-600 font-semibold text-lg">
                                    {ticket.user?.name?.charAt(0).toUpperCase()}
                                </span>
                            )}
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800">{ticket.user?.name}</h4>
                            <p className="text-sm text-gray-500">{ticket.user?.email}</p>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Created:</span>
                            <span className="font-medium text-gray-800">
                                {formatDateAndTime(Number(ticket.created_at))}
                            </span>
                        </div>
                        {ticket.updated_at && ticket.updated_at !== ticket.created_at && (
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Last Updated:</span>
                                <span className="font-medium text-gray-800">
                                    {formatDateAndTime(Number(ticket.updated_at))}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <p className="text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
                        </div>
                    </div>

                    {/* Tags */}
                    {ticket.tags && ticket.tags.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {ticket.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Images */}
                    {ticket.images && ticket.images.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Attachments</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {ticket.images.map((image, index) => (
                                    <Image
                                        key={index}
                                        src={image}
                                        width={1000}
                                        height={1000}
                                        alt={`Ticket attachment ${index + 1}`}
                                        className="w-full h-40 object-cover rounded-lg border border-gray-300 cursor-pointer hover:opacity-75 transition-opacity"
                                        onClick={() => window.open(image, '_blank')}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Related Order */}
                    {ticket.order && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Related Order</h3>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                        <Package className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-semibold text-gray-800">
                                                Order #{ticket.order.id.slice(0, 8)}
                                            </h4>
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${ticket.order.status === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {ticket.order.status}
                                            </span>
                                        </div>
                                        <div className="space-y-1 text-sm text-gray-600">
                                            <p>Total: <span className="font-medium text-gray-800">${ticket.order.total_amount.toFixed(2)}</span></p>
                                            <p>Items: <span className="font-medium text-gray-800">{ticket.order.items?.length}</span></p>
                                            <p>Date: <span className="font-medium text-gray-800">
                                                {formatDateAndTime(Number(ticket.order.created_at))}
                                            </span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="flex justify-end pt-4 border-t">
                        <Button onClick={onClose} variant="outline">
                            Close
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

