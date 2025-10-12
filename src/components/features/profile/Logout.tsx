"use client"

import { Button } from "@/components/ui/button"
import { LogOut, AlertTriangle } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthService } from "@/services/client/auth/useAuthService"

export default function Logout() {
    const [showConfirmation, setShowConfirmation] = useState(false)
    const router = useRouter()
    const { logout } = useAuthService()

    const handleLogout = async () => {
        try {
            await logout()
            router.push('/login')
        } catch (error) {
            console.error(error)
        }
    }

    if (showConfirmation) {
        return (
            <div className="space-y-6">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                        <AlertTriangle className="w-8 h-8 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Confirm Logout</h2>
                    <p className="text-gray-600 mb-8">Are you sure you want to log out?</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        variant="outline"
                        onClick={() => setShowConfirmation(false)}
                        className="w-full sm:w-auto"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleLogout}
                        className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Yes, Logout
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                    <LogOut className="w-8 h-8 text-orange-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Logout</h2>
                <p className="text-gray-600 mb-8">Are you sure you want to log out?</p>
            </div>

            <div className="max-w-md mx-auto">
                <Button
                    onClick={() => setShowConfirmation(true)}
                    className="w-full bg-green-800 hover:bg-green-700 text-white py-3 rounded-lg font-medium"
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    Yes, Logout
                </Button>
            </div>

            {/* Additional Information */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-8">
                <h3 className="font-medium text-gray-800 mb-2">What happens when you log out?</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                    <li>• You'll be signed out of your account</li>
                    <li>• Your session will be ended</li>
                    <li>• You'll need to sign in again to access your account</li>
                    <li>• Your data will remain safe and secure</li>
                </ul>
            </div>
        </div>
    )
}
