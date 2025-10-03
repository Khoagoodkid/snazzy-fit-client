import Header from "./Header"
import Footer from "./Footer"
import { cn } from "@/lib/utils"


export default function Page({
    children,
    isShowHeader = true,
    isShowFooter = true,
    className,
}: {
    children: React.ReactNode
    isShowHeader?: boolean
    isShowFooter?: boolean
    className?: string
}) {
    return (
        <main className="flex flex-col min-h-screen">
            {isShowHeader && <Header />}
            <div className={cn("relative", className)}>
                {children}
            </div>
            {isShowFooter && <Footer />}
        </main>
    )
}