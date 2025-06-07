export type ModalSize = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full";

export interface BaseModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string | React.ReactNode;
    description?: string;
    size?: ModalSize;
    closeOnOutsideClick?: boolean;
    showCloseIcon?: boolean;
    showCancelButton?: boolean;
    cancelText?: string;
    actionText?: string;
    onAction?: () => void;
    disableAction?: boolean;
    hideActionButton?: boolean;
    isDestructive?: boolean;
    actionVariant?: "default" | "destructive" | "secondary";
    children: React.ReactNode;
    className?: string;
    ariaLabel?: string;
    isFooter?: boolean;
    footerContent?: React.ReactNode;
}
