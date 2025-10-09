"use client"

import { useAuthService } from "@/services/client/auth/useAuthService";
import ErrorMessage from "@/components/ui/errorMessage";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordRequestSchema } from "@/lib/scheme/authScheme";
import { ChangePasswordRequestFormData } from "@/types/auth/auth.interface";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import Link from "next/link";

export default function ChangePassword() {
    const { changePasswordRequest } = useAuthService();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch
    } = useForm<ChangePasswordRequestFormData>({
        resolver: zodResolver(changePasswordRequestSchema),
        defaultValues: {
            email: "",
        }
    })
    const emailValue = watch("email")

    const onSubmit = async (data: ChangePasswordRequestFormData) => {
        try {
            await changePasswordRequest(data)
            toast.success("Password reset request link sent successfully. Please check your email for the link.")
        } catch (error) {
            toast.error((error as Error).message)
        }
    }
    return (
        <div className="max-w-md w-full space-y-8">
            {/* Sign in Title */}
            <h2 className="text-3xl font-bold text-gray-900 text-center">
                Change Password
            </h2>
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

                {/* Change Password Button */}
                <div className="space-y-2">
                    <Button
                        type="button"
                        className="w-full flex justify-center py-2 px-4 bg-transparent text-black hover:bg-gray-100">
                        <Link href="/login">Back to Login</Link>
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Sending..." : "Send Reset Password Link"}
                    </Button>
                </div>
            </form >
        </div>
    )
}