"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Camera } from "lucide-react"
import { toast } from "react-toastify"
import { TicketType } from "@/types/customer-support/customer-support.interface"
import { Order } from "@/types/order/order.interface"
import Image from "next/image"

interface TicketFormProps {
    isEdit?: boolean
    initialData?: {
        title: string
        description: string
        type: TicketType
        tags: string[]
        order_id?: string
        images?: string[]
    }
    userOrders: Order[]
    onSubmit: (data: {
        title: string
        description: string
        type: TicketType
        tags: string[]
        order_id?: string
        files?: File[]
        previous_images: string[]
    }) => void
    onCancel: () => void
    isLoading: boolean
}

export default function TicketForm({
    isEdit = false,
    initialData,
    userOrders,
    onSubmit,
    onCancel,
    isLoading
}: TicketFormProps) {
    const [title, setTitle] = useState(initialData?.title || "")
    const [description, setDescription] = useState(initialData?.description || "")
    const [type, setType] = useState<TicketType>(initialData?.type || TicketType.GENERAL)
    const [tags, setTags] = useState<string[]>(initialData?.tags || [])
    const [tagInput, setTagInput] = useState("")
    const [orderId, setOrderId] = useState(initialData?.order_id || "")
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const [previewUrls, setPreviewUrls] = useState<string[]>([])
    const [previousImages, setPreviousImages] = useState<string[]>(initialData?.images || [])

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

        // Limit total files to 5
        const totalFiles = selectedFiles.length + files.length + previousImages.length
        if (totalFiles > 5) {
            toast.error("Maximum 5 images allowed")
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

    // Remove previous image (for edit)
    const handleRemovePreviousImage = (image: string) => {
        setPreviousImages(prev => prev.filter(img => img !== image))
    }

    // Add tag
    const handleAddTag = () => {
        const trimmedTag = tagInput.trim()
        if (trimmedTag && !tags.includes(trimmedTag)) {
            setTags(prev => [...prev, trimmedTag])
            setTagInput("")
        }
    }

    // Remove tag
    const handleRemoveTag = (tagToRemove: string) => {
        setTags(prev => prev.filter(tag => tag !== tagToRemove))
    }

    // Handle key press in tag input
    const handleTagInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleAddTag()
        }
    }

    // Handle submit
    const handleSubmit = () => {
        if (!title.trim()) {
            toast.error("Please enter a title")
            return
        }

        if (!description.trim()) {
            toast.error("Please enter a description")
            return
        }

        const submitData = {
            title: title.trim(),
            description: description.trim(),
            type,
            tags,
            order_id: orderId || undefined,
            files: selectedFiles.length > 0 ? selectedFiles : undefined,
            previous_images: isEdit ? previousImages : []
        }

        onSubmit(submitData)
    }

    return (
        <div className={`${isEdit ? 'bg-yellow-50 border-yellow-200' : 'bg-blue-50 border-blue-200'} border rounded-lg p-6 space-y-4`}>
            <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-800">
                    {isEdit ? 'Edit Ticket' : 'Create New Ticket'}
                </h4>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onCancel}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <X className="w-5 h-5" />
                </Button>
            </div>

            {/* Title */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                </label>
                <Input
                    value={title}
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-300"
                    placeholder="Brief title for your issue..."
                />
            </div>

            {/* Type */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type *
                </label>
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value as TicketType)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    <option value={TicketType.GENERAL}>General</option>
                    <option value={TicketType.SUPPORT}>Support</option>
                    <option value={TicketType.REVIEW}>Review</option>
                    <option value={TicketType.COMPLAINT}>Complaint</option>
                    <option value={TicketType.OTHER}>Other</option>
                </select>
            </div>

            {/* Order Selection */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Related Order (Optional)
                </label>
                <select
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    <option value="">No related order</option>
                    {userOrders.map((order) => (
                        <option key={order.id} value={order.id}>
                            Order #{order.id.slice(0, 8)} - ${order.total_amount.toFixed(2)} ({order.status})
                        </option>
                    ))}
                </select>
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                </label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Describe your issue in detail..."
                />
            </div>

            {/* Tags */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (Optional)
                </label>
                <div className="flex gap-2 mb-2">
                    <Input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        type="text"
                        onKeyPress={handleTagInputKeyPress}
                        className="flex-1 border border-gray-300"
                        placeholder="Add a tag..."
                    />
                    <Button
                        type="button"
                        onClick={handleAddTag}
                        variant="outline"
                    >
                        Add
                    </Button>
                </div>
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                            >
                                {tag}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveTag(tag)}
                                    className="hover:text-green-900"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Previous Images (for edit) */}
            {isEdit && previousImages.length > 0 && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Images
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                        {previousImages.map((image, index) => (
                            <div key={index} className="relative group">
                                <Image
                                    width={1000}
                                    height={1000}
                                    src={image}
                                    alt={`Ticket ${index + 1}`}
                                    className="w-full h-full object-cover rounded-lg border border-gray-300"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemovePreviousImage(image)}
                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Image Upload */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isEdit ? 'Add New Images' : 'Attach Images'} (Optional)
                </label>
                <div className="space-y-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full"
                    >
                        <Camera className="w-4 h-4 mr-2" />
                        Upload Images (Max 5 total)
                    </Button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileSelect}
                        className="hidden"
                    />
                    <p className="text-xs text-gray-500">JPG, PNG, GIF. Max 5MB each.</p>
                </div>

                {/* Image Previews */}
                {previewUrls.length > 0 && (
                    <div className="grid grid-cols-5 gap-2 mt-3">
                        {previewUrls.map((url, index) => (
                            <div key={index} className="relative group">
                                <Image
                                    src={url}
                                    width={1000}
                                    height={1000}
                                    alt={`Preview ${index + 1}`}
                                    className="w-full h-full object-cover rounded-lg border border-gray-300"
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
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-2 pt-2">
                <Button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="bg-green-600 hover:bg-green-700 text-white"
                >
                    {isLoading ? (isEdit ? "Updating..." : "Creating...") : (isEdit ? "Update Ticket" : "Create Ticket")}
                </Button>
                <Button
                    variant="outline"
                    onClick={onCancel}
                    disabled={isLoading}
                >
                    Cancel
                </Button>
            </div>
        </div>
    )
}

