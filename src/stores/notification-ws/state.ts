import { Socket } from "socket.io-client";

export interface NotificationStore {
    socket: Socket | null;
    onlineOrderCount: number;

    connectSocket: () => void;
    resetOnlineOrderCount: () => void;
}
