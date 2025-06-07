import { Modal } from "@/components/modal";
import { useReservationStatus } from "../hooks/use-reservation-status";
import { ReservationStatus, type ReservationWithOrderCateringAndPackage } from "../domain/reservation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { AlertCircle, ArrowRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { statusIcons, statusDisplayNames, statusBadgeVariants, allowedTransitions } from "../utils";

export const ReservationStatusUpdateModal = ({
    id,
    data,
}: {
    id: number | string | undefined;
    data?: ReservationWithOrderCateringAndPackage | undefined;
}) => {
    const { handleUpdateStatus, isLoading, isOpen, onOpenChange } = useReservationStatus();
    const [selectedStatus, setSelectedStatus] = useState<string>("");

    useEffect(() => {
        if (isOpen && data?.status) {
            setSelectedStatus(data?.status);
        }
    }, [isOpen, data?.status]);

    const availableStatuses = data?.status ? allowedTransitions[data.status] : Object.values(ReservationStatus);

    const handleStatusChange = (value: string) => {
        setSelectedStatus(value);
    };

    const handleSubmit = async () => {
        if (id && selectedStatus) {
            await handleUpdateStatus(id, { status: selectedStatus });
            onOpenChange(false);
        }
    };

    const isStatusChanging = data?.status && selectedStatus && data?.status !== selectedStatus;

    return (
        <Modal
            open={isOpen}
            onOpenChange={onOpenChange}
            title="Update Reservation Status"
            size="md"
            isFooter={true}
            actionText={isLoading ? "Updating..." : "Update Status"}
            onAction={handleSubmit}
            disableAction={!selectedStatus || selectedStatus === data?.status || isLoading}
        >
            <div className="space-y-2">
                <div className="rounded-md bg-blue-50 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <AlertCircle className="h-5 w-5 text-blue-400" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-blue-800">Status Change Information</h3>
                            <div className="mt-2 text-sm text-blue-700">
                                <p>
                                    Updating the reservation status will notify relevant parties and may trigger
                                    additional actions. Make sure this change is correct before proceeding.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="text-sm font-medium">Status</Label>
                    <Select value={selectedStatus} onValueChange={handleStatusChange}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select new status" />
                        </SelectTrigger>
                        <SelectContent>
                            {availableStatuses.map((status) => (
                                <SelectItem key={status} value={status}>
                                    <div className="flex items-center gap-2">
                                        {statusIcons[status]}
                                        <span>{statusDisplayNames[status]}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {isStatusChanging && (
                    <div className="p-4 border rounded-md bg-slate-50">
                        <h4 className="text-sm font-medium mb-3">Status Change Preview</h4>
                        <div className="flex items-center justify-center gap-3">
                            <Badge
                                variant={statusBadgeVariants[data.status] as any}
                                className="flex items-center gap-1.5 px-3 py-1"
                            >
                                {statusIcons[data.status]}
                                <span>{statusDisplayNames[data.status]}</span>
                            </Badge>

                            <ArrowRight className="h-4 w-4 text-slate-400" />

                            <Badge
                                variant={statusBadgeVariants[selectedStatus] as any}
                                className="flex items-center gap-1.5 px-3 py-1"
                            >
                                {statusIcons[selectedStatus]}
                                <span>{statusDisplayNames[selectedStatus]}</span>
                            </Badge>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
};
