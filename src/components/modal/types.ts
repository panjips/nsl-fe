export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export interface BaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
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
