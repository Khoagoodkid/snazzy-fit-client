"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Page from "../../app/Page"
import BreadcrumbComponent from "../../app/Breadcrumb"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MessageSquare, Loader2 } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { toast } from "react-toastify"
import { MessageRole } from "@/types/session/session.interface"
import { formatDateAndTime } from "@/utils/handleConvertTimestamp"
import MessageInput from "./MessageInput"
import SessionSidebar from "./SessionSidebar"
import { useCustomerSupport } from "@/services/client/customer-support/useCustomerSupport"
import { Ticket } from "@/types/customer-support/customer-support.interface"
import { useLiveChatContext } from "@/app/LiveChatProvider"
import MessageDisplay from "./MessageDisplay"

export default function CustomerServiceSessionPage() {
    const router = useRouter()
    const params = useParams()
    const sessionId = params.sessionId as string
    const ticketId = params.id as string


    const {
        messages,
        handleSendMessage: onSendMessage,
        selectedSession,
        handleSelectSession: onSelectSession,
    } = useLiveChatContext()
    const { getTicketById } = useCustomerSupport()
    const [ticket, setTicket] = useState<Ticket | null>(null)
    const [isLoadingTicket, setIsLoadingTicket] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const messageContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (sessionId) {
            onSelectSession(sessionId)
        }
    }, [sessionId])

    // Fetch ticket details
    const handleGetTicket = useCallback(async () => {
        if (!ticketId) return

        setIsLoadingTicket(true)
        try {
            const response = await getTicketById(ticketId)
            setTicket(response.data)
        } catch (error) {
            toast.error((error as Error).message || "Failed to load ticket details")
            // Optionally redirect back to tickets page
            setTimeout(() => {
                router.back()
            }, 2000)
        } finally {
            setIsLoadingTicket(false)
        }
    }, [ticketId, getTicketById, router])

    // Fetch ticket on mount
    useEffect(() => {
        handleGetTicket()
    }, [handleGetTicket])

    // Scroll to bottom when messages change
    useEffect(() => {
        if (messagesEndRef.current && messageContainerRef.current) {
            messageContainerRef.current.scrollTo({
              top: messagesEndRef.current.offsetTop,
              behavior: 'smooth',
            });
          }
    }, [messages])

    // Handle send message
    const handleSendMessage = async (message: string, files?: File[]) => {
        setIsLoading(true)

        onSendMessage({
            content: message,
            files: files || [],
            sessionId: sessionId
        })        

        setIsLoading(false)
    }

    // Handle go back
    const handleGoBack = () => {
        router.back()
    }

    // Loading state
    if (isLoadingTicket) {
        return (
            <Page className="bg-gray-50">
                <div className="container mx-auto px-4 py-8 max-w-[1600px]">
                    <BreadcrumbComponent />
                    <div className="flex items-center justify-center" style={{ height: 'calc(100vh - 200px)' }}>
                        <div className="text-center">
                            <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
                            <p className="text-gray-600">Loading ticket details...</p>
                        </div>
                    </div>
                </div>
            </Page>
        )
    }

    // Error state - no ticket found
    if (!ticket) {
        return (
            <Page className="bg-gray-50">
                <div className="container mx-auto px-4 py-8 max-w-[1600px]">
                    <BreadcrumbComponent />
                    <div className="flex items-center justify-center" style={{ height: 'calc(100vh - 200px)' }}>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ArrowLeft className="w-8 h-8 text-red-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Ticket Not Found</h3>
                            <p className="text-gray-600 mb-4">The ticket you're looking for doesn't exist.</p>
                            <Button onClick={handleGoBack} variant="outline">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Tickets
                            </Button>
                        </div>
                    </div>
                </div>
            </Page>
        )
    }

    return (
        <Page className="bg-gray-50">
            <div className="container mx-auto px-4 py-8 max-w-[1600px]">
                {/* Top Bar with Breadcrumb and Back Button */}
                <div className="flex items-center justify-between mb-6">
                    <BreadcrumbComponent />
                    <Button
                        variant="outline"
                        onClick={handleGoBack}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Tickets
                    </Button>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Sidebar - Ticket Details (1/3 width) */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
                            <SessionSidebar ticket={ticket} />
                        </div>
                    </div>

                    {/* Right Side - Chat (2/3 width) */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-lg flex flex-col h-[calc(100vh-100px)]">
                            {/* Chat Header */}
                            <div className="border-b border-gray-200 p-4 bg-gradient-to-r from-green-600 to-green-700">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                        <MessageSquare className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-white">Live Chat Support</h2>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                            <p className="text-sm text-green-100">Support {selectedSession?.assistant?.name} is online</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Messages Container */}
                            <div 
                            ref={messageContainerRef}
                            className="flex-1 overflow-y-auto p-6 space-y-4">
                               <MessageDisplay messages={messages} />
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Container */}
                            <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
                        </div>
                    </div>
                </div>

                {/* Help Text */}
                <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> This is a live chat support interface. Messages will be sent to and received from the support team in real-time.
                    </p>
                </div>
            </div>
        </Page>
    )
}