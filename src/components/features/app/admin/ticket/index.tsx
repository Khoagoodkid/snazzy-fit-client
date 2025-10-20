"use client"

import React, { useEffect, useState } from "react"
import { useCustomerSupport } from "@/services/client/customer-support/useCustomerSupport"
import { Ticket, TicketStatus, TicketType } from "@/types/customer-support/customer-support.interface"
import { DataTable } from "@/components/ui/data-table/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Ticket as TicketIcon,
    MessageSquare,
    CheckCircle,
    Clock,
    Eye,
    Trash2,
    BarChart3
} from "lucide-react"
import { toast } from "react-toastify"
import { format } from "date-fns"
import ChatWindow from "./ChatWindow"
import { useSessionService } from "@/services/client/session/useSessionService"
import { showAlert } from "@/lib/features/alert/alertSlice"
import { useAppDispatch } from "@/lib/hooks"

export default function TicketManagement() {
    const { getTicketsForAdmin, deleteTicket, markTicketAsResolved, isLoading } = useCustomerSupport()
    const { createSessionByTicket, isLoading: isCreatingSession } = useSessionService()
    const dispatch = useAppDispatch()
    const [tickets, setTickets] = useState<Ticket[]>([])
    const [searchValue, setSearchValue] = useState("")
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
    const [showChat, setShowChat] = useState(false)

    // Fetch tickets on mount
    useEffect(() => {
        fetchTickets()
    }, [])

    const fetchTickets = async () => {
        try {
            const response = await getTicketsForAdmin()
            if (response?.data) {
                setTickets(response.data)
            }
        } catch (error) {
            toast.error((error as Error).message || "Failed to fetch tickets")
        }
    }

    // Handle delete selected tickets
    const handleDeleteSelected = async (selectedTickets: Ticket[]) => {
        dispatch(showAlert({
            title: "Delete Tickets",
            message: `Are you sure you want to delete ${selectedTickets.length} tickets?`,
            type: "warning",
            onConfirm: async () => {
                try {
                    await Promise.all(
                        selectedTickets.map((ticket) => deleteTicket(ticket.id))
                    )
                    toast.success(`Successfully deleted ${selectedTickets.length} ticket(s)`)
                    fetchTickets()
                } catch (error) {
                    toast.error("Failed to delete tickets")
                }
            }
        }))
    }

    // Handle view ticket
    const handleViewTicket = (ticketId: string) => {
        // Navigate to ticket detail page or open modal
        window.open(`/admin/ticket/${ticketId}`, '_blank')
    }

    // Handle open chat
    const handleOpenChat = async (ticket: Ticket) => {
        try {
            // Check if session already exists for this ticket
            if (!ticket.sessions || ticket.sessions.length === 0) {
                // Create a new session
                toast.info("Creating chat session...")
                await createSessionByTicket({
                    ticketId: ticket.id,
                    userId: ticket.user_id,
                })
                toast.success("Chat session created successfully")

                // Refresh tickets to get the updated session
                await fetchTickets()

                // Find the updated ticket
                const updatedTickets = await getTicketsForAdmin()
                const updatedTicket = updatedTickets?.data?.find(t => t.id === ticket.id)

                if (updatedTicket) {
                    setSelectedTicket(updatedTicket)
                } else {
                    setSelectedTicket(ticket)
                }
            } else {
                setSelectedTicket(ticket)
            }

            setShowChat(true)
        } catch (error) {
            toast.error((error as Error).message || "Failed to create chat session")
        }
    }

    // Handle close chat
    const handleCloseChat = () => {
        setShowChat(false)
        setSelectedTicket(null)
    }

    // Handle mark as resolved
    const handleMarkAsResolved = (ticket: Ticket) => {
        if (ticket.status === TicketStatus.RESOLVED) {
            toast.info("This ticket is already resolved")
            return
        }

        dispatch(showAlert({
            title: "Mark as Resolved",
            message: "Are you sure you want to mark this ticket as resolved?",
            type: "info",
            onConfirm: async () => {
                try {
                    await markTicketAsResolved(ticket.id)
                    toast.success("Ticket marked as resolved successfully!")
                    fetchTickets()
                } catch (error) {
                    toast.error((error as Error).message || "Failed to mark ticket as resolved")
                }
            }
        }))
    }

    // Get status badge styling
    const getStatusBadge = (status: TicketStatus) => {
        switch (status) {
            case TicketStatus.PENDING:
                return (
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                    </Badge>
                )
            case TicketStatus.RESOLVED:
                return (
                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Resolved
                    </Badge>
                )
            default:
                return <Badge>{status}</Badge>
        }
    }

    // Get type badge styling
    const getTypeBadge = (type: TicketType) => {
        const typeColors: Record<TicketType, string> = {
            [TicketType.GENERAL]: "bg-slate-100 text-slate-800",
            [TicketType.SUPPORT]: "bg-cyan-100 text-cyan-800",
            [TicketType.REVIEW]: "bg-purple-100 text-purple-800",
            [TicketType.COMPLAINT]: "bg-red-100 text-red-800",
            [TicketType.OTHER]: "bg-gray-100 text-gray-800",
        }

        return (
            <Badge className={`${typeColors[type]} hover:${typeColors[type]}`}>
                {type}
            </Badge>
        )
    }

    // Calculate statistics
    const stats = {
        total: tickets.length,
        pending: tickets.filter((t) => t.status === TicketStatus.PENDING).length,
        resolved: tickets.filter((t) => t.status === TicketStatus.RESOLVED).length,
        byType: {
            general: tickets.filter((t) => t.type === TicketType.GENERAL).length,
            support: tickets.filter((t) => t.type === TicketType.SUPPORT).length,
            review: tickets.filter((t) => t.type === TicketType.REVIEW).length,
            complaint: tickets.filter((t) => t.type === TicketType.COMPLAINT).length,
            other: tickets.filter((t) => t.type === TicketType.OTHER).length,
        }
    }

    // Define table columns
    const columns: ColumnDef<Ticket>[] = [
        {
            accessorKey: "title",
            header: "Ticket Title",
            cell: ({ row }) => (
                <div className="max-w-xs">
                    <p className="font-medium text-slate-900 truncate">{row.original.title}</p>
                    <p className="text-xs text-slate-500 truncate mt-1">
                        {row.original.description}
                    </p>
                </div>
            ),
        },
        {
            accessorKey: "user",
            header: "Customer",
            cell: ({ row }) => (
                <div>
                    <p className="font-medium text-slate-900">{row.original.user?.name || "N/A"}</p>
                    <p className="text-xs text-slate-500">{row.original.user?.email || ""}</p>
                </div>
            ),
        },
        {
            accessorKey: "type",
            header: "Type",
            cell: ({ row }) => getTypeBadge(row.original.type),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => getStatusBadge(row.original.status),
        },
        {
            accessorKey: "tags",
            header: "Tags",
            cell: ({ row }) => (
                <div className="flex flex-wrap gap-1">
                    {row.original.tags?.slice(0, 2).map((tag, idx) => (
                        <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs border-slate-200 text-slate-600"
                        >
                            {tag}
                        </Badge>
                    ))}
                    {row.original.tags?.length > 2 && (
                        <Badge variant="outline" className="text-xs border-slate-200 text-slate-600">
                            +{row.original.tags.length - 2}
                        </Badge>
                    )}
                </div>
            ),
        },
        {
            accessorKey: "created_at",
            header: "Created At",
            cell: ({ row }) => (
                <div className="text-sm text-slate-600">
                    {format(new Date(Number(row.original.created_at)), "MMM dd, yyyy")}
                    <div className="text-xs text-slate-400">
                        {format(new Date(Number(row.original.created_at)), "hh:mm a")}
                    </div>
                </div>
            ),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewTicket(row.original.id)}
                        className="hover:bg-cyan-50 hover:text-cyan-600"
                        title="View Details"
                    >
                        <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleOpenChat(row.original)
                        }}
                        disabled={isCreatingSession}
                        className="hover:bg-cyan-50 hover:text-cyan-600 disabled:opacity-50"
                        title="Open Chat"
                    >
                        <MessageSquare className="w-4 h-4" />
                    </Button>
                    {row.original.status === TicketStatus.PENDING && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation()
                                handleMarkAsResolved(row.original)
                            }}
                            disabled={isLoading}
                            className="hover:bg-emerald-50 hover:text-emerald-600 disabled:opacity-50"
                            title="Mark as Resolved"
                        >
                            <CheckCircle className="w-4 h-4" />
                        </Button>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={async () => {
                            dispatch(showAlert({
                                title: "Delete Ticket",
                                message: "Are you sure you want to delete this ticket?",
                                type: "warning",
                                onConfirm: async () => {
                                    try {
                                        await deleteTicket(row.original.id)
                                        toast.success("Ticket deleted successfully")
                                        fetchTickets()
                                    } catch (error) {
                                        toast.error("Failed to delete ticket")
                                    }
                                }
                            }))
                        }}
                        className="hover:bg-red-50 hover:text-red-600"
                        title="Delete Ticket"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            ),
        },
    ]

    return (
        <>
            {/* Chat Window Overlay */}
            {showChat && selectedTicket && (
                <ChatWindow ticket={selectedTicket} onClose={handleCloseChat} />
            )}

            <div className="space-y-6">
                {/* Page Header */}
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <TicketIcon className="w-6 h-6 text-cyan-600" />
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                            Ticket Management
                        </h1>
                    </div>
                    <p className="text-gray-600">
                        View and manage customer support tickets
                    </p>
                </div>

                {/* Statistics Dashboard */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Total Tickets */}
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Total Tickets</p>
                                    <p className="text-3xl font-bold text-slate-900">
                                        {stats.total}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                                    <MessageSquare className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pending Tickets */}
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Pending</p>
                                    <p className="text-3xl font-bold text-slate-900">
                                        {stats.pending}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                                    <Clock className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Resolved Tickets */}
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Resolved</p>
                                    <p className="text-3xl font-bold text-slate-900">
                                        {stats.resolved}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                                    <CheckCircle className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Support Type */}
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Support Tickets</p>
                                    <p className="text-3xl font-bold text-slate-900">
                                        {stats.byType.support}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                                    <BarChart3 className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Data Table */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                    <CardContent className="p-0">
                        {/* Card Header */}
                        <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 rounded-t-xl">
                            <h3 className="text-xl font-bold text-white mb-1">
                                All Tickets
                            </h3>
                            <p className="text-slate-300 text-sm">
                                Manage and track all customer support tickets
                            </p>
                        </div>

                        {/* Table */}
                        <div className="p-6">
                            <DataTable
                                columns={columns}
                                data={tickets}
                                searchValue={searchValue}
                                onSearchChange={setSearchValue}
                                searchPlaceholder="Search tickets by title, description, or customer..."
                                loading={isLoading}
                                emptyMessage="No tickets found"
                                onDeleteSelected={handleDeleteSelected}
                                showCheckboxColumn={true}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
