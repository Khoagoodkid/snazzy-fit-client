"use client"

import { Message } from "./mockData"
import { formatDateAndTime } from "@/utils/handleConvertTimestamp"
import Image from "next/image"
import { useAppSelector } from "@/lib/hooks"

interface MessageDisplayProps {
    messages: Message[]
}

export default function MessageDisplay({ messages }: MessageDisplayProps) {
    const { user } = useAppSelector((state) => state.auth)

    return (
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">No messages yet. Start the conversation!</p>
                </div>
            ) : (
                messages.map((message) => {
                    const isCurrentUser = message.sender_type === "USER"
                    
                    return (
                        <div
                            key={message.id}
                            className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[70%] ${isCurrentUser ? 'order-2' : 'order-1'}`}>
                                {/* Sender Name */}
                                <div className={`flex items-center gap-2 mb-1 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                                    {!isCurrentUser && (
                                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                            <span className="text-white text-xs font-semibold">SA</span>
                                        </div>
                                    )}
                                    <span className="text-xs text-gray-600 font-medium">
                                        {isCurrentUser ? 'You' : 'Support Agent'}
                                    </span>
                                    {isCurrentUser && (
                                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                                            <span className="text-white text-xs font-semibold">
                                                {user?.name?.charAt(0).toUpperCase() || 'U'}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Message Bubble */}
                                <div
                                    className={`rounded-lg p-4 ${
                                        isCurrentUser
                                            ? 'bg-green-600 text-white'
                                            : 'bg-gray-100 text-gray-800'
                                    }`}
                                >
                                    <p className="text-sm whitespace-pre-wrap break-words">
                                        {message.message}
                                    </p>

                                    {/* Images */}
                                    {message.images && message.images.length > 0 && (
                                        <div className="mt-3 grid grid-cols-2 gap-2">
                                            {message.images.map((image, index) => (
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
                                </div>

                                {/* Timestamp */}
                                <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mt-1`}>
                                    <span className="text-xs text-gray-500">
                                        {formatDateAndTime(new Date(message.created_at).getTime())}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                })
            )}
        </div>
    )
}

