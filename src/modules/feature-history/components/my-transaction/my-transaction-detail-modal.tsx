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
import type { OnlineOrder } from "@/modules/feature-online-order";
import { useHistoryStore } from "../../stores";
import { orderStatusIcons, paymentStatusIcons } from "../shared";
import { orderStatusDisplayNames, paymentStatusDisplayNames } from "../../domain";

export const MyTransactionDetailModal = () => {
    const { modal, resetModal } = useHistoryStore();
    const order = modal.data as OnlineOrder | undefined;

    const isOpen = modal.isOpen && modal.mode === "detail";
    const onOpenChange = (open: boolean) => {
        if (!open) {
            resetModal();
        }
    };

    if (!order) return null;

    const getTotalAddonsPrice = (addons: any[]) => {
        return addons.reduce((total, item) => total + Number(item.subtotal || 0), 0);
    };

    const paymentStatus = order.payment?.trx_status || "PENDING";

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
                <div className="flex flex-wrap justify-between items-center gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge variant={"outline"} className="px-3 py-1">
                            <span className="flex items-center gap-1.5">
                                {orderStatusIcons[order.order_status as keyof typeof orderStatusIcons]}
                                <span>
                                    {orderStatusDisplayNames[
                                        order.order_status as keyof typeof orderStatusDisplayNames
                                    ] || order.order_status}
                                </span>
                            </span>
                        </Badge>

                        <Badge variant="outline" className="px-3 py-1 flex items-center gap-1.5">
                            {paymentStatusIcons[paymentStatus as keyof typeof paymentStatusIcons] ||
                                paymentStatusIcons.PENDING}
                            <span>
                                {paymentStatusDisplayNames[paymentStatus as keyof typeof paymentStatusDisplayNames] ||
                                    paymentStatus}
                            </span>
                        </Badge>
                    </div>

                    <div className="text-lg font-semibold">{formatCurrency(order.total_amount)}</div>
                </div>

                <Separator />

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
                                <span className="font-medium">Payment:</span> {order.payment?.payment_type || "QRIS"}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-sm font-medium text-gray-500">Customer Information</h3>
                        <div className="space-y-1">
                            <p className="flex items-center gap-2 text-sm">
                                <UserIcon className="h-4 w-4 text-gray-500" />
                                <span className="font-medium">Name:</span> {order.user?.name || "You"}
                            </p>
                            <p className="flex items-center gap-2 text-sm">
                                <span className="h-4 w-4 flex justify-center items-center text-gray-500">@</span>
                                <span className="font-medium">Email:</span> {order.user?.email || "-"}
                            </p>
                        </div>
                    </div>
                </div>

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

                                            {item.addons && item.addons.length > 0 && (
                                                <div className="pl-3 mt-2 space-y-1 border-l-2 border-gray-200">
                                                    {item.addons.map((addon) => (
                                                        <div key={addon.id} className="text-xs flex justify-between">
                                                            <span>
                                                                + {addon.addon.name} × {addon.quantity}
                                                            </span>
                                                            <span className="text-gray-600">
                                                                {formatCurrency(
                                                                    Number(
                                                                        addon.subtotal ||
                                                                            Number(addon.price) * addon.quantity,
                                                                    ),
                                                                )}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="text-right">
                                            <p className="font-medium">
                                                {formatCurrency(
                                                    Number(item.subtotal || Number(item.price) * item.quantity) +
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

                    <div className="flex justify-between font-medium pt-2 border-t">
                        <span>Total</span>
                        <span>{formatCurrency(order.total_amount)}</span>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
