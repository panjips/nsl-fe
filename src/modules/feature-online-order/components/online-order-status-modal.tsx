import { Modal } from "@/components/modal";
import { useOnlineOrderStatus } from "../hooks/use-online-order-status";
import { CheckCircle2, ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { OnlineOrder } from "../domain";

export const OnlineOrderStatusModal = ({
    id,
    data,
}: {
    id: number | string | undefined;
    data?: OnlineOrder | undefined;
}) => {
    const { handleUpdateStatus, isLoading, isOpen, onOpenChange } = useOnlineOrderStatus();

    const handleSubmit = async () => {
        if (id && data) {
            await handleUpdateStatus(id, data.items);
            onOpenChange(false);
        }
    };

    const getStatusIcon = (status: string) => {
        if (status === "PROCESSING") return <Clock className="h-4 w-4" />;
        if (status === "COMPLETED") return <CheckCircle2 className="h-4 w-4" />;
        return null;
    };

    const getStatusBadgeVariant = (status: string) => {
        if (status === "PROCESSING") return "secondary" as const;
        if (status === "COMPLETED") return "default" as const;
        return "default" as const;
    };

    const getStatusDisplayName = (status: string) => {
        const names: Record<string, string> = {
            PROCESSING: "Processing",
            COMPLETED: "Completed",
        };
        return names[status] || status;
    };

    return (
        <Modal
            open={isOpen}
            onOpenChange={onOpenChange}
            title="Complete Order"
            size="sm"
            isFooter={true}
            actionText={isLoading ? "Completing..." : "Complete Order"}
            onAction={handleSubmit}
            disableAction={isLoading || data?.order_status === "COMPLETED"}
        >
            <div className="space-y-4">
                <div className="rounded-md bg-blue-50 p-4">
                    <div className="flex">
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-blue-800">Order Completion</h3>
                            <div className="mt-2 text-sm text-blue-700">
                                <p>
                                    Are you sure you want to mark this order as completed? This action cannot be undone.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 border rounded-md bg-slate-50">
                    <h4 className="text-sm font-medium mb-3">Status Change Preview</h4>
                    <div className="flex items-center justify-center gap-3">
                        <Badge
                            variant={getStatusBadgeVariant(data?.order_status || "PROCESSING")}
                            className="flex items-center gap-1.5 px-3 py-1"
                        >
                            {getStatusIcon(data?.order_status || "PROCESSING")}
                            <span>{getStatusDisplayName(data?.order_status || "PROCESSING")}</span>
                        </Badge>

                        <ArrowRight className="h-4 w-4 text-slate-400" />

                        <Badge variant="default" className="flex items-center gap-1.5 px-3 py-1">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Completed</span>
                        </Badge>
                    </div>
                </div>

                {data?.order_status === "COMPLETED" && (
                    <div className="rounded-md bg-green-50 p-4 text-center">
                        <p className="text-sm font-medium text-green-800">This order is already marked as completed.</p>
                    </div>
                )}
            </div>
        </Modal>
    );
};
