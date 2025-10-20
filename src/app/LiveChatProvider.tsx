"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import { useLiveChat } from "@/components/features/app/admin/ticket/useLiveChat";
// import { metadata } from "./layout";
// Create context with the hook's return type
const LiveChatContext = createContext<ReturnType<typeof useLiveChat> | null>(null);

export function LiveChatProvider({ children }: { children: React.ReactNode }) {
  const liveChatData = useLiveChat();

 

  return (
    <LiveChatContext.Provider value={liveChatData}>
      {children}
    </LiveChatContext.Provider>
  );
}

// Custom hook to use the context
export function useLiveChatContext() {
  const context = useContext(LiveChatContext);
  if (!context) {
    throw new Error("useLiveChatContext must be used within LiveChatProvider");
  }
  return context;
}

