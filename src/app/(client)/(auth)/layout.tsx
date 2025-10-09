"use client"


import Page from "@/components/features/app/Page";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function AuthLayout({ children }: { children: React.ReactNode }) {

    const { user } = useAppSelector((state: RootState) => state.auth);
    // if (user) {
    //     redirect("/");
    // }
    return (
        <Page
            isShowHeader={false}
            isShowFooter={false}
            className="h-screen flex  gap-10 "
        >
            <div className="space-y-8 w-3/5  h-full">
                <Image src="/auth/shopping_bg.gif" alt="login-bg" width={1000} height={1000}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="w-2/5 flex items-center justify-center ">
                {children}
            </div>
        </Page>
    )
}