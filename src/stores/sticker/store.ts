import { create } from "zustand";
import type { StrickerState } from "./state";

export const useStrickerStore = create<StrickerState>((set) => ({
    modalStricker: {
        isOpen: false,
        mode: "view",
        data: undefined,
        onOpen: (data) => {
            set((state) => ({
                modalStricker: {
                    ...state.modalStricker,
                    isOpen: true,
                    mode: "view",
                    data: data ?? undefined,
                },
            }));
        },
        onClose: () => {
            set((state) => ({
                modalStricker: {
                    ...state.modalStricker,
                    isOpen: false,
                    mode: undefined,
                    data: undefined,
                },
            }));
        },
    },
    resetModalStricker: () => {
        set((state) => ({
            modalStricker: {
                ...state.modalStricker,
                isOpen: false,
                mode: undefined,
                data: undefined,
            },
        }));
    },
}));
