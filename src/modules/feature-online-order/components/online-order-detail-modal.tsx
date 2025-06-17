import { Modal } from "@/components/modal";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    CalendarIcon,
    ClipboardIcon,
    CreditCardIcon,
    MessageSquareIcon,
    PackageIcon,
    ShoppingBagIcon,
    UserIcon,
} from "lucide-react";
import type { OnlineOrder } from "../domain";
import { onlineOrderStore } from "../stores";
import { CheckCircle2, Clock, XCircle, AlertTriangle } from "lucide-react";

export const orderStatusIcons = {
    PENDING: <AlertTriangle className="h-4 w-4" />,
    PROCESSING: <Clock className="h-4 w-4" />,
    COMPLETED: <CheckCircle2 className="h-4 w-4" />,
    CANCELLED: <XCircle className="h-4 w-4" />,
};

export const orderStatusDisplayNames = {
    PENDING: "Pending",
    PROCESSING: "Processing",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
};

export const orderStatusBadgeVariants = {
    PENDING: "outline" as const,
    PROCESSING: "secondary" as const,
    COMPLETED: "default" as const,
    CANCELLED: "destructive" as const,
};

export const OnlineOrderDetailModal = () => {
    const { modalTable } = onlineOrderStore();
    const order = modalTable.data as OnlineOrder | undefined;

    const isOpen = modalTable.isOpen && modalTable.mode === "detail";
    const onOpenChange = (open: boolean) => {
        if (!open) {
            modalTable.onClose();
        }
    };

    if (!order) return null;

    const getTotalAddonsPrice = (addons: any[]) => {
        return addons.reduce((total, item) => total + Number(item.subtotal), 0);
    };

    return (
        <Modal
            open={isOpen}
            onOpenChange={onOpenChange}
            title="Order Details"
            size="lg"
            description={`Order #${order.id}`}
            isFooter={false}
        >
            <div className="space-y-6">
                {/* Order Status Badge */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Badge
                            variant={
                                orderStatusBadgeVariants[order.order_status as keyof typeof orderStatusBadgeVariants] ||
                                "default"
                            }
                            className="px-3 py-1"
                        >
                            <span className="flex items-center gap-1.5">
                                {orderStatusIcons[order.order_status as keyof typeof orderStatusIcons]}
                                {orderStatusDisplayNames[order.order_status as keyof typeof orderStatusDisplayNames] ||
                                    order.order_status}
                            </span>
                        </Badge>
                    </div>

                    <div className="text-lg font-semibold">{formatCurrency(order.total_amount)}</div>
                </div>

                <Separator />

                {/* Order Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium text-gray-500">Order Information</h3>
                        <div className="space-y-1">
                            <p className="flex items-center gap-2 text-sm">
                                <ClipboardIcon className="h-4 w-4 text-gray-500" />
                                <span className="font-medium">ID:</span> {order.id}
                            </p>
                            <p className="flex items-center gap-2 text-sm">
                                <CalendarIcon className="h-4 w-4 text-gray-500" />
                                <span className="font-medium">Date:</span> {formatDateTime(order.order_date)}
                            </p>
                            <p className="flex items-center gap-2 text-sm">
                                <ShoppingBagIcon className="h-4 w-4 text-gray-500" />
                                <span className="font-medium">Type:</span> {order.order_type}
                            </p>
                            <p className="flex items-center gap-2 text-sm">
                                <CreditCardIcon className="h-4 w-4 text-gray-500" />
                                <span className="font-medium">Payment:</span> QRIS
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-sm font-medium text-gray-500">Customer Information</h3>
                        <div className="space-y-1">
                            <p className="flex items-center gap-2 text-sm">
                                <UserIcon className="h-4 w-4 text-gray-500" />
                                <span className="font-medium">Name:</span> {order.user?.name || "N/A"}
                            </p>
                            <p className="flex items-center gap-2 text-sm">
                                <span className="h-4 w-4 flex justify-center items-center text-gray-500">@</span>
                                <span className="font-medium">Email:</span> {order.user?.email || "N/A"}
                            </p>
                            <p className="flex items-center gap-2 text-sm">
                                <span className="h-4 w-4 flex justify-center items-center text-gray-500">📞</span>
                                <span className="font-medium">Phone:</span> {order.user?.phone_number || "N/A"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Notes if available */}
                {order.notes && (
                    <div className="p-3 bg-gray-50 rounded-md">
                        <p className="flex items-start gap-2 text-sm">
                            <MessageSquareIcon className="h-4 w-4 text-gray-500 mt-0.5" />
                            <span>
                                <span className="font-medium">Notes:</span> {order.notes}
                            </span>
                        </p>
                    </div>
                )}

                <Separator />

                {/* Order Items */}
                <div className="space-y-3">
                    <h3 className="text-sm font-medium flex items-center gap-2">
                        <PackageIcon className="h-4 w-4" />
                        Order Items ({order.items.length})
                    </h3>

                    <ScrollArea className="h-[280px] rounded-md border">
                        <div className="p-4 space-y-4">
                            {order.items.map((item) => (
                                <div key={item.id} className="border rounded-md p-3 bg-gray-50">
                                    <div className="flex justify-between">
                                        <div className="space-y-1">
                                            <p className="font-medium">
                                                {item.product.name} × {item.quantity}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {formatCurrency(Number(item.price))} each
                                            </p>

                                            {/* Addons */}
                                            {item.addons && item.addons.length > 0 && (
                                                <div className="pl-3 mt-2 space-y-1 border-l-2 border-gray-200">
                                                    {item.addons.map((addon) => (
                                                        <div key={addon.id} className="text-xs flex justify-between">
                                                            <span>
                                                                + {addon.addon.name} × {addon.quantity}
                                                            </span>
                                                            <span className="text-gray-600">
                                                                {formatCurrency(Number(addon.subtotal))}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="text-right">
                                            <p className="font-medium">
                                                {formatCurrency(
                                                    Number(item.subtotal) +
                                                        (item.addons && item.addons.length > 0
                                                            ? getTotalAddonsPrice(item.addons)
                                                            : 0),
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>

                    {/* Order Total */}
                    <div className="flex justify-between font-medium pt-2 border-t">
                        <span>Total</span>
                        <span>{formatCurrency(order.total_amount)}</span>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
