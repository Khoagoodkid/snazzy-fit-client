"use client"

import React, { useEffect, useState, useMemo, useRef } from "react"
import { useLiveChatContext } from "@/app/LiveChatProvider"
import { Session, Message, MessageRole, SessionSource } from "@/types/session/session.interface"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    MessageSquare,
    Send,
    Paperclip,
    Users,
    Clock,
    CheckCircle,
    Search,
    X,
    Smile
} from "lucide-react"
import { formatDateAndTime } from "@/utils/handleConvertTimestamp"
import UserAvatar from "@/components/ui/user-avatar"
import { toast } from "react-toastify"
import Image from "next/image"
import { format } from "date-fns"
import { User } from "@/types/user/user.interface"

export default function HelpDeskManagement() {
    const { sessions, messages, selectedSession, handleSelectSession, handleSendMessage } = useLiveChatContext()
    const [searchValue, setSearchValue] = useState("")
    const [messagePayload, setMessagePayload] = useState({
        content: "",
        files: []
    } as { content: string, files: File[] })
    const [previewUrls, setPreviewUrls] = useState<string[]>([])
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Filter sessions without ticket_id (Help Desk sessions)
    const helpDeskSessions = useMemo(() => {
        return sessions.filter(session => !session.ticket_id)
    }, [sessions])

    // Filter sessions by search
    const filteredSessions = useMemo(() => {
        if (!searchValue.trim()) return helpDeskSessions

        return helpDeskSessions.filter(session =>
            session.user?.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
            session.user?.email?.toLowerCase().includes(searchValue.toLowerCase()) ||
            session.messages?.some(msg => msg.content?.toLowerCase().includes(searchValue.toLowerCase()))
        )
    }, [helpDeskSessions, searchValue])

    // Calculate statistics
    const stats = {
        total: helpDeskSessions.length,
        active: helpDeskSessions.filter(s => s.status === "ACTIVE").length,
        resolved: helpDeskSessions.filter(s => s.status === "RESOLVED").length,
        pending: helpDeskSessions.filter(s => !s.assistant_id).length,
    }

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    // Handle file selection
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])

        const invalidFiles = files.filter(file => !file.type.startsWith('image/'))
        if (invalidFiles.length > 0) {
            toast.error("Please select only image files")
            return
        }

        const oversizedFiles = files.filter(file => file.size > 5 * 1024 * 1024)
        if (oversizedFiles.length > 0) {
            toast.error("Each file must be less than 5MB")
            return
        }

        const totalFiles = messagePayload.files.length + files.length
        if (totalFiles > 3) {
            toast.error("Maximum 3 images allowed per message")
            return
        }

        setMessagePayload(prev => ({
            ...prev,
            files: [...prev.files, ...files]
        }))

        files.forEach(file => {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewUrls(prev => [...prev, reader.result as string])
            }
            reader.readAsDataURL(file)
        })
    }

    const handleRemoveFile = (index: number) => {
        setMessagePayload(prev => ({
            ...prev,
            files: prev.files.filter((_, i) => i !== index)
        }))
        setPreviewUrls(prev => prev.filter((_, i) => i !== index))
    }

    const handleSend = () => {
        if (!messagePayload.content.trim() && messagePayload.files.length === 0) {
            toast.error("Please enter a message or attach an image")
            return
        }

        if (!selectedSession) {
            toast.error("Please select a session first")
            return
        }

        handleSendMessage({
            content: messagePayload.content,
            files: messagePayload.files,
            sessionId: selectedSession.id
        })

        setMessagePayload({ content: "", files: [] })
        setPreviewUrls([])
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const getSessionUser = (session: Session) => {
        switch (session.source) {
            case SessionSource.WEB:
                return session.user
            case SessionSource.DISCORD:
                return {
                    name: session.discord_username,
                    avatar: session.discord_user_avatar
                }
            case SessionSource.TELEGRAM:
                return {
                    name: session.telegram_username,
                    avatar: session.telegram_user_avatar
                }
            default:
                return null
        }
    }


    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-6 h-6 text-cyan-600" />
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                        Help Desk
                    </h1>
                </div>
                <p className="text-gray-600">
                    Manage live chat sessions with customers
                </p>
            </div>

            {/* Statistics Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Sessions</p>
                                <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                                <MessageSquare className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Active</p>
                                <p className="text-3xl font-bold text-slate-900">{stats.active}</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Pending</p>
                                <p className="text-3xl font-bold text-slate-900">{stats.pending}</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                                <Clock className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Resolved</p>
                                <p className="text-3xl font-bold text-slate-900">{stats.resolved}</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                                <CheckCircle className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Chat Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sessions List - Left Sidebar */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl lg:col-span-1">
                    <CardContent className="p-0">
                        <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-4 rounded-t-xl">
                            <h3 className="text-lg font-bold text-white mb-3">Sessions</h3>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search sessions..."
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                />
                            </div>
                        </div>

                        <div className="max-h-[600px] overflow-y-auto">
                            {filteredSessions.length === 0 ? (
                                <div className="p-8 text-center">
                                    <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                    <p className="text-slate-500">No sessions found</p>
                                </div>
                            ) : (
                                filteredSessions.map((session) => (
                                    <button
                                        key={session.id}
                                        onClick={() => handleSelectSession(session.id)}
                                        className={`w-full p-4 border-b border-slate-200 hover:bg-slate-50 transition-all text-left ${selectedSession?.id === session.id ? "bg-gradient-to-r from-cyan-50 to-teal-50 border-l-4 border-l-cyan-500" : ""
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-full overflow-hidden shadow-md ring-2 ring-slate-200 shrink-0">
                                                <UserAvatar user={getSessionUser(session) as User} className="w-full h-full" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <p className="font-semibold text-slate-900 truncate">{getSessionUser(session)?.name}</p>
                                                    <span className="text-xs text-slate-500">
                                                        {format(new Date(Number(session.created_at)), "HH:mm")}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-slate-600 truncate">
                                                    {session.messages?.[session.messages.length - 1]?.content || "No messages yet"}
                                                </p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <Badge className={session.status === "ACTIVE" ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100" : "bg-slate-100 text-slate-800 hover:bg-slate-100"}>
                                                        {session.status}
                                                    </Badge>
                                                    {!session.assistant_id && (
                                                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                                                            Unassigned
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Chat Area - Right Side */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl lg:col-span-2">
                    <CardContent className="p-0 flex flex-col h-[700px]">
                        {selectedSession ? (
                            <>
                                {/* Chat Header */}
                                <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-4 rounded-t-xl flex items-center justify-between border-b border-slate-600">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg ring-2 ring-white/20">
                                            <UserAvatar user={getSessionUser(selectedSession) as User} className="w-full h-full" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white">{getSessionUser(selectedSession)?.name}</h3>
                                            <p className="text-xs text-slate-300">{getSessionUser(selectedSession)?.name}</p>
                                        </div>
                                    </div>
                                    <Badge className={selectedSession.status === "ACTIVE" ? "bg-emerald-500 text-white hover:bg-emerald-500" : "bg-slate-500 text-white hover:bg-slate-500"}>
                                        {selectedSession.status}
                                    </Badge>
                                </div>

                                {/* Messages Area */}
                                <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-slate-50/50 to-white space-y-4">
                                    {messages.map((message, idx) => {
                                        const isBotOrAssitant = message.role === MessageRole.ASSISTANT || message.role === MessageRole.BOT
                                        return (
                                            <div
                                                key={message.id}
                                                className={`flex ${isBotOrAssitant ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom duration-200`}
                                            >
                                                <div className={`flex items-end gap-2 max-w-[70%] ${isBotOrAssitant ? "flex-row-reverse" : "flex-row"}`}>
                                                    {isBotOrAssitant ? (
                                                        <div className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center shadow-md bg-gradient-to-br from-emerald-400 to-green-500">
                                                            <span className="text-white text-xs font-bold">A</span>
                                                        </div>
                                                    ) : (
                                                        <div className="w-8 h-8 shrink-0 rounded-full overflow-hidden shadow-md ring-2 ring-cyan-200">
                                                            <UserAvatar user={getSessionUser(selectedSession) as User} className="w-full h-full" />
                                                        </div>
                                                    )}

                                                    <div className="space-y-2">
                                                        {message.media && message.media.length > 0 && (
                                                            <div className={`grid ${message.media.length === 1 ? "grid-cols-1" : "grid-cols-2"} gap-2`}>
                                                                {message.media.map((image, index) => (
                                                                    <Image
                                                                        key={index}
                                                                        src={image}
                                                                        width={200}
                                                                        height={200}
                                                                        alt={`Attachment ${index + 1}`}
                                                                        className="w-full h-32 object-cover rounded-lg border border-slate-200 cursor-pointer hover:opacity-75 transition-opacity"
                                                                        onClick={() => window.open(image, '_blank')}
                                                                    />
                                                                ))}
                                                            </div>
                                                        )}
                                                        {message.content && (
                                                            <div className={`rounded-2xl px-4 py-3 ${isBotOrAssitant ? "bg-gradient-to-br from-cyan-600 to-teal-600 text-white rounded-br-sm" : "bg-white border border-slate-200 text-slate-900 rounded-bl-sm shadow-sm"}`}>
                                                                <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
                                                                <div className={`flex items-center gap-1 mt-1 text-xs ${isBotOrAssitant ? "text-cyan-100 justify-end" : "text-slate-500"}`}>
                                                                    <span>{formatDateAndTime(Number(message.created_at))}</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input Area */}
                                <div className="p-4 bg-white border-t border-slate-200 rounded-b-xl">
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
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => fileInputRef.current?.click()}
                                            disabled={messagePayload.files.length >= 3}
                                            className="hover:bg-slate-100 text-slate-600 shrink-0 disabled:opacity-50"
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

                                        <Button
                                            onClick={handleSend}
                                            disabled={!messagePayload.content.trim() && messagePayload.files.length === 0}
                                            className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed shrink-0 h-10 w-10 p-0"
                                        >
                                            <Send className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center">
                                <div className="text-center">
                                    <MessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-slate-900 mb-2">No Session Selected</h3>
                                    <p className="text-slate-500">Select a session from the left to start chatting</p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
