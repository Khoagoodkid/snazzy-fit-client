"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Package } from "lucide-react"

interface ProductImageProps {
    src: string
    alt: string
    width?: number
    height?: number
    className?: string
    fallbackClassName?: string
}

export default function ProductImage({ 
    src, 
    alt, 
    width = 400, 
    height = 400, 
    className,
    fallbackClassName 
}: ProductImageProps) {
    const [error, setError] = useState(false)

    return error || !src ? (
        <div className={cn(
            "w-full h-full bg-gradient-to-br from-slate-100 to-gray-200 flex items-center justify-center",
            fallbackClassName,
            className
        )}>
            <Package className="w-16 h-16 text-slate-400" />
        </div>
    ) : (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            onError={() => {
                setError(true)
            }}
            className={cn("w-full h-full object-cover", className)}
        />
    )
}

