import { privateAxios } from "@/middleware/axiosInstance";
import { useCallback, useState } from "react";
import {
    UpdateTicketRequest,
    UpdateTicketResponse,
    CreateTicketRequest,
    CreateTicketResponse,
    GetTicketByIdResponse,
    GetTicketsResponse,
    DeleteTicketResponse,
    MarkTicketAsResolvedResponse
} from "@/types/customer-support/customer-support.interface";

export const useCustomerSupport = () => {
    const [isLoading, setIsLoading] = useState(false);

    const getTickets = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await privateAxios.get<GetTicketsResponse>("/api/tickets");
            return response.data;
        } catch (error) {
            throw error as Error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const createTicket = useCallback(async (ticket: CreateTicketRequest) => {
        setIsLoading(true);
        try {
            let requestData: FormData | Omit<CreateTicketRequest, 'files'>;
            requestData = new FormData();
            let headers = {};

            if (ticket.files && ticket.files.length > 0) {
                ticket.files.forEach((file) => {
                    (requestData as FormData).append('files', file);
                });
            }
            requestData.append('title', ticket.title);
            requestData.append('description', ticket.description);
            requestData.append('type', ticket.type);
            if (ticket.tags && ticket.tags.length > 0) {
                requestData.append('tags', JSON.stringify(ticket.tags));
            }
            if (ticket.order_id) {
                requestData.append('order_id', ticket.order_id);
            }
            headers = { 'Content-Type': 'multipart/form-data' };

            const response = await privateAxios.post<CreateTicketResponse>(
                "/api/tickets",
                requestData,
                { headers }
            );
            return response.data;
        }
        catch (error) {
            throw error as Error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const getTicketById = useCallback(async (id: string) => {
        setIsLoading(true);
        try {
            const response = await privateAxios.get<GetTicketByIdResponse>(`/api/tickets/${id}`);
            return response.data;
        }
        catch (error) {
            throw error as Error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const updateTicket = useCallback(async (id: string, ticket: UpdateTicketRequest) => {
        setIsLoading(true);
        try {
            let requestData: FormData | Omit<UpdateTicketRequest, 'files'>;
            let headers = { 'Content-Type': 'multipart/form-data' };
            requestData = new FormData();

            if (ticket.files && ticket.files.length > 0) {
                ticket.files.forEach((file) => {
                    (requestData as FormData).append('files', file);
                });
            }
            requestData.append('title', ticket.title);
            requestData.append('description', ticket.description);
            requestData.append('type', ticket.type);
            if (ticket.tags && ticket.tags.length > 0) {
                requestData.append('tags', JSON.stringify(ticket.tags));
            }
            if (ticket.order_id) {
                requestData.append('order_id', ticket.order_id);
            }
            requestData.append('previous_images', JSON.stringify(ticket.previous_images));

            const response = await privateAxios.patch<UpdateTicketResponse>(
                `/api/tickets/${id}`,
                requestData,
                { headers }
            );
            return response.data;
        }
        catch (error) {
            throw error as Error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const deleteTicket = useCallback(async (id: string) => {
        setIsLoading(true);
        try {
            const response = await privateAxios.delete<DeleteTicketResponse>(`/api/tickets/${id}`);
            return response.data;
        }
        catch (error) {
            throw error as Error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const getTicketsForAdmin = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await privateAxios.get<GetTicketsResponse>("/api/tickets/admin/get-all");
            return response.data;
        } 
        catch (error) {
            throw error as Error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const markTicketAsResolved = useCallback(async (id: string) => {
        setIsLoading(true);
        try {
            const response = await privateAxios.patch<MarkTicketAsResolvedResponse>(`/api/tickets/${id}/admin/mark-as-resolved`);
            return response.data;
        }
        catch (error) {
            throw error as Error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        isLoading,
        getTickets,
        createTicket,
        getTicketById,
        updateTicket,
        deleteTicket,
        getTicketsForAdmin,
        markTicketAsResolved,
    }
}
