"use client"

import Page from "../app/Page"
import { useState } from "react"
import PersonalInformation from "./PersonalInformation"
import MyOrders from "./MyOrders"
import ManageAddress from "./ManageAddress"
import PasswordManager from "./PasswordManager"
import Logout from "./Logout"
import Breadcrumb from "../app/Breadcrumb"
import { Button } from "@/components/ui/button"
import { useAppSelector } from "@/lib/hooks"
import { User, Package, MapPin, Lock, LogOut } from "lucide-react"

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("personal-information")
    const user = useAppSelector((state) => state.auth.user)

    const tabs = [
        { id: "personal-information", label: "Personal Information", icon: User },
        { id: "my-orders", label: "My Orders", icon: Package },
        { id: "manage-address", label: "Manage Address", icon: MapPin },
        (user?.provider === "email" || !user?.provider ? { id: "password-manager", label: "Password Manager", icon: Lock } : null),
        { id: "logout", label: "Logout", icon: LogOut }
    ]

    const renderContent = () => {
        switch (activeTab) {
            case "personal-information":
                return <PersonalInformation />
            case "my-orders":
                return <MyOrders />
            case "manage-address":
                return <ManageAddress />
            case "password-manager":
                return <PasswordManager />
            case "logout":
                return <Logout />
            default:
                return <PersonalInformation />
        }
    }

    return (
        <Page className="bg-gradient-to-br from-sky-50/30 via-cyan-50/20 to-teal-50/30">
            <div className="relative">
                {/* Decorative Blobs */}
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-cyan-200/30 to-teal-200/30 rounded-full blur-3xl opacity-50 -z-10" />
                <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-teal-200/30 to-emerald-200/30 rounded-full blur-3xl opacity-50 -z-10" />
                <div className="absolute bottom-1/4 right-1/3 w-[450px] h-[450px] bg-gradient-to-br from-emerald-200/30 to-green-200/30 rounded-full blur-3xl opacity-50 -z-10" />

                <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
                    <Breadcrumb />
                    
                    {/* Page Title */}
                    <div className="text-center mb-12 mt-10">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-700 text-white px-4 py-2 rounded-full font-bold text-sm mb-6 shadow-lg">
                            <User className="w-4 h-4" />
                            My Account
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
                            Welcome Back, <span className="bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">{user?.name || "User"}</span>
                        </h1>
                    </div>

                    <div className="grid lg:grid-cols-4 gap-8">
                        {/* Left Sidebar */}
                        <div className="lg:col-span-1">
                            <nav className="space-y-3 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-gray-100 sticky top-6">
                                {tabs.filter(tab => tab !== null).map((tab) => {
                                    const Icon = tab!.icon
                                    return (
                                        <Button
                                            key={tab!.id}
                                            onClick={() => setActiveTab(tab!.id)}
                                            className={`font-semibold w-full text-left flex justify-start items-center gap-3 py-6 rounded-xl text-base transition-all ${activeTab === tab!.id
                                                ? "bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-lg hover:from-cyan-700 hover:to-teal-700"
                                                : "bg-transparent text-gray-700 border-2 border-gray-200 hover:border-teal-300 hover:bg-teal-50"
                                                }`}
                                        >
                                            <Icon className="w-5 h-5" />
                                            {tab!.label}
                                        </Button>
                                    )
                                })}
                            </nav>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100">
                                {renderContent()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    )
}