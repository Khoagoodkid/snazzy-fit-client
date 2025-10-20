"use client"

import { Button } from "@/components/ui/button"
import { Edit, Trash2, Eye, Clock, CheckCircle, MessageSquare } from "lucide-react"
import { Ticket, TicketStatus, TicketType } from "@/types/customer-support/customer-support.interface"
import { formatDateAndTime } from "@/utils/handleConvertTimestamp"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface TicketCardProps {
    ticket: Ticket
    onEdit: (ticket: Ticket) => void
    onDelete: (ticketId: string) => void
    onView: (ticket: Ticket) => void
}

export default function TicketCard({ ticket, onEdit, onDelete, onView }: TicketCardProps) {
    const router = useRouter()

    const handleChatClick = () => {
        if (ticket.sessions?.length === 0) return
        router.push(`/customer-service/${ticket.id}/session/${ticket.sessions?.[0]?.id}`)
    }

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
        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(ticket.status)}`}>
                            {getStatusIcon(ticket.status)}
                            {ticket.status}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(ticket.type)}`}>
                            {ticket.type}
                        </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {ticket.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                        Ticket #{ticket.id.slice(0, 8)} • {formatDateAndTime(Number(ticket.created_at))}
                    </p>
                </div>

                {/* Action Buttons */}
                {ticket.status === TicketStatus.PENDING && (
                    <div className="flex gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onEdit(ticket)}
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        >
                            <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDelete(ticket.id)}
                            className="text-red-600 hover:text-red-800 hover:bg-red-50"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                )}
            </div>

            {/* Description Preview */}
            <p className="text-gray-700 mb-4 line-clamp-2">
                {ticket.description}
            </p>

            {/* Tags */}
            {ticket.tags && ticket.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {ticket.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Images Preview */}
            {ticket.images && ticket.images.length > 0 && (
                <div className="flex gap-2 mb-4 overflow-x-auto">
                    {ticket.images.slice(0, 3).map((image, index) => (
                        <Image
                            key={index}
                            src={image}
                            width={1000}
                            height={1000}
                            alt={`Ticket ${index + 1}`}
                            className="w-16 h-16 object-cover rounded border border-gray-300"
                        />
                    ))}
                    {ticket.images.length > 3 && (
                        <div className="w-16 h-16 bg-gray-100 rounded border border-gray-300 flex items-center justify-center">
                            <span className="text-xs text-gray-600">+{ticket.images.length - 3}</span>
                        </div>
                    )}
                </div>
            )}

            {/* Related Order */}
            {ticket.order && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Related Order</p>
                    <p className="text-sm font-medium text-gray-800">
                        Order #{ticket.order.id.slice(0, 8)} • ${ticket.order.total_amount.toFixed(2)}
                    </p>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
                <Button
                    onClick={() => onView(ticket)}
                    variant="outline"
                    className="flex-1"
                >
                    <Eye className="w-4 h-4 mr-2" />
                    Details
                </Button>
                {
                    ticket.sessions && ticket.sessions.length > 0 && (
                        <Button
                            onClick={handleChatClick}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                        >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Chat
                        </Button>
                    )
                }
            </div>
        </div>
    )
}

