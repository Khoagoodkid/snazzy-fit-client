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
import { useState } from "react"
import { useAuthService } from "@/services/client/auth/useAuthService"
import { useRouter } from "next/navigation"
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger, NavigationMenuContent } from "@/components/ui/navigation-menu"
import { motion } from "framer-motion"
import { useSelector } from "react-redux"
import { RootState } from "@/lib/store"
import { Button } from "@/components/ui/button"
import SearchDialog from "../search-dialog/SearchDialog"

export default function Header() {

    const [hoveredItem, setHoveredItem] = useState<HeaderItem | null>(null)
    const { logout } = useAuthService()
    const router = useRouter();
    const { user } = useSelector((state: RootState) => state.auth);
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
            <div className="max-w-screen mx-auto flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-2">
                    <div className="bg-green-600 text-white rounded-sm p-2 font-bold text-sm">F</div>
                    <span className="font-bold text-lg text-green-900">SnazzyFit.</span>
                </div>
                <nav className="hidden md:flex gap-8 text-gray-700 text-md">

                    <NavigationMenu>
                        <NavigationMenuList className="gap-7">
                            {headerItems.map((item: HeaderItem) => {
                                return (
                                    <NavigationMenuItem key={item.id}
                                        onMouseEnter={() => setHoveredItem(item)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                        className="hover:text-green-900 font-medium relative p-0 hover:bg-transparent"
                                    >
                                        {item.href ? (
                                            <NavigationMenuLink asChild>
                                                <a href={item.href} className="hover:bg-transparent md:p-0 w-fit h-fit ">{item.label}</a>
                                            </NavigationMenuLink>
                                        ) : (
                                            <>
                                                <NavigationMenuTrigger className="hover:bg-transparent md:p-0 md:pb-1 w-fit h-fit">{item.label}</NavigationMenuTrigger>
                                                <NavigationMenuContent>
                                                    {item.dropdown}
                                                </NavigationMenuContent>
                                            </>
                                        )}
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
                                    </NavigationMenuItem>
                                )
                            })}
                        </NavigationMenuList>
                    </NavigationMenu>
                </nav>
                <div className="flex gap-4 items-center text-gray-700">
                    <SearchDialog>
                        <Search className="hover:fill-current cursor-pointer" />
                    </SearchDialog>
                    {user && (
                        <>
                            <button className="hover:text-green-900 cursor-pointer"><Heart className="hover:fill-current" /></button>
                            <button className="hover:text-green-900 cursor-pointer"
                                onClick={() => router.push("/shopping-cart")}
                            ><ShoppingCart className="hover:fill-current" /></button>
                            <button className="hover:text-green-900 cursor-pointer"
                                onClick={() => router.push("/profile")}
                            ><User className="hover:fill-current" /></button>

                            <button className="hover:text-green-900 cursor-pointer"
                                onClick={() => handleLogout()}
                            ><LogOut className="hover:fill-current" /></button>
                        </>
                    )}

                    {
                        !user && (
                            <>
                                <Button
                                    variant="outline"
                                    className="border-none shadow-none hover:bg-transparent hover:text-green-900"
                                    onClick={() => router.push("/login")}
                                >
                                    Login
                                </Button>
                                <Button
                                    variant="outline"
                                    className="hover:text-green-900 border-green-900 text-green-900 hover:bg-green-900 hover:text-white"
                                    onClick={() => router.push("/signup")}
                                >
                                    Signup
                                </Button>
                            </>
                        )
                    }
                </div>
            </div>
        </header >
    )
}