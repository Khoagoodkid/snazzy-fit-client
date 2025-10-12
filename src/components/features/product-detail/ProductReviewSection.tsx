"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Star, Upload, X, Edit, Trash2, Camera } from "lucide-react"
import { toast } from "react-toastify"
import useProductReviewService from "@/services/client/product-review/useProductReviewService"
import { ProductReview, CreateProductReviewRequest, UpdateProductReviewRequest } from "@/types/product-review/product-review.interface"
import { Order, OrderStatus } from "@/types/order/order.interface"
import { useOrderService } from "@/services/client/order/useOrderService"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { formatDateAndTime } from "@/utils/handleConvertTimestamp"
import UserAvatar from "@/components/ui/user-avatar"
import Image from "next/image"
import { showAlert } from "@/lib/features/alert/alertSlice"

interface ProductReviewSectionProps {
    productId: string
}

export default function ProductReviewSection({ productId }: ProductReviewSectionProps) {
    const { user } = useAppSelector((state) => state.auth)
    const { getProductReviews, createProductReview, updateProductReview, deleteProductReview, isLoading } = useProductReviewService()
    const { getOrders } = useOrderService()

    const [reviews, setReviews] = useState<ProductReview[]>([])
    const [userOrders, setUserOrders] = useState<Order[]>([])
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [editingReview, setEditingReview] = useState<ProductReview | null>(null)

    // Form states
    const [selectedOrderItem, setSelectedOrderItem] = useState<string>("")
    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState("")
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const [previewUrls, setPreviewUrls] = useState<string[]>([])
    const [previousImages, setPreviousImages] = useState<string[]>([])

    const fileInputRef = useRef<HTMLInputElement>(null)
    const dispatch = useAppDispatch()


    // Fetch reviews
    const handleGetReviews = useCallback(async () => {
        try {
            const response = await getProductReviews(productId)
            setReviews(response.data)
        } catch (error) {
            toast.error((error as Error).message || "Failed to load reviews")
        }
    }, [getProductReviews, productId])

    // Fetch user orders
    const handleGetUserOrders = useCallback(async () => {
        try {
            const response = await getOrders()
            // Filter orders that contain this product
            console.log("1", response.data)
            const ordersWithProduct = response.data.filter((order) => order.status === OrderStatus.PAID).filter((order) =>
                order.items.some((item) => item.variant.product_id === productId)
            )
            setUserOrders(ordersWithProduct)
        } catch (error) {
            console.error("Failed to load orders:", error)
        }
    }, [getOrders, productId])

    useEffect(() => {
        handleGetReviews()
        if (user) {
            handleGetUserOrders()
        }
    }, [handleGetReviews, handleGetUserOrders, user])

    // Render stars
    const renderStars = (count: number, interactive: boolean = false, onRate?: (rating: number) => void) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-5 h-5 ${i < count
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                    } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
                onClick={() => interactive && onRate && onRate(i + 1)}
            />
        ))
    }

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
        const totalFiles = selectedFiles.length + files.length
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

    // Reset form
    const resetForm = () => {
        setSelectedOrderItem("")
        setRating(5)
        setComment("")
        setSelectedFiles([])
        setPreviewUrls([])
        setPreviousImages([])
        setShowCreateForm(false)
        setEditingReview(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    // Create review
    const handleCreateReview = useCallback(async () => {
        if (!selectedOrderItem) {
            toast.error("Please select an order item")
            return
        }

        if (!comment.trim()) {
            toast.error("Please write a comment")
            return
        }

        try {
            const orderItem = userOrders
                .flatMap(order => order.items)
                .find(item => item.id === selectedOrderItem)

            if (!orderItem) {
                toast.error("Order item not found")
                return
            }

            const reviewData: CreateProductReviewRequest = {
                product_id: productId,
                rating,
                comment: comment.trim(),
            }

            if (selectedFiles.length > 0) {
                reviewData.files = selectedFiles
            }

            await createProductReview(reviewData)
            toast.success("Review created successfully!")
            handleGetReviews()
            resetForm()
        } catch (error) {
            toast.error((error as Error).message || "Failed to create review")
        }
    }, [selectedOrderItem, comment, rating, selectedFiles, userOrders, productId, createProductReview, handleGetReviews])

    // Edit review
    const handleStartEdit = (review: ProductReview) => {
        setEditingReview(review)
        setRating(review.rating)
        setComment(review.comment)
        setPreviousImages(review.images || [])
        setShowCreateForm(false)
    }

    // Update review
    const handleUpdateReview = useCallback(async () => {
        if (!editingReview) return

        if (!comment.trim()) {
            toast.error("Please write a comment")
            return
        }

        try {
            const reviewData: UpdateProductReviewRequest = {
                id: editingReview.id,
                rating,
                comment: comment.trim(),
                previous_images: previousImages,
            }

            if (selectedFiles.length > 0) {
                reviewData.files = selectedFiles
            }

            if (editingReview.variant_id) {
                reviewData.variant_id = editingReview.variant_id
            }

            await updateProductReview(reviewData)
            toast.success("Review updated successfully!")
            handleGetReviews()
            resetForm()
        } catch (error) {
            toast.error((error as Error).message || "Failed to update review")
        }
    }, [editingReview, comment, rating, selectedFiles, previousImages, updateProductReview, handleGetReviews])

    // Delete review
    const handleDeleteReview = useCallback(async (reviewId: string) => {
        dispatch(showAlert({
            title: "Delete Review",
            message: "Are you sure you want to delete this review?",
            type: "warning",
            onConfirm: async () => {

                try {
                    await deleteProductReview(reviewId)
                    toast.success("Review deleted successfully!")
                    handleGetReviews()
                } catch (error) {
                    toast.error((error as Error).message || "Failed to delete review")
                }
            }
        }))

    }, [deleteProductReview, handleGetReviews])

    // Check if user can create review
    const userHasReview = reviews.some(review => review.user_id === user?.id)
    const canCreateReview = user && userOrders.length > 0 &&
        userOrders.some(order => order.status === OrderStatus.PAID && order.items.some(item => item.variant.product_id === productId)) &&
        !userHasReview

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-800">
                        Customer Reviews ({reviews.length})
                    </h3>
                    <p className="text-sm text-red-400 font-bold">Note: You are allowed to write a review only once and when you purchased the product.</p>
                </div>
                {canCreateReview && !showCreateForm && !editingReview && (
                    <Button
                        onClick={() => setShowCreateForm(true)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                    >
                        Write a Review
                    </Button>
                )}
            </div>

            {/* Create Review Form */}
            {showCreateForm && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-gray-800">Write Your Review</h4>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={resetForm}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Select Order Item */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Your Purchase *
                        </label>
                        <select
                            value={selectedOrderItem}
                            onChange={(e) => setSelectedOrderItem(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            <option value="">Choose an order...</option>
                            {userOrders.map((order) =>
                                order.items
                                    .filter(item => item.variant.product_id === productId)
                                    .map((item) => (
                                        <option key={item.id} value={item.id}>
                                            Order #{order.id.slice(0, 8)} - {item.variant.product?.name}
                                            {item.variant.color && ` (${item.variant.color} - ${item.variant.size})`}
                                        </option>
                                    ))
                            )}
                        </select>
                    </div>

                    {/* Rating */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Rating *
                        </label>
                        <div className="flex gap-1">
                            {renderStars(rating, true, setRating)}
                        </div>
                    </div>

                    {/* Comment */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Review *
                        </label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="Share your experience with this product..."
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Add Photos (Optional)
                        </label>
                        <div className="space-y-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full"
                            >
                                <Camera className="w-4 h-4 mr-2" />
                                Upload Images (Max 5)
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
                                        <img
                                            src={url}
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

                    {/* Submit Button */}
                    <div className="flex gap-2">
                        <Button
                            onClick={handleCreateReview}
                            disabled={isLoading}
                            className="bg-green-600 hover:bg-green-700 text-white"
                        >
                            {isLoading ? "Submitting..." : "Submit Review"}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={resetForm}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            )}

            {/* Edit Review Form */}
            {editingReview && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-gray-800">Edit Your Review</h4>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={resetForm}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Rating */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Rating *
                        </label>
                        <div className="flex gap-1">
                            {renderStars(rating, true, setRating)}
                        </div>
                    </div>

                    {/* Comment */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Review *
                        </label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                            placeholder="Share your experience with this product..."
                        />
                    </div>

                    {/* Previous Images */}
                    {previousImages.length > 0 && (
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
                                            alt={`Review ${index + 1}`}
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

                    {/* Add New Images */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Add New Photos (Optional)
                        </label>
                        <div className="space-y-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full"
                            >
                                <Camera className="w-4 h-4 mr-2" />
                                Upload More Images
                            </Button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileSelect}
                                className="hidden"
                            />
                        </div>

                        {/* New Image Previews */}
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

                    {/* Submit Button */}
                    <div className="flex gap-2">
                        <Button
                            onClick={handleUpdateReview}
                            disabled={isLoading}
                            className="bg-green-600 hover:bg-green-700 text-white"
                        >
                            {isLoading ? "Updating..." : "Update Review"}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={resetForm}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
                {reviews.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
                    </div>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} className="border border-gray-200 rounded-lg p-6 space-y-4">
                            {/* Review Header */}
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-4">
                                    {/* User Avatar */}
                                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                                        {review.user?.avatar ? (
                                            <UserAvatar user={review.user} />
                                        ) : (
                                            <span className="text-gray-600 font-semibold text-lg">
                                                {review.user?.name?.charAt(0).toUpperCase()}
                                            </span>
                                        )}
                                    </div>

                                    <div>
                                        <h5 className="font-semibold text-gray-800">{review.user?.name}</h5>
                                        <p className="text-sm text-gray-500">{formatDateAndTime(Number(review.created_at))}</p>
                                        {review.variant && (
                                            <p className="text-xs text-gray-500 mt-1">
                                                Purchased: {review.variant.color} - {review.variant.size}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Action Buttons (if user's own review) */}
                                {user?.id === review.user_id && !editingReview && (
                                    <div className="flex gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleStartEdit(review)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDeleteReview(review.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {/* Rating */}
                            <div className="flex gap-1">
                                {renderStars(review.rating)}
                            </div>

                            {/* Comment */}
                            <p className="text-gray-700">{review.comment}</p>

                            {/* Review Images */}
                            {review.images && review.images.length > 0 && (
                                <div className="grid grid-cols-4 gap-2">
                                    {review.images.map((image, index) => (
                                        <Image
                                            key={index}
                                            src={image}
                                            alt={`Review ${index + 1}`}
                                            width={1000}
                                            height={1000}
                                            className="w-full h-full object-cover rounded-lg border border-gray-300 cursor-pointer hover:opacity-75 transition-opacity"
                                            onClick={() => window.open(image, '_blank')}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

