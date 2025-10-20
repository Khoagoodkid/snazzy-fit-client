"use client"

import { Message, MessageRole } from "@/types/session/session.interface"
import { formatDateAndTime } from "@/utils/handleConvertTimestamp"
import Image from "next/image"
import { useAppSelector } from "@/lib/hooks"
import UserAvatar from "@/components/ui/user-avatar"

interface MessageDisplayProps {
    messages: Message[]
}

export default function MessageDisplay({ messages }: MessageDisplayProps) {
    const { user } = useAppSelector((state) => state.auth)

    return (
        <>
            {
                messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">No messages yet. Start the conversation!</p>
                    </div>
                ) : (
                    messages.map((message) => {
                        const isCurrentUser = message.role === MessageRole.USER

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
                                            <UserAvatar user={user!} className="w-8 h-8" />
                                        )}
                                    </div>

                                    {/* Message Bubble */}
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
                                    {message.content && (
                                        <div
                                            className={`mt-5 rounded-lg p-4 ${isCurrentUser
                                                ? 'bg-green-600 text-white'
                                                : 'bg-gray-100 text-gray-800'
                                                }`}
                                        >
                                            <p className="text-sm whitespace-pre-wrap break-words">
                                                {message.content}
                                            </p>

                                        </div>
                                    )}

                                    {/* Timestamp */}
                                    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mt-1`}>
                                        <span className="text-xs text-gray-500">
                                            {formatDateAndTime(Number(message.created_at))}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )
            }
        </>
    )
}

