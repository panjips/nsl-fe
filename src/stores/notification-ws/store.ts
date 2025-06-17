import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import type { NotificationStore } from "./state";
import { persist } from "zustand/middleware";

const SOCKET_URL = "http://localhost:3000";
const STORAGE_KEY = "notification-storage";

export const useNotificationStore = create<NotificationStore>()(
    persist(
        (set, get) => ({
            socket: null,
            onlineOrderCount: 0,

            connectSocket: () => {
                if (get().socket) return;

                const socket: Socket = io(SOCKET_URL);
                socket.on("new_online_order", () => {
                    set((state) => ({
                        onlineOrderCount: state.onlineOrderCount + 1,
                    }));
                });

                set({ socket });
            },

            resetOnlineOrderCount: () => {
                set({ onlineOrderCount: 0 });

                try {
                    const persistedString = localStorage.getItem(STORAGE_KEY);
                    if (persistedString) {
                        const persisted = JSON.parse(persistedString);
                        persisted.state = {
                            ...persisted.state,

                            onlineOrderCount: 0,
                        };
                        localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
                    }
                } catch (error) {
                    console.error("Failed to reset persisted notification count:", error);
                }
            },
        }),
        {
            name: "notification-storage",
            partialize: (state) => ({ onlineOrderCount: state.onlineOrderCount }),
        },
    ),
);
