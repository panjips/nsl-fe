import { Modal } from "@/components/modal";
import { format } from "date-fns";
import { formatCurrency } from "@/lib/utils";
import type { CreateReservationDTOType } from "@/modules/feature-reservation";

interface ReservationCreateModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    formData: CreateReservationDTOType | null;
    totalAmount: number;
    getPackageInfo: (id: number | undefined) => any | null;
    isLoading?: boolean;
}

export const ReservationCreateModal = ({
    isOpen,
    onOpenChange,
    onConfirm,
    formData,
    totalAmount,
    getPackageInfo,
    isLoading = false,
}: ReservationCreateModalProps) => {
    if (!formData) return null;

    return (
        <Modal
            open={isOpen}
            onOpenChange={onOpenChange}
            title="Confirm Reservation"
            size="lg"
            isFooter={true}
            showCancelButton={true}
            actionText={isLoading ? "Processing..." : "Reserve Now"}
            cancelText="Cancel"
            onAction={onConfirm}
        >
            <div className="grid gap-4 py-2">
                <div className="grid gap-1">
                    <h3 className="font-semibold text-lg">Are you ready to make this reservation?</h3>
                    <p className="text-sm text-muted-foreground">
                        Please review your reservation details before confirming.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                    <span className="font-medium">Event Location:</span>
                    <span>{formData.location}</span>

                    <span className="font-medium">Event Date:</span>
                    <span>{formData.event_date ? format(new Date(formData.event_date), "PPP") : "Not specified"}</span>

                    <span className="font-medium">Include Cart:</span>
                    <span>{formData.is_use_cart ? "Yes (+Rp 500.000)" : "No"}</span>
                </div>

                <div className="space-y-2">
                    <span className="font-medium text-sm">Selected Packages:</span>
                    <div className="space-y-2">
                        {formData.packages.map((pkg, idx) => {
                            const packageInfo = getPackageInfo(pkg.id);
                            if (!packageInfo) return null;

                            return (
                                <div key={idx} className="bg-muted/30 p-3 rounded-md">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">{packageInfo?.name}</span>
                                        <span>{formatCurrency(packageInfo?.price || 0)}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">{packageInfo?.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {formData.notes && (
                    <div className="space-y-1">
                        <span className="font-medium text-sm">Additional Notes:</span>
                        <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-md">{formData.notes}</p>
                    </div>
                )}

                <div className="flex justify-between items-center text-base font-semibold border-t pt-4 mt-2">
                    <span>Total Amount:</span>
                    <span>{formatCurrency(totalAmount)}</span>
                </div>
            </div>
        </Modal>
    );
};
