import { User } from "../user/user.interface";
import { Ticket } from "../customer-support/customer-support.interface";
import { ApiResponse } from "../base.interface";

export interface Session {
    id: string;
    ticket_id: string;
    ticket: Ticket;
    messages: Message[];
    user_id: string;
    user: User;
    assistant_id?: string;
    assistant?: User;
    discord_channel_id?: string;
    discord_username?: string;
    discord_user_avatar?: string;
    telegram_chat_id?: string;
    telegram_username?: string;
    telegram_user_avatar?: string;
    source: SessionSource;
    status: string;
    created_at: string;
    updated_at: string;
}

export enum SessionSource {
    WEB = "WEB",
    DISCORD = "DISCORD",
    TELEGRAM = "TELEGRAM",
}

export interface Message {
    id: string;
    session_id: string;
    sender_id: string | null;
    role: MessageRole;
    sender: User | null;
    content: string;
    media: string[] | null;
    receiver_read_at: string | null;
    created_at: string;
    updated_at: string | null;
}

export enum MessageRole {
    USER = "USER",
    BOT = "BOT",
    ASSISTANT = "ASSISTANT",
}

export interface CreateSessionByTicketRequest {
    ticketId: string;
    userId: string;

}

export interface CreateSessionByTicketResponse extends ApiResponse {
    data: Session;
}

export interface GetSessionsResponse extends ApiResponse {
    data: Session[];
}
