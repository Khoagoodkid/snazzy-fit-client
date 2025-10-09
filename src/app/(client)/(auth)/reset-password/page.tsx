"use client"

import { useAuthService } from "@/services/client/auth/useAuthService";
import ErrorMessage from "@/components/ui/errorMessage";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/lib/scheme/authScheme";
import { ResetPasswordFormData } from "@/types/auth/auth.interface";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function ResetPassword() {
    const { resetPassword } = useAuthService();
    const searchParams = useSearchParams();
    const token = searchParams.get("token") as string;
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
            token,
        }
    })
    const passwordValue = watch("password")
    const confirmPasswordValue = watch("confirmPassword")
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
    const onSubmit = async (data: ResetPasswordFormData) => {
        try {
            await resetPassword(data)
            toast.success("Password reset successfully")
            router.push("/login")
        } catch (error) {
            toast.error((error as Error).message)
        }
    }
    return (
        <div className="max-w-md w-full space-y-8">
            {/* Sign in Title */}
            <h2 className="text-3xl font-bold text-gray-900 text-center">
                Reset Password
            </h2>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                {/* Password Field */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password *
                    </label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={passwordValue}
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
                        Confirm Password *
                    </label>
                    <div className="relative">
                        <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Enter your confirm password"
                            value={confirmPasswordValue}
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

                {/* Reset Password Button */}
                <div>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Resetting..." : "Reset Password"}
                    </Button>
                </div>
            </form >
        </div>
    )
}