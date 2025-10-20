import { ApiResponse } from "../base.interface";
import { Order } from "../order/order.interface";
import { User } from "../user/user.interface";
import { Session } from "../session/session.interface";

export enum TicketStatus {
    PENDING = "PENDING",
    RESOLVED = "RESOLVED",
}

export enum TicketType {
    GENERAL = "GENERAL",
    SUPPORT = "SUPPORT",
    REVIEW = "REVIEW",
    COMPLAINT = "COMPLAINT",
    OTHER = "OTHER",
}

export interface Ticket {
    id: string;
    title: string;
    description: string;
    user_id: string;
    user: User;
    order_id: string;
    order: Order;
    tags: string[];
    type: TicketType;
    status: TicketStatus;
    images: string[];
    sessions?: Session[];
    created_at: string;
    updated_at: string;
}

export interface CreateTicketRequest {
    files?: File[];
    title: string;
    description: string;
    type: TicketType;
    tags?: string[];
    order_id?: string;
}

export interface UpdateTicketRequest {
    files?: File[];
    title: string;
    description: string;
    type: TicketType;
    tags?: string[];
    order_id?: string;
    previous_images: string[];
}

export interface GetTicketsResponse extends ApiResponse {
    data: Ticket[];
}

export interface GetTicketByIdResponse extends ApiResponse {
    data: Ticket;
}

export interface CreateTicketResponse extends ApiResponse {
    data: Ticket;
}

export interface UpdateTicketResponse extends ApiResponse {
    data: Ticket;
}

export interface DeleteTicketResponse extends ApiResponse {
    data: Ticket;
}

export interface MarkTicketAsResolvedResponse extends ApiResponse {
    data: Ticket;
}