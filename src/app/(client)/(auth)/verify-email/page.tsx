"use client"

import { useAuthService } from "@/services/client/auth/useAuthService";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function VerifyToken() {
    const { verifyEmail } = useAuthService();
    const searchParams = useSearchParams();
    const token = searchParams.get("verify_token") as string;
    const router = useRouter();
    const handleVerifyToken = async () => {
        try {
            await verifyEmail(token);
            toast.success("Email verified successfully");
            router.push("/login");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleVerifyToken();
    }, []);

    return <div>Verifying token...</div>
}