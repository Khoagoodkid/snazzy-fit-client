"use client"

import Image from "next/image"
import { User } from "@/types/user/user.interface"
import { cn } from "@/lib/utils"
import { useState } from "react"

export default function UserAvatar({ user, className }: { user: User, className?: string }) {
    const [error, setError] = useState(false)
    return (
        error ? (
            <div className={cn("w-full h-full bg-gray-300 rounded-full flex items-center justify-center", className)}>
                <span className="text-gray-600 font-semibold text-lg">{user.name?.charAt(0).toUpperCase()}</span>
            </div>
        ) : (
            <Image
                src={user.avatar}
                alt={user.name}
                width={100}
                height={100}
                onError={() => {
                    setError(true)
                }}
                className={cn("w-full h-full object-cover rounded-full", className)}
            />
        )
    )
}
