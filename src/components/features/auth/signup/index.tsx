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
import { signUpSchema } from "@/lib/scheme/authScheme"

type SignupFormData = z.infer<typeof signUpSchema>

export default function SignupPage() {
    const { signup, isLoading } = useAuthService()
    const router = useRouter()
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

    // Initialize React Hook Form with Zod resolver
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch
    } = useForm<SignupFormData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            agreeToTerms: false
        }
    })

    // Watch fields for character counts
    const usernameValue = watch("username")
    const emailValue = watch("email")

    const onSubmit = async (data: SignupFormData) => {
        try {
            console.log("Signup attempt:", data)

            await signup(data)

            toast.success("Đăng ký thành công!")
            router.push("/login")
        } catch (error) {
            toast.error((error as Error).message)
        }
    }

    return (
        <div className="max-w-md w-full space-y-8">
            {/* Sign up Title */}
            <h2 className="text-3xl font-bold text-gray-900 text-center">
                Đăng ký tài khoản
            </h2>

            {/* Signup Form */}
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                {/* Name Field */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Họ và tên *
                    </label>
                    <div className="relative">
                        <Input
                            id="username"
                            type="text"
                            placeholder="Nhập họ và tên của bạn"
                            maxLength={50}
                            suffix={<div className="text-xs text-gray-400">
                                {usernameValue?.length || 0}/50
                            </div>}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.username ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                                }`}
                            {...register("username")}
                        />
                        <ErrorMessage message={errors.username?.message} />
                    </div>
                </div>

                {/* Email Field */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                    </label>
                    <div className="relative">
                        <Input
                            id="email"
                            type="email"
                            placeholder="Nhập địa chỉ email của bạn"
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
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Mật khẩu *
                    </label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Nhập mật khẩu của bạn"
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

                {/* Confirm Password Field */}
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Xác nhận mật khẩu *
                    </label>
                    <div className="relative">
                        <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Nhập lại mật khẩu"
                            suffix={<button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>}
                            className={`w-full px-3 py-2 pr-10 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                                }`}
                            {...register("confirmPassword")}
                        />
                        <ErrorMessage message={errors.confirmPassword?.message} />
                    </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input
                            id="agreeToTerms"
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                            {...register("agreeToTerms")}
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="agreeToTerms" className="text-gray-700">
                            Tôi đồng ý với{" "}
                            <a href="#" className="text-blue-600 hover:text-blue-500 underline">
                                Điều khoản sử dụng
                            </a>{" "}
                            và{" "}
                            <a href="#" className="text-blue-600 hover:text-blue-500 underline">
                                Chính sách bảo mật
                            </a>
                        </label>
                        <ErrorMessage message={errors.agreeToTerms?.message} />
                    </div>
                </div>

                {/* Sign up Button */}
                <div>
                    <Button
                        type="submit"
                        disabled={isSubmitting || isLoading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting || isLoading ? "Đang đăng ký..." : "Đăng ký"}
                    </Button>
                </div>
            </form>

            {/* Separator */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">hoặc</span>
                </div>
            </div>

            {/* Google Sign up Button */}
            <div>
                <Button
                    type="button"
                    className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    {/* Google Logo */}
                    <GoogleIcon className="mr-2" />
                    Đăng ký với Google
                </Button>
            </div>

            {/* Sign in link */}
            <div className="text-center">
                <p className="text-sm text-gray-600">
                    Đã có tài khoản?{" "}
                    <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                        Đăng nhập ngay
                    </a>
                </p>
            </div>
        </div>
    )
}
