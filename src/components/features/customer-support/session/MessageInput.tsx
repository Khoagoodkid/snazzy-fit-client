"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Send, Paperclip, X } from "lucide-react"
import { toast } from "react-toastify"
import Image from "next/image"

interface MessageInputProps {
    onSendMessage: (message: string, files?: File[]) => void
    isLoading?: boolean
}

export default function MessageInput({ onSendMessage, isLoading = false }: MessageInputProps) {
    const [message, setMessage] = useState("")
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const [previewUrls, setPreviewUrls] = useState<string[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)

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
        const totalFiles = selectedFiles.length + files.length
        if (totalFiles > 3) {
            toast.error("Maximum 3 images allowed per message")
            return
        }

        setSelectedFiles(prev => [...prev, ...files])

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
        setSelectedFiles(prev => prev.filter((_, i) => i !== index))
        setPreviewUrls(prev => prev.filter((_, i) => i !== index))
    }

    // Handle send message
    const handleSend = () => {
        if (!message.trim() && selectedFiles.length === 0) {
            toast.error("Please enter a message or attach an image")
            return
        }

        onSendMessage(message.trim(), selectedFiles.length > 0 ? selectedFiles : undefined)
        
        // Reset form
        setMessage("")
        setSelectedFiles([])
        setPreviewUrls([])
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    // Handle key press
    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className="border-t border-gray-200 bg-white p-4">
            {/* Image Previews */}
            {previewUrls.length > 0 && (
                <div className="mb-3 flex gap-2">
                    {previewUrls.map((url, index) => (
                        <div key={index} className="relative group">
                            <Image
                                src={url}
                                width={1000}
                                height={1000}
                                alt={`Preview ${index + 1}`}
                                className="w-20 h-20 object-cover rounded border border-gray-300"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveFile(index)}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Input Area */}
            <div className="flex items-center gap-2">
                {/* Attach Button */}
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading || selectedFiles.length >= 3}
                    className="shrink-0"
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

                {/* Message Input */}
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
                    disabled={isLoading}
                    rows={1}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent max-h-32 overflow-y-auto"
                    style={{ minHeight: '48px' }}
                />

                {/* Send Button */}
                <Button
                    onClick={handleSend}
                    disabled={isLoading || (!message.trim() && selectedFiles.length === 0)}
                    className="bg-green-600 hover:bg-green-700 text-white shrink-0"
                    size="icon"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <Send className="w-5 h-5" />
                    )}
                </Button>
            </div>

            {/* Helper Text */}
            <p className="text-xs text-gray-500 mt-2">
                Max 3 images per message. JPG, PNG, GIF. Max 5MB each.
            </p>
        </div>
    )
}

