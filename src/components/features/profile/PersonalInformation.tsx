"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Edit3, User, CheckCircle, Upload } from "lucide-react"
import { useState, useCallback, useRef, use, useEffect, useMemo } from "react"
import { useUserService } from "@/services/client/user/useUserService"
import { UpdateUserRequest } from "@/types/user/user.interface"
import { toast } from "react-toastify"
import { useAppSelector } from "@/lib/hooks"
import { setCredentials } from "@/lib/features/auth/authSlice"
import { useAppDispatch } from "@/lib/hooks"

export default function PersonalInformation() {
    const { updateUser, isLoading } = useUserService()
    const { user } = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [userInfo, setUserInfo] = useState<UpdateUserRequest>({
        name: user?.name || "",
        phone: user?.phone || "",
        gender: user?.gender || "Male"
    })
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string>(user?.avatar || "")
    const [isUpdated, setIsUpdated] = useState(false)

    useEffect(() => {
        if (user) {
            console.log(user)
            setUserInfo({
                name: user?.name || "",
                phone: user?.phone || "",
                gender: user?.gender || "Male"
            })
        }
    }, [user])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setUserInfo(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                toast.error("Please select an image file")
                return
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.error("File size must be less than 5MB")
                return
            }

            setSelectedFile(file)

            // Create preview URL
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleEditAvatarClick = () => {
        fileInputRef.current?.click()
    }

    const handleRemoveAvatar = () => {
        setSelectedFile(null)
        setPreviewUrl("")
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const handleUpdate = useCallback(async () => {
        // Validate required fields
        if (!userInfo.name.trim() || !userInfo.gender) {
            toast.error("Please fill in all required fields")
            return
        }

        try {
            const updateData: UpdateUserRequest = {
                name: userInfo.name.trim(),
                phone: userInfo.phone.trim(),
                gender: userInfo.gender
            }

            // Only include file if one is selected
            if (selectedFile) {
                updateData.file = selectedFile
            }

            const response = await updateUser(updateData)
            dispatch(setCredentials({
                user: response.data,
            }))

            // Update preview URL with the new avatar from response
            if (response.data.avatar) {
                setPreviewUrl(response.data.avatar)
            }

            // Clear selected file after successful update
            setSelectedFile(null)
            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }

            setIsUpdated(true)
            toast.success("Profile updated successfully!")

            // Reset success state after 3 seconds
            setTimeout(() => {
                setIsUpdated(false)
            }, 3000)
        } catch (error) {
            toast.error((error as Error).message || "Failed to update profile")
            console.error("Update user error:", error)
        }
    }, [userInfo, selectedFile, updateUser, dispatch])



    const changed = useMemo(() => {
        return userInfo.name !== user?.name || userInfo.gender !== user?.gender || userInfo.phone !== user?.phone || selectedFile !== null
    }, [userInfo, user, selectedFile])

    return (
        <div className="space-y-6">
            {/* Success Message */}
            {isUpdated && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-800 font-medium">Profile updated successfully!</span>
                </div>
            )}

            {/* Profile Picture Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="relative">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                        {previewUrl ? (
                            <img
                                src={previewUrl}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <User className="w-12 h-12 text-gray-400" />
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={handleEditAvatarClick}
                        className="absolute bottom-0 right-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                    >
                        <Edit3 className="w-4 h-4 text-white" />
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                    />
                </div>
                <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-800">Profile Picture</h2>
                    <p className="text-sm text-gray-600 mb-2">Click the edit button to change your profile picture</p>
                    <p className="text-xs text-gray-500">Allowed: JPG, PNG, GIF. Max size: 5MB</p>
                    {selectedFile && (
                        <div className="mt-2 flex items-center space-x-2">
                            <span className="text-sm text-green-600">✓ New image selected: {selectedFile.name}</span>
                            <button
                                type="button"
                                onClick={handleRemoveAvatar}
                                className="text-xs text-red-600 hover:text-red-800 underline"
                            >
                                Remove
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Form Section */}
            <div className="space-y-6">
                {/* First Name */}
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        Name *
                    </label>
                    <Input
                        id="firstName"
                        name="name"
                        type="text"
                        value={userInfo.name}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300"
                        placeholder="Ex. John"
                    />
                </div>



                {/* Phone */}
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone (Optional)
                    </label>
                    <Input
                        id="phone"
                        name="phone"
                        type="text"
                        value={userInfo.phone}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300"
                        placeholder="Enter your phone number"
                    />
                </div>

                {/* Gender */}
                <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                        Gender *
                    </label>
                    <select
                        id="gender"
                        name="gender"
                        value={userInfo.gender}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <Button
                        onClick={handleUpdate}
                        disabled={isLoading || !changed}
                        className="bg-green-800 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Updating..." : "Update Changes"}
                    </Button>

                </div>
            </div>
        </div>
    )
}
