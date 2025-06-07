import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BaseModalProps, ModalSize } from "./types";

const sizeClassMap: Record<ModalSize, string> = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl",
    "3xl": "sm:max-w-3xl",
    "4xl": "sm:max-w-4xl",
    "5xl": "sm:max-w-5xl",
    "6xl": "sm:max-w-6xl",
    "7xl": "sm:max-w-7xl",
    full: "w-full max-w-[95%] sm:max-w-[95%]",
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
                className={cn(sizeClassMap[size], "max-h-[90vh] ", className)}
                onInteractOutside={(e) => {
                    if (!closeOnOutsideClick) e.preventDefault();
                }}
                aria-label={ariaLabel}
            >
                <DialogHeader>
                    {title && <DialogTitle className="pt-6">{title}</DialogTitle>}
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>

                {showCloseIcon && (
                    <button className="absolute top-4 right-4" onClick={() => onOpenChange(false)}>
                        <X className="h-4 w-4" />
                    </button>
                )}

                <div className="mt-4 overflow-y-auto" style={{ maxHeight: "calc(80vh - 130px)" }}>
                    {children}
                </div>

                {isFooter ? (
                    footerContent ? (
                        <div className="mt-4 pt-4 border-t">{footerContent}</div>
                    ) : (
                        <div className="mt-4 pt-4 border-t flex justify-between">
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
                                    type="submit"
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
