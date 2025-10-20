"use client"

import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import UserAvatar from "@/components/ui/user-avatar"
import {
    X,
    Send,
    Paperclip,
    Smile,
    MoreVertical,
    Phone,
    Video,
    Info,
    ArrowLeft,
    Check,
    CheckCheck,
    XCircle
} from "lucide-react"
import { toast } from "react-toastify"
import { Ticket, TicketStatus } from "@/types/customer-support/customer-support.interface"
import { format } from "date-fns"
import { useLiveChatContext } from "@/app/LiveChatProvider"
import { MessageRole } from "@/types/session/session.interface"
import { formatDateAndTime } from "@/utils/handleConvertTimestamp"
import Image from "next/image"

interface Message {
    id: string
    content: string
    sender: "admin" | "customer"
    timestamp: Date
    read: boolean
}

interface ChatWindowProps {
    ticket: Ticket
    onClose: () => void
}

export default function ChatWindow({ ticket, onClose }: ChatWindowProps) {

    const [messagePayload, setMessagePayload] = useState({
        content: "",
        files: []
    } as { content: string, files: File[] })
    const [previewUrls, setPreviewUrls] = useState<string[]>([])
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const {
        selectedSession,
        handleSelectSession: onSelectSession,
        handleSendMessage: onSendMessage,
        messages,
    } = useLiveChatContext()

    useEffect(() => {
        onSelectSession(ticket.sessions?.[0]?.id || "")
    }, [ticket.sessions])

    // Auto-scroll to bottom when new messages arrive
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    // Focus input on mount
    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    // Handle file selection
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])

        // Validate file types
        const invalidFiles = files.filter(file => !file.type.startsWith('image/'))
        if (invalidFiles.length > 0) {
            toast.error("Please select only image files")
            return
        }

        // Validate file sizes (max 5MB each)
        const oversizedFiles = files.filter(file => file.size > 5 * 1024 * 1024)
        if (oversizedFiles.length > 0) {
            toast.error("Each file must be less than 5MB")
            return
        }

        // Limit total files to 3
        const totalFiles = messagePayload.files.length + files.length
        if (totalFiles > 3) {
            toast.error("Maximum 3 images allowed per message")
            return
        }

        setMessagePayload(prev => ({
            ...prev,
            files: [...prev.files, ...files]
        }))

        // Create preview URLs
        files.forEach(file => {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewUrls(prev => [...prev, reader.result as string])
            }
            reader.readAsDataURL(file)
        })
    }

    // Remove selected file
    const handleRemoveFile = (index: number) => {
        setMessagePayload(prev => ({
            ...prev,
            files: prev.files.filter((_, i) => i !== index)
        }))
        setPreviewUrls(prev => prev.filter((_, i) => i !== index))
    }

    const handleSendMessage = () => {
        if (!messagePayload.content.trim() && messagePayload.files.length === 0) {
            toast.error("Please enter a message or attach an image")
            return
        }

        onSendMessage({
            content: messagePayload.content,
            files: messagePayload.files,
            sessionId: ticket.sessions?.[0]?.id || ""
        })
        
        // Reset form
        setMessagePayload({
            content: "",
            files: []
        })
        setPreviewUrls([])
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    return (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="absolute inset-0 flex items-center justify-center p-4">
                {/* Chat Container */}
                <Card className="w-full max-w-4xl h-[85vh] bg-white/95 backdrop-blur-sm border-0 shadow-2xl animate-in slide-in-from-bottom duration-300 flex flex-col">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-4 rounded-t-xl flex items-center justify-between border-b border-slate-600">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onClose}
                                className="text-white hover:bg-white/10 shrink-0"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </Button>

                            {/* Customer Info */}
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className="w-10 h-10 shrink-0 shadow-lg rounded-full overflow-hidden ring-2 ring-white/20">
                                    <UserAvatar user={ticket.user} className="w-full h-full" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="font-bold text-white truncate">
                                        {ticket.user?.name || "Customer"}
                                    </h3>
                                    <p className="text-xs text-slate-300 truncate">
                                        {ticket.user?.email || ""}
                                    </p>
                                </div>
                            </div>

                            {/* Status Badge */}
                            <Badge
                                className={
                                    ticket.status === TicketStatus.PENDING
                                        ? "bg-amber-500 text-white hover:bg-amber-500"
                                        : "bg-emerald-500 text-white hover:bg-emerald-500"
                                }
                            >
                                {ticket.status}
                            </Badge>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 ml-4 shrink-0">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-white hover:bg-white/10"
                            >
                                <Phone className="w-5 h-5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-white hover:bg-white/10"
                            >
                                <Video className="w-5 h-5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-white hover:bg-white/10"
                            >
                                <Info className="w-5 h-5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onClose}
                                className="text-white hover:bg-white/10"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Ticket Info Bar */}
                    <div className="bg-gradient-to-b from-slate-50 to-white p-3 border-b border-slate-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-slate-900">
                                    Ticket #{ticket.id.slice(0, 8)}
                                </span>
                                <span className="text-slate-400">•</span>
                                <span className="text-sm text-slate-600 truncate max-w-md">
                                    {ticket.title}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge
                                    variant="outline"
                                    className="text-xs border-cyan-200 text-cyan-700 bg-cyan-50"
                                >
                                    {ticket.type}
                                </Badge>
                                {ticket.tags?.slice(0, 2).map((tag, idx) => (
                                    <Badge
                                        key={idx}
                                        variant="outline"
                                        className="text-xs border-slate-200 text-slate-600"
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <CardContent className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-slate-50/50 to-white space-y-4">
                        {/* Date Divider */}
                        <div className="flex items-center justify-center">
                            <div className="bg-slate-200 text-slate-600 text-xs px-3 py-1 rounded-full">
                                {format(new Date(Number(ticket.created_at)), "MMMM dd, yyyy")}
                            </div>
                        </div>

                        {/* Messages */}
                        {messages.map((message, idx) => (
                            <div
                                key={message.id}
                                className={`flex ${message.role === MessageRole.ASSISTANT ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom duration-200`}
                                style={{ animationDelay: `${idx * 50}ms` }}
                            >
                                <div
                                    className={`flex items-end gap-2 max-w-[70%] ${message.role === MessageRole.ASSISTANT ? "flex-row-reverse" : "flex-row"
                                        }`}
                                >
                                    {/* Avatar */}
                                    {message.role === MessageRole.ASSISTANT ? (
                                        <div className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center shadow-md bg-gradient-to-br from-emerald-400 to-green-500">
                                            <span className="text-white text-xs font-bold">A</span>
                                        </div>
                                    ) : (
                                        <div className="w-8 h-8 shrink-0 rounded-full overflow-hidden shadow-md ring-2 ring-cyan-200">
                                            <UserAvatar user={ticket.user} className="w-full h-full" />
                                        </div>
                                    )}

                                    <div className=" space-y-2">

                                        {message.media && message.media.length > 0 && (
                                            <div className={`mt-3 grid ${message.media.length === 1 ? "grid-cols-1" : "grid-cols-2"} gap-2 `}>
                                                {message.media.map((image, index) => (
                                                    <Image
                                                        key={index}
                                                        src={image}
                                                        width={1000}
                                                        height={1000}
                                                        alt={`Attachment ${index + 1}`}
                                                        className="w-full h-32 object-cover rounded border border-white/20 cursor-pointer hover:opacity-75 transition-opacity"
                                                        onClick={() => window.open(image, '_blank')}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                        {/* Message Bubble */}
                                        {message.content && (
                                            <div
                                                className={`rounded-2xl px-4 py-3 ${message.role === MessageRole.ASSISTANT
                                                    ? "bg-gradient-to-br from-cyan-600 to-teal-600 text-white rounded-br-sm"
                                                    : "bg-white border border-slate-200 text-slate-900 rounded-bl-sm shadow-sm"
                                                    }`}
                                            >
                                                <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                                                    {message.content}
                                                </p>
                                                <div
                                                    className={`flex items-center gap-1 mt-1 text-xs ${message.role === MessageRole.ASSISTANT
                                                        ? "text-cyan-100 justify-end"
                                                        : "text-slate-500"
                                                        }`}
                                                >
                                                    <span>{formatDateAndTime(Number(message.created_at))}</span>
                                                    {message.role === MessageRole.ASSISTANT && (
                                                        <span>
                                                            {message.receiver_read_at !== null ? (
                                                                <CheckCheck className="w-3 h-3" />
                                                            ) : (
                                                                <Check className="w-3 h-3" />
                                                            )}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}


                        <div ref={messagesEndRef} />
                    </CardContent>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-slate-200 rounded-b-xl">
                        {/* Image Previews */}
                        {previewUrls.length > 0 && (
                            <div className="mb-3 flex gap-2 flex-wrap">
                                {previewUrls.map((url, index) => (
                                    <div key={index} className="relative group">
                                        <Image
                                            src={url}
                                            width={80}
                                            height={80}
                                            alt={`Preview ${index + 1}`}
                                            className="w-20 h-20 object-cover rounded-lg border-2 border-slate-200 shadow-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveFile(index)}
                                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex items-end gap-2">
                            {/* Attachment Button */}
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={messagePayload.files.length >= 3}
                                className="hover:bg-slate-100 text-slate-600 shrink-0 disabled:opacity-50"
                                title="Attach images (max 3)"
                            >
                                <Paperclip className="w-5 h-5" />
                            </Button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileSelect}
                                className="hidden"
                            />

                            {/* Input Field */}
                            <div className="flex-1 relative">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Type your message..."
                                    value={messagePayload.content}
                                    onChange={(e) => setMessagePayload({ ...messagePayload, content: e.target.value })}
                                    onKeyPress={handleKeyPress}
                                    className="w-full h-10 px-4 pr-10 border-2 border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none rounded-xl text-slate-900 placeholder:text-slate-400"
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-slate-100 text-slate-600 h-8 w-8"
                                >
                                    <Smile className="w-5 h-5" />
                                </Button>
                            </div>

                            {/* Send Button */}
                            <Button
                                onClick={handleSendMessage}
                                disabled={!messagePayload.content.trim() && messagePayload.files.length === 0}
                                className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed shrink-0 h-10 w-10 p-0"
                            >
                                <Send className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex items-center gap-2 mt-3">
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-xs border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                            >
                                Mark as Resolved
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-xs border-slate-200 hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-700"
                            >
                                Request Info
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-xs border-slate-200 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700"
                            >
                                Escalate
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

