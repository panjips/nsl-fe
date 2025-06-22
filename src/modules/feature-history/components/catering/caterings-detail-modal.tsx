import { Modal } from "@/components/modal";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
    Calendar,
    MapPin,
    User,
    Phone,
    Mail,
    Coffee,
    ClipboardList,
    MessageSquare,
    CircleDollarSign,
} from "lucide-react";
import { type ReservationWithOrderCateringAndPackage } from "@/modules/feature-reservation";
import { useHistoryStore } from "../../stores";
import { ScrollArea } from "@/components/ui/scroll-area";
import { statusIcons } from "./caterings-column";

export const CateringDetailModal = () => {
    const { modal, resetModal } = useHistoryStore();
    const catering = modal.data as ReservationWithOrderCateringAndPackage | undefined;

    const isOpen = modal.isOpen && modal.mode === "detail";
    const onOpenChange = (open: boolean) => {
        if (!open) {
            resetModal();
        }
    };

    if (!catering) return null;

    const status = catering.status || "PENDING";

    return (
        <Modal
            open={isOpen}
            onOpenChange={onOpenChange}
            title="Catering Event Details"
            size="lg"
            description={`Event #${catering.id}`}
            isFooter={false}
        >
            <div className="space-y-6">
                {/* Status and Total */}
                <div className="flex flex-wrap justify-between items-center gap-2">
                    <Badge variant="outline" className="px-3 py-1 flex items-center gap-1.5">
                        {statusIcons[status as keyof typeof statusIcons]}
                        <span>{status}</span>
                    </Badge>

                    <div className="text-lg font-semibold">{formatCurrency(catering.total_price)}</div>
                </div>

                <Separator />

                {/* Event Information */}
                <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500 flex items-center gap-2">
                        <ClipboardList className="h-4 w-4" />
                        Event Information
                    </h3>
                    <div className="space-y-2 bg-muted/20 p-3 rounded-md">
                        <p className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">Date:</span> {formatDateTime(catering.event_date)}
                        </p>

                        <p className="flex items-start gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                            <span>
                                <span className="font-medium">Location:</span> {catering.location}
                            </span>
                        </p>

                        {catering.notes && (
                            <p className="flex items-start gap-2 text-sm">
                                <MessageSquare className="h-4 w-4 text-gray-500 mt-0.5" />
                                <span>
                                    <span className="font-medium">Notes:</span> {catering.notes}
                                </span>
                            </p>
                        )}
                    </div>
                </div>

                {/* Customer Information */}
                <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500 flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Customer Information
                    </h3>
                    <div className="space-y-2 bg-muted/20 p-3 rounded-md">
                        <p className="flex items-center gap-2 text-sm">
                            <User className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">Name:</span> {catering.user?.name || "N/A"}
                        </p>

                        <p className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">Email:</span> {catering.user?.email || "N/A"}
                        </p>

                        <p className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">Phone:</span> {catering.user?.phone_number || "N/A"}
                        </p>
                    </div>
                </div>

                <Separator />

                {/* Catering Packages */}
                <div className="space-y-3">
                    <h3 className="text-sm font-medium flex items-center gap-2">
                        <Coffee className="h-4 w-4" />
                        Catering Packages ({catering.orderCaterings?.length || 0})
                    </h3>

                    <ScrollArea className="h-[280px] rounded-md border">
                        <div className="p-4 space-y-4">
                            {catering.orderCaterings?.map((pkg) => (
                                <div key={pkg.id} className="border rounded-md p-3 bg-gray-50">
                                    <div className="flex justify-between">
                                        <div className="space-y-1">
                                            <p className="font-medium">
                                                {pkg.cateringPackage?.name || "Unknown Package"}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {pkg.cateringPackage?.description || "No description"}
                                            </p>

                                            <div className="grid grid-cols-2 gap-1 mt-2">
                                                <div className="text-sm">
                                                    <span className="text-muted-foreground">Quantity:</span>
                                                    <span className="ml-1">{pkg.quantity_cup} cups</span>
                                                </div>
                                                <div className="text-sm">
                                                    <span className="text-muted-foreground">Free:</span>
                                                    <span className="ml-1">{pkg.free_cup} cups</span>
                                                </div>
                                                <div className="text-sm">
                                                    <span className="text-muted-foreground">Size:</span>
                                                    <span className="ml-1">
                                                        {pkg.size_volume} {pkg.size_unit}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className="font-medium">{formatCurrency(pkg.price)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>

                    {/* Total */}
                    <div className="flex justify-between font-medium pt-2 border-t">
                        <div className="flex items-center gap-1.5">
                            <CircleDollarSign className="h-4 w-4" />
                            <span>Total</span>
                        </div>
                        <span>{formatCurrency(catering.total_price)}</span>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
