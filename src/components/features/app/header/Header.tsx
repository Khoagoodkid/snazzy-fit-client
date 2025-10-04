"use client"

import {
    Search,
    Heart,
    ShoppingCart,
    User,
    LogOut,
} from "lucide-react"
import { headerItems } from "./HeaderItems"
import { HeaderItem } from "./HeaderItems"
import { motion } from "framer-motion"
import { useState } from "react"
import { useAuthService } from "@/services/client/auth/useAuthService"
import { useRouter } from "next/navigation"

export default function Header() {

    const [hoveredItem, setHoveredItem] = useState<HeaderItem | null>(null)
    const { logout } = useAuthService()
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logout();

            router.push("/login");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <header className="w-full bg-white">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-2">
                    <div className="bg-green-600 text-white rounded-sm p-2 font-bold text-sm">F</div>
                    <span className="font-bold text-lg text-green-900">SnazzyFit.</span>
                </div>
                <nav className="hidden md:flex gap-8 text-gray-700 text-md">
                    {headerItems.map((item: HeaderItem) => (
                        <a
                            key={item.id}
                            href={item.href ?? "#"}
                            className="hover:text-green-900 font-medium relative"
                            onMouseEnter={() => setHoveredItem(item)}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            {item.label}
                            {hoveredItem?.id === item.id && (
                                <motion.div
                                    layoutId="header-item-underline"
                                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-900 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    exit={{ width: 0 }}

                                />
                            )}
                        </a>
                    ))}
                </nav>
                <div className="flex gap-4 items-center text-gray-700">
                    <button className="hover:text-green-900"><Search /></button>
                    <button className="hover:text-green-900"><Heart /></button>
                    <button className="hover:text-green-900"><ShoppingCart /></button>
                    <button className="hover:text-green-900"><User /></button>
                    <button className="hover:text-green-900"
                        onClick={() => handleLogout()}
                    ><LogOut /></button>
                </div>
            </div>
        </header>
    )
}