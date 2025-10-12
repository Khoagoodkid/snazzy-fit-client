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

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("personal-information")
    const user = useAppSelector((state) => state.auth.user)

    const tabs = [
        { id: "personal-information", label: "Personal Information" },
        { id: "my-orders", label: "My Orders" },
        { id: "manage-address", label: "Manage Address" },
        (user?.provider === "email" || !user?.provider ? { id: "password-manager", label: "Password Manager" } : null),
        { id: "logout", label: "Logout" }
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
        <Page className="bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <Breadcrumb />
                <div className="grid lg:grid-cols-4 gap-8 mt-12">
                    {/* Left Sidebar */}
                    <div className="lg:col-span-1">
                        <nav className="space-y-2">
                            {tabs.filter(tab => tab !== null).map((tab) => (
                                <Button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`font-semibold w-full hover:bg-gray-100 hover:text-black text-left flex justify-start py-7 rounded-lg text-lg transition-colors ${activeTab === tab.id
                                        ? "bg-yellow-500 text-white"
                                        : "bg-transparent text-gray-700 border border-gray-200"
                                        }`}
                                >
                                    {tab.label}
                                </Button>
                            ))}
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    )
}