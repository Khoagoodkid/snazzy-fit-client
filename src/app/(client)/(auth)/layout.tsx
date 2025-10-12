"use client"

import Page from "@/components/features/app/Page"
import { useAppSelector } from "@/lib/hooks"
import { RootState } from "@/lib/store"
import Image from "next/image"
import { ShoppingBag, TrendingUp, Zap, Star } from "lucide-react"
import { redirect } from "next/navigation"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const { user } = useAppSelector((state: RootState) => state.auth)

    if (user) {
        redirect("/")
    }

    return (
        <Page
            isShowHeader={false}
            isShowFooter={false}
            className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100"
        >
            <div className="min-h-screen flex">
                {/* Left Side - Modern Visual Section */}
                <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden">
                    {/* Animated Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyek0zNCAzMGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
                    </div>

                    {/* Main Fashion Image */}
                    <div className="absolute inset-0 mix-blend-overlay opacity-30">
                        <Image
                            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=1600&fit=crop"
                            alt="Fashion"
                            width={1200}
                            height={1600}
                            className="w-full h-full object-cover"
                            priority
                        />
                    </div>

                    {/* Content Container */}
                    <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full text-white">
                        {/* Top Section - Logo & Brand */}
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                                    <ShoppingBag className="w-6 h-6 text-slate-800" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold tracking-tight">Snazzy Fit</h1>
                                    <p className="text-xs text-white/80">Premium Fashion</p>
                                </div>
                            </div>
                        </div>

                        {/* Middle Section - Hero Content */}
                        <div className="space-y-8 max-w-lg">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                    <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                                    <span className="text-sm font-medium">Trusted by 50K+ Fashion Lovers</span>
                                </div>
                                
                                <h2 className="text-5xl xl:text-6xl font-bold leading-tight">
                                    Style That
                                    <span className="block bg-gradient-to-r from-cyan-300 via-emerald-300 to-lime-300 bg-clip-text text-transparent">
                                        Speaks Volumes
                                    </span>
                                </h2>
                                
                                <p className="text-lg text-white/90 leading-relaxed">
                                    Experience fashion reimagined. Discover exclusive collections, 
                                    curated trends, and personalized style recommendations.
                                </p>
                            </div>

                            {/* Feature Highlights */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center mb-3">
                                        <Zap className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-semibold mb-1">Fast Delivery</h3>
                                    <p className="text-sm text-white/70">Express shipping worldwide</p>
                                </div>

                                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center mb-3">
                                        <TrendingUp className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-semibold mb-1">Trending Styles</h3>
                                    <p className="text-sm text-white/70">Latest fashion updates</p>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Section - Social Proof */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-teal-400 border-2 border-white flex items-center justify-center"
                                        >
                                            <span className="text-sm font-bold text-white">{i}</span>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <div className="flex items-center gap-1 mb-1">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <Star key={i} className="w-4 h-4 fill-amber-300 text-amber-300" />
                                        ))}
                                    </div>
                                    <p className="text-sm text-white/80">Rated 4.9/5 by our customers</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
                                <div>
                                    <div className="text-3xl font-bold">50K+</div>
                                    <div className="text-sm text-white/70">Customers</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold">800+</div>
                                    <div className="text-sm text-white/70">Products</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold">24/7</div>
                                    <div className="text-sm text-white/70">Support</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-full blur-3xl opacity-40 animate-pulse" />
                    <div className="absolute bottom-32 left-32 w-40 h-40 bg-gradient-to-br from-emerald-400 to-green-400 rounded-full blur-3xl opacity-40 animate-pulse" style={{ animationDelay: "1s" }} />
                </div>

                {/* Right Side - Auth Form */}
                <div className="w-full lg:w-[45%] flex items-center justify-center p-8 lg:p-12">
                    <div className="w-full max-w-md">
                        {/* Mobile Logo */}
                        <div className="lg:hidden mb-8 text-center">
                            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-slate-800 to-slate-700 px-5 py-3 rounded-2xl shadow-lg">
                                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                    <ShoppingBag className="w-5 h-5 text-slate-800" />
                                </div>
                                <h1 className="text-xl font-bold text-white">Snazzy Fit</h1>
                            </div>
                        </div>

                        {/* Form Container with Modern Card */}
                        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-500/10 p-8 lg:p-10 border border-gray-100">
                            {children}
                        </div>

                        {/* Bottom Links/Info */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-500">
                                By continuing, you agree to our{" "}
                                <a href="#" className="text-slate-700 hover:text-slate-900 font-medium">
                                    Terms
                                </a>{" "}
                                and{" "}
                                <a href="#" className="text-slate-700 hover:text-slate-900 font-medium">
                                    Privacy Policy
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    )
}
