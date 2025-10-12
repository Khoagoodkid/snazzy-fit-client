"use client"

import { useState, useCallback, useEffect } from "react"
import Page from "../app/Page"
import BreadcrumbComponent from "../app/Breadcrumb"
import { Button } from "@/components/ui/button"
import { Plus, RefreshCw } from "lucide-react"
import { toast } from "react-toastify"
import { useCustomerSupport } from "@/services/client/customer-support/useCustomerSupport"
import { useOrderService } from "@/services/client/order/useOrderService"
import { Ticket, CreateTicketRequest, UpdateTicketRequest, TicketStatus } from "@/types/customer-support/customer-support.interface"
import { Order } from "@/types/order/order.interface"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { showAlert } from "@/lib/features/alert/alertSlice"
import TicketForm from "./TicketForm"
import TicketCard from "./TicketCard"
import TicketDetailModal from "./TicketDetailModal"

export default function CustomerSupportPage() {
    const { user } = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()
    const { getTickets, createTicket, updateTicket, deleteTicket, isLoading } = useCustomerSupport()
    const { getOrders } = useOrderService()

    const [tickets, setTickets] = useState<Ticket[]>([])
    const [userOrders, setUserOrders] = useState<Order[]>([])
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [editingTicket, setEditingTicket] = useState<Ticket | null>(null)
    const [viewingTicket, setViewingTicket] = useState<Ticket | null>(null)
    const [filterStatus, setFilterStatus] = useState<string>("ALL")
    const [isRefreshing, setIsRefreshing] = useState(false)

    // Fetch tickets
    const handleGetTickets = useCallback(async () => {
        try {
            setIsRefreshing(true)
            const response = await getTickets()
            setTickets(response.data)
        } catch (error) {
            toast.error((error as Error).message || "Failed to load tickets")
        } finally {
            setIsRefreshing(false)
        }
    }, [getTickets])

    // Fetch user orders
    const handleGetUserOrders = useCallback(async () => {
        try {
            const response = await getOrders()
            setUserOrders(response.data)
        } catch (error) {
            console.error("Failed to load orders:", error)
        }
    }, [getOrders])

    useEffect(() => {
        handleGetTickets()
        if (user) {
            handleGetUserOrders()
        }
    }, [handleGetTickets, handleGetUserOrders, user])

    // Create ticket
    const handleCreateTicket = useCallback(async (data: CreateTicketRequest) => {
        try {
            await createTicket(data)
            toast.success("Ticket created successfully!")
            handleGetTickets()
            setShowCreateForm(false)
        } catch (error) {
            toast.error((error as Error).message || "Failed to create ticket")
        }
    }, [createTicket, handleGetTickets])

    // Update ticket
    const handleUpdateTicket = useCallback(async (data: UpdateTicketRequest) => {
        if (!editingTicket) return

        try {
            await updateTicket(editingTicket.id, data)
            toast.success("Ticket updated successfully!")
            handleGetTickets()
            setEditingTicket(null)
        } catch (error) {
            toast.error((error as Error).message || "Failed to update ticket")
        }
    }, [editingTicket, updateTicket, handleGetTickets])

    // Delete ticket
    const handleDeleteTicket = useCallback(async (ticketId: string) => {
        dispatch(showAlert({
            title: "Delete Ticket",
            message: "Are you sure you want to delete this ticket? This action cannot be undone.",
            type: "warning",
            onConfirm: async () => {
                try {
                    await deleteTicket(ticketId)
                    toast.success("Ticket deleted successfully!")
                    handleGetTickets()
                } catch (error) {
                    toast.error((error as Error).message || "Failed to delete ticket")
                }
            }
        }))
    }, [deleteTicket, handleGetTickets, dispatch])

    // Start editing
    const handleStartEdit = (ticket: Ticket) => {
        setEditingTicket(ticket)
        setShowCreateForm(false)
    }

    // View ticket details
    const handleViewTicket = (ticket: Ticket) => {
        setViewingTicket(ticket)
    }

    // Reset forms
    const handleCancelForm = () => {
        setShowCreateForm(false)
        setEditingTicket(null)
    }

    // Filter tickets
    const filteredTickets = tickets.filter(ticket => {
        if (filterStatus === "ALL") return true
        return ticket.status === filterStatus
    })

    // Get ticket counts
    const ticketCounts = {
        all: tickets.length,
        pending: tickets.filter(t => t.status === TicketStatus.PENDING).length,
        resolved: tickets.filter(t => t.status === TicketStatus.RESOLVED).length
    }

    return (
        <Page className="bg-gray-50">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <BreadcrumbComponent />

                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6 mt-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Customer Support</h1>
                            <p className="text-gray-600 mt-1">Manage your support tickets and get help</p>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                onClick={handleGetTickets}
                                variant="outline"
                                disabled={isRefreshing}
                                className="flex items-center gap-2"
                            >
                                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                                Refresh
                            </Button>
                            {!showCreateForm && !editingTicket && (
                                <Button
                                    onClick={() => setShowCreateForm(true)}
                                    className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                                >
                                    <Plus className="w-4 h-4" />
                                    New Ticket
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Ticket Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm text-blue-600 font-medium">Total Tickets</p>
                            <p className="text-3xl font-bold text-blue-800 mt-1">{ticketCounts.all}</p>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <p className="text-sm text-yellow-600 font-medium">Pending</p>
                            <p className="text-3xl font-bold text-yellow-800 mt-1">{ticketCounts.pending}</p>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <p className="text-sm text-green-600 font-medium">Resolved</p>
                            <p className="text-3xl font-bold text-green-800 mt-1">{ticketCounts.resolved}</p>
                        </div>
                    </div>
                </div>

                {/* Create Form */}
                {showCreateForm && (
                    <div className="mb-6">
                        <TicketForm
                            userOrders={userOrders}
                            onSubmit={handleCreateTicket}
                            onCancel={handleCancelForm}
                            isLoading={isLoading}
                        />
                    </div>
                )}

                {/* Edit Form */}
                {editingTicket && (
                    <div className="mb-6">
                        <TicketForm
                            isEdit
                            initialData={{
                                title: editingTicket.title,
                                description: editingTicket.description,
                                type: editingTicket.type,
                                tags: editingTicket.tags,
                                order_id: editingTicket.order_id,
                                images: editingTicket.images
                            }}
                            userOrders={userOrders}
                            onSubmit={handleUpdateTicket}
                            onCancel={handleCancelForm}
                            isLoading={isLoading}
                        />
                    </div>
                )}

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">Filter by Status:</span>
                        <div className="flex gap-2">
                            <Button
                                variant={filterStatus === "ALL" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setFilterStatus("ALL")}
                            >
                                All ({ticketCounts.all})
                            </Button>
                            <Button
                                variant={filterStatus === TicketStatus.PENDING ? "default" : "outline"}
                                size="sm"
                                onClick={() => setFilterStatus(TicketStatus.PENDING)}
                                className={filterStatus === TicketStatus.PENDING ? "bg-yellow-600 hover:bg-yellow-700" : ""}
                            >
                                Pending ({ticketCounts.pending})
                            </Button>
                            <Button
                                variant={filterStatus === TicketStatus.RESOLVED ? "default" : "outline"}
                                size="sm"
                                onClick={() => setFilterStatus(TicketStatus.RESOLVED)}
                                className={filterStatus === TicketStatus.RESOLVED ? "bg-green-600 hover:bg-green-700" : ""}
                            >
                                Resolved ({ticketCounts.resolved})
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Tickets List */}
                <div className="space-y-4">
                    {filteredTickets.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                            <div className="max-w-md mx-auto">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Plus className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    {filterStatus === "ALL" ? "No tickets yet" : `No ${filterStatus.toLowerCase()} tickets`}
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    {filterStatus === "ALL" 
                                        ? "Create your first support ticket to get started." 
                                        : `You don't have any ${filterStatus.toLowerCase()} tickets at the moment.`}
                                </p>
                                {filterStatus === "ALL" && !showCreateForm && (
                                    <Button
                                        onClick={() => setShowCreateForm(true)}
                                        className="bg-green-600 hover:bg-green-700 text-white"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Create Ticket
                                    </Button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredTickets.map((ticket) => (
                                <TicketCard
                                    key={ticket.id}
                                    ticket={ticket}
                                    onEdit={handleStartEdit}
                                    onDelete={handleDeleteTicket}
                                    onView={handleViewTicket}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Detail Modal */}
            <TicketDetailModal
                ticket={viewingTicket}
                isOpen={!!viewingTicket}
                onClose={() => setViewingTicket(null)}
            />
        </Page>
    )
}   