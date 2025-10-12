"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Lock, CheckCircle } from "lucide-react"
import { useState, useCallback } from "react"
import { useUserService } from "@/services/client/user/useUserService"
import { UpdatePasswordRequest } from "@/types/user/user.interface"
import { toast } from "react-toastify"

export default function PasswordManager() {
    const { updatePassword, isLoading } = useUserService()
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isUpdated, setIsUpdated] = useState(false)

    // Password strength indicators
    const getPasswordStrength = (password: string) => {
        if (password.length === 0) return { strength: 0, label: "", color: "" }
        if (password.length < 6) return { strength: 1, label: "Weak", color: "bg-red-500" }
        if (password.length < 8) return { strength: 2, label: "Fair", color: "bg-yellow-500" }
        if (password.length < 10) return { strength: 3, label: "Good", color: "bg-blue-500" }
        return { strength: 4, label: "Strong", color: "bg-green-500" }
    }

    const passwordStrength = getPasswordStrength(newPassword)
    const passwordsMatch = newPassword === confirmPassword && confirmPassword.length > 0

    const handleUpdatePassword = useCallback(async () => {
        // Validate required fields
        if (!currentPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
            toast.error("Please fill in all password fields")
            return
        }

        // Validate password match
        if (!passwordsMatch) {
            toast.error("New passwords do not match")
            return
        }

        // Validate password strength
        const requirements = [
            newPassword.length >= 8,
            /[A-Z]/.test(newPassword),
            /[a-z]/.test(newPassword),
            /\d/.test(newPassword),
            /[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
        ]

        if (!requirements.every(req => req)) {
            toast.error("Password does not meet all requirements")
            return
        }

        try {
            const updateData: UpdatePasswordRequest = {
                old_password: currentPassword,
                new_password: newPassword
            }

            await updatePassword(updateData)
            setIsUpdated(true)
            toast.success("Password updated successfully!")
            
            // Clear form and reset success state after 3 seconds
            setTimeout(() => {
                setCurrentPassword("")
                setNewPassword("")
                setConfirmPassword("")
                setIsUpdated(false)
            }, 3000)
        } catch (error) {
            toast.error((error as Error).message || "Failed to update password")
            console.error("Update password error:", error)
        }
    }, [currentPassword, newPassword, confirmPassword, passwordsMatch, updatePassword])

    const requirements = [
        { text: "At least 8 characters", met: newPassword.length >= 8 },
        { text: "Contains uppercase letter", met: /[A-Z]/.test(newPassword) },
        { text: "Contains lowercase letter", met: /[a-z]/.test(newPassword) },
        { text: "Contains number", met: /\d/.test(newPassword) },
        { text: "Contains special character", met: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) }
    ]

    // Check if form is valid
    const isFormValid = currentPassword.trim() && 
                       newPassword.trim() && 
                       confirmPassword.trim() && 
                       passwordsMatch && 
                       requirements.every(req => req.met)

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Change Password</h2>
                <p className="text-gray-600">Update your password to keep your account secure</p>
            </div>

            {isUpdated && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-800 font-medium">Password updated successfully!</span>
                </div>
            )}

            <div className="space-y-6">
                {/* Current Password */}
                <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password *
                    </label>
                    <div className="relative">
                        <Input
                            id="currentPassword"
                            type={showCurrentPassword ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full border border-gray-300 pr-10"
                            placeholder="Enter your current password"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                            {showCurrentPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                            )}
                        </button>
                    </div>
                </div>

                {/* New Password */}
                <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        New Password *
                    </label>
                    <div className="relative">
                        <Input
                            id="newPassword"
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full border border-gray-300 pr-10"
                            placeholder="Enter your new password"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                            {showNewPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                            )}
                        </button>
                    </div>

                    {/* Password Strength Indicator */}
                    {newPassword.length > 0 && (
                        <div className="mt-2">
                            <div className="flex items-center space-x-2 mb-1">
                                <div className="flex space-x-1">
                                    {[1, 2, 3, 4].map((level) => (
                                        <div
                                            key={level}
                                            className={`h-2 w-8 rounded ${
                                                level <= passwordStrength.strength
                                                    ? passwordStrength.color
                                                    : "bg-gray-200"
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span className={`text-sm font-medium ${
                                    passwordStrength.strength >= 3 ? "text-green-600" : 
                                    passwordStrength.strength >= 2 ? "text-yellow-600" : "text-red-600"
                                }`}>
                                    {passwordStrength.label}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Password Requirements */}
                    {newPassword.length > 0 && (
                        <div className="mt-3 space-y-1">
                            {requirements.map((requirement, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                        requirement.met ? "bg-green-100" : "bg-gray-100"
                                    }`}>
                                        {requirement.met && (
                                            <CheckCircle className="w-3 h-3 text-green-600" />
                                        )}
                                    </div>
                                    <span className={`text-sm ${
                                        requirement.met ? "text-green-600" : "text-gray-500"
                                    }`}>
                                        {requirement.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Confirm Password */}
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password *
                    </label>
                    <div className="relative">
                        <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`w-full border pr-10 ${
                                confirmPassword.length > 0
                                    ? passwordsMatch
                                        ? "border-green-300 bg-green-50"
                                        : "border-red-300 bg-red-50"
                                    : "border-gray-300"
                            }`}
                            placeholder="Confirm your new password"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                            )}
                        </button>
                    </div>
                    {confirmPassword.length > 0 && (
                        <p className={`mt-1 text-sm ${
                            passwordsMatch ? "text-green-600" : "text-red-600"
                        }`}>
                            {passwordsMatch ? "Passwords match" : "Passwords do not match"}
                        </p>
                    )}
                </div>

                {/* Update Button */}
                <div className="pt-4">
                    <Button
                        onClick={handleUpdatePassword}
                        disabled={isLoading || !isFormValid}
                        className="bg-green-800 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        <Lock className="w-4 h-4 mr-2" />
                        {isLoading ? "Updating..." : "Update Password"}
                    </Button>
                </div>

                {/* Security Tips */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-medium text-blue-800 mb-2">Security Tips</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Use a unique password that you don't use elsewhere</li>
                        <li>• Consider using a password manager</li>
                        <li>• Change your password regularly</li>
                        <li>• Never share your password with anyone</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
