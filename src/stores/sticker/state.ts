import type { CartItem } from "@/modules/feature-pos";

export interface StrickerState {
    modalStricker: {
        isOpen: boolean;
        mode?: "view";
        data?: CartItem[];
        onOpen: (data: CartItem[]) => void;
        onClose: () => void;
    };

    resetModalStricker: () => void;
}
