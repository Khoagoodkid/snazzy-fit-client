"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import GoogleIcon from "@/components/icons/GoogleIcon"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuthService } from "@/services/client/auth/useAuthService"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import ErrorMessage from "@/components/ui/errorMessage"
import { loginSchema } from "@/lib/scheme/authScheme"
// Zod schema for login validation


type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
    const { login, isLoading } = useAuthService()
    const router = useRouter()
    const [showPassword, setShowPassword] = useState<boolean>(false)

    // Initialize React Hook Form with Zod resolver
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    // Watch email field for character count
    const emailValue = watch("email")

    const onSubmit = async (data: LoginFormData) => {

        try {
            console.log("Login attempt:", data)

            const response = await login(data)

            router.push("/")
        } catch (error) {
            toast.error((error as Error).message)
        }
    }
    return (
        <div className="max-w-md w-full space-y-8">
            {/* Sign in Title */}
            <h2 className="text-3xl font-bold text-gray-900 text-center">
                Sign in
            </h2>

            {/* Login Form */}
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                {/* Email Field */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                    </label>
                    <div className="relative">
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            maxLength={50}
                            suffix={<div className="text-xs text-gray-400">
                                {emailValue?.length || 0}/50
                            </div>}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                                }`}
                            {...register("email")}
                        />
                        <ErrorMessage message={errors.email?.message} />
                    </div>
                </div>

                {/* Password Field */}
                <div>
                    <div className="flex items-center justify-between mb-1">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                            Forgot password?
                        </a>
                    </div>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            suffix={<button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>}
                            className={`w-full px-3 py-2 pr-10 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                                }`}
                            {...register("password")}
                        />
                        <ErrorMessage message={errors.password?.message} />
                    </div>
                </div>


                {/* Sign in Button */}
                <div>
                    <Button
                        type="submit"
                        disabled={isSubmitting || isLoading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting || isLoading ? "Signing in..." : "Sign in"}
                    </Button>
                </div>
            </form>

            {/* Separator */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">or</span>
                </div>
            </div>

            {/* Google Sign in Button */}
            <div>
                <Button
                    type="button"
                    className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    {/* Google Logo */}
                    <GoogleIcon className="mr-2" />
                    Sign in with Google
                </Button>
            </div>

            {/* Sign up link */}
            <div className="text-center">
                <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <a href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                        Sign up for free
                    </a>
                </p>
            </div>
        </div>
    )
}