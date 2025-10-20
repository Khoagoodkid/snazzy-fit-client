import { privateAxios } from "@/middleware/axiosInstance";
import { useCallback, useState } from "react";
import { CreateSessionByTicketRequest, CreateSessionByTicketResponse, GetSessionsResponse } from "@/types/session/session.interface";


export const useSessionService = () => {
    const [isLoading, setIsLoading] = useState(false);
    const getAllSessionsForAdmin = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await privateAxios.get<GetSessionsResponse>(`/api/sessions/admin/get-all`);
            return response.data;
        } catch (error) {
            throw error as Error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const createSessionByTicket = useCallback(async (data: CreateSessionByTicketRequest) => {
        setIsLoading(true);
        try {
            const response = await privateAxios.post<CreateSessionByTicketResponse>(`/api/sessions/admin/create-by-ticket`, data);
            return response.data;
        } catch (error) {
            throw error as Error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const getAllSessions = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await privateAxios.get<GetSessionsResponse>(`/api/sessions`);
            return response.data;
        } catch (error) {
            throw error as Error;
        }
        finally {
            setIsLoading(false);
        }
    }, []);

    return {
        isLoading,
        getAllSessionsForAdmin,
        createSessionByTicket,
        getAllSessions,
    }
}