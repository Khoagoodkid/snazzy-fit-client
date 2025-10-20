"use client"

import { setAuthMethod, setCredentials } from "@/lib/features/auth/authSlice";
import { useAuthService } from "@/services/client/auth/useAuthService"
import { useAppDispatch } from "@/lib/hooks"
import { User } from "@/types/user/user.interface"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GoogleCallback() {

    const { getMe } = useAuthService();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const handleGoogleCallback = async () => {
        try {
            const response = await getMe();
            dispatch(setCredentials({
                user: response.data ,
            }));

            dispatch(setAuthMethod({
                authMethod: "google",
            }));

            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleGoogleCallback();
    }, []);

    return <div>Redirecting...</div>
}