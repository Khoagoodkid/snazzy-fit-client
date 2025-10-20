import { Message, Session } from "@/types/session/session.interface";
import { useCallback, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { BASE_URL } from "@/config/config";
import { useAppSelector } from "@/lib/hooks";
import { useSessionService } from "@/services/client/session/useSessionService";
import { toast } from "react-toastify";

const socket = io("http://localhost:8001" + "/chat",
    {
        withCredentials: true,
        transports: ["websocket"],
    }
);

export const useLiveChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [sessions, setSessions] = useState<Session[]>([]);
    const [selectedSession, setSelectedSession] = useState<Session | null>(null);
    const { user } = useAppSelector((state) => state.auth);
    const { getAllSessionsForAdmin, getAllSessions } = useSessionService();
    const roomId = useMemo(() => {
        return user?.role.name === "USER" ? user?.id : "ASSISTANT";
    }, [user]);

    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
        }

        socket.on("connect", () => {
            socket.emit("joinAllSessions", {
                roomId
            });
            handleGetSessions();
        });

        // socket.on("sessions", ({ sessions }: { sessions: Session[] }) => {
        //     console.log("Joined all sessions", sessions);
        //     setSessions(sessions);
        // });
        socket.on("disconnect", () => {
            console.log("Disconnected from chat");
        });

        socket.on("getSessionHistory", ({ messages }: { messages: Message[] }) => {
            console.log("Getting session history", messages);
            setMessages(messages);
        });

        socket.on("receiveMessage", ({ message }: { message: Message }) => {
            const sessionId = message.session_id;


            setSessions((prev) => {
                return prev.map(session => session.id === sessionId ?
                    { ...session, messages: [...session.messages, message] } :
                    session);
            })

            setMessages((prev) => {
                console.log("Receiving message", [...prev, message]);
                return [...prev, message];
            })
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("sessions");
            socket.off("receiveMessage");
            socket.disconnect();
        };
    }, []);
    const handleGetSessions = useCallback(async () => {
        try {
            if (user?.role.name === "USER") {
                const response = await getAllSessions();
                setSessions(response.data);
            } else {
                const response = await getAllSessionsForAdmin();
                setSessions(response.data);
            }
        } catch (error) {
            toast.error((error as Error).message);
        }

    }, [user?.role.name, getAllSessionsForAdmin]);

    const handleSendMessage = (payload: { content: string, files: File[], sessionId: string }) => {
        const bufferedFiles = payload.files.map(file => {
            return {
                filename: file.name,
                buffer: file
            }
        })
        socket.emit("sendMessage", {
            content: payload.content,
            files: bufferedFiles,
            sessionId: payload.sessionId
        });
    };

    const handleSelectSession = (sessionId: string) => {
        const session = sessions.find(session => session.id === sessionId);
        console.log("Selecting session", session);
        socket.emit("joinRoom", {
            sessionId: sessionId
        });
        if (session) {
            setSelectedSession(session);
        }
    };

    return {
        messages,
        isLoading,
        error,
        sessions,
        selectedSession,
        handleSelectSession,
        handleSendMessage,
    };
};
