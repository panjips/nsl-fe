// components/base/BaseModal.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import clsx from "clsx";
import type { BaseModalProps, ModalSize } from "./types";

const sizeClassMap: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "w-full max-w-screen-md",
};

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  size = "md",
  closeOnOutsideClick = true,
  showCloseIcon = true,
  showCancelButton = true,
  cancelText = "Cancel",
  actionText = "Confirm",
  onAction,
  disableAction = false,
  hideActionButton = false,
  isDestructive = false,
  actionVariant = "default",
  children,
  className,
  ariaLabel,
  isFooter = false,
  footerContent,
}: BaseModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={clsx(sizeClassMap[size], className)}
        onInteractOutside={(e) => {
          if (!closeOnOutsideClick) e.preventDefault();
        }}
        aria-label={ariaLabel}
      >
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {showCloseIcon && (
          <button
            className="absolute top-4 right-4"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <div className="mt-4">{children}</div>

        {isFooter ? (
          footerContent ? (
            footerContent
          ) : (
            <div className="mt-6 flex justify-between">
              {showCancelButton && (
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  {cancelText}
                </Button>
              )}
              {!hideActionButton && (
                <Button
                  variant={isDestructive ? "destructive" : actionVariant}
                  onClick={onAction}
                  disabled={disableAction}
                >
                  {actionText}
                </Button>
              )}
            </div>
          )
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
