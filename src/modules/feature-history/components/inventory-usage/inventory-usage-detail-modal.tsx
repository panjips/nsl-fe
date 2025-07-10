import { Modal } from "@/components/modal";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, ClipboardIcon, ShoppingBagIcon, BarChart3Icon, BoxIcon } from "lucide-react";
import { orderStatusDisplayNames, type OrderInventoryUsage } from "../../domain";
import { useHistoryStore } from "../../stores";
import { orderStatusIcons } from "../shared";
import { orderStatusBadgeVariants } from "@/modules/feature-online-order/components/online-order-detail-modal";

export const InventoryUsageDetailModal = () => {
    const { modal, resetModal } = useHistoryStore();
    const usage = modal.data as OrderInventoryUsage | undefined;

    const isOpen = modal.isOpen && modal.mode === "detail";
    const onOpenChange = (open: boolean) => {
        if (!open) {
            resetModal();
        }
    };

    if (!usage) return null;

    const status = usage.order?.order_status || "PENDING";

    return (
        <Modal
            open={isOpen}
            onOpenChange={onOpenChange}
            title="Inventory Usage Details"
            size="md"
            description={`Usage #${usage.id}`}
            isFooter={false}
        >
            <div className="space-y-6">
                {/* Inventory Item Section */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold flex items-center gap-2">
                            <BoxIcon className="h-5 w-5" />
                            Inventory Item
                        </h3>
                    </div>

                    <div className="rounded-md border p-4 space-y-2 bg-muted/30">
                        <div className="flex justify-between">
                            <p className="text-sm font-medium">{usage.inventory?.name || "Unknown Item"}</p>
                            <Badge variant="outline">ID: {usage.inventory_id}</Badge>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Current stock:</span>
                            <span>
                                {usage.inventory?.quantity} {usage.inventory?.unit}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Used in this order:</span>
                            <span className="font-semibold">
                                {usage.quantity_used} {usage.inventory?.unit}
                            </span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Minimum quantity:</span>
                            <span>
                                {usage.inventory?.min_quantity} {usage.inventory?.unit}
                            </span>
                        </div>
                    </div>
                </div>

                <Separator />

                {/* Related Order Information */}
                <div className="space-y-3">
                    <h3 className="text-base font-semibold flex items-center gap-2">
                        <ShoppingBagIcon className="h-5 w-5" />
                        Order Information
                    </h3>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-1">
                            <div className="flex justify-between items-center">
                                <p className="flex items-center gap-2 text-sm">
                                    <ClipboardIcon className="h-4 w-4 text-gray-500" />
                                    <span className="font-medium">Order ID:</span> {usage.order_id}
                                </p>
                                <Badge
                                    variant={
                                        orderStatusBadgeVariants[status as keyof typeof orderStatusBadgeVariants] ||
                                        "default"
                                    }
                                    className="px-3 py-1"
                                >
                                    <span className="flex items-center gap-1.5">
                                        {orderStatusIcons[status as keyof typeof orderStatusIcons]}
                                        <span>
                                            {orderStatusDisplayNames[status as keyof typeof orderStatusDisplayNames] ||
                                                status}
                                        </span>
                                    </span>
                                </Badge>
                            </div>

                            <p className="flex items-center gap-2 text-sm">
                                <CalendarIcon className="h-4 w-4 text-gray-500" />
                                <span className="font-medium">Date:</span> {formatDateTime(usage.order?.order_date)}
                            </p>

                            <p className="flex items-center gap-2 text-sm">
                                <ShoppingBagIcon className="h-4 w-4 text-gray-500" />
                                <span className="font-medium">Type:</span> {usage.order?.order_type}
                            </p>

                            <p className="flex items-center gap-2 text-sm">
                                <BarChart3Icon className="h-4 w-4 text-gray-500" />
                                <span className="font-medium">Total Amount:</span> Rp{" "}
                                {new Intl.NumberFormat("id-ID").format(Number(usage.order?.total_amount || 0))}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
