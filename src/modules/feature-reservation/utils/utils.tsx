import { CheckCircle, Clock, DollarSign, AlertTriangle, Ban, ThumbsUp, AlertCircle } from "lucide-react";
import { ReservationStatus } from "../domain";

const statusIcons = {
    [ReservationStatus.PENDING]: <Clock className="h-4 w-4 text-yellow-500" />,
    [ReservationStatus.CONFIRMED]: <CheckCircle className="h-4 w-4 text-green-500" />,
    [ReservationStatus.WAITING_DEPOSIT]: <AlertTriangle className="h-4 w-4 text-orange-500" />,
    [ReservationStatus.DEPOSIT_PAID]: <DollarSign className="h-4 w-4 text-blue-500" />,
    [ReservationStatus.PAYMENT_PENDING]: <AlertCircle className="h-4 w-4 text-red-500" />,
    [ReservationStatus.COMPLETED]: <ThumbsUp className="h-4 w-4 text-green-700" />,
    [ReservationStatus.CANCELLED]: <Ban className="h-4 w-4 text-gray-500" />,
};

const statusBadgeVariants = {
    [ReservationStatus.PENDING]: "warning",
    [ReservationStatus.CONFIRMED]: "success",
    [ReservationStatus.WAITING_DEPOSIT]: "warning",
    [ReservationStatus.DEPOSIT_PAID]: "default",
    [ReservationStatus.PAYMENT_PENDING]: "destructive",
    [ReservationStatus.COMPLETED]: "success",
    [ReservationStatus.CANCELLED]: "outline",
};

const statusDisplayNames = {
    [ReservationStatus.PENDING]: "Pending",
    [ReservationStatus.CONFIRMED]: "Confirmed",
    [ReservationStatus.WAITING_DEPOSIT]: "Waiting for Deposit",
    [ReservationStatus.DEPOSIT_PAID]: "Deposit Paid",
    [ReservationStatus.PAYMENT_PENDING]: "Payment Pending",
    [ReservationStatus.COMPLETED]: "Completed",
    [ReservationStatus.CANCELLED]: "Cancelled",
};

const allowedTransitions: Record<string, string[]> = {
    [ReservationStatus.PENDING]: [ReservationStatus.PENDING, ReservationStatus.CONFIRMED, ReservationStatus.CANCELLED],
    [ReservationStatus.CONFIRMED]: [
        ReservationStatus.CONFIRMED,
        ReservationStatus.WAITING_DEPOSIT,
        ReservationStatus.CANCELLED,
    ],
    [ReservationStatus.WAITING_DEPOSIT]: [
        ReservationStatus.WAITING_DEPOSIT,
        ReservationStatus.DEPOSIT_PAID,
        ReservationStatus.CANCELLED,
    ],
    [ReservationStatus.DEPOSIT_PAID]: [
        ReservationStatus.DEPOSIT_PAID,
        ReservationStatus.PAYMENT_PENDING,
        ReservationStatus.CANCELLED,
    ],
    [ReservationStatus.PAYMENT_PENDING]: [
        ReservationStatus.PAYMENT_PENDING,
        ReservationStatus.COMPLETED,
        ReservationStatus.CANCELLED,
    ],
    [ReservationStatus.COMPLETED]: [ReservationStatus.COMPLETED],
    [ReservationStatus.CANCELLED]: [ReservationStatus.CANCELLED],
};

export { statusIcons, statusBadgeVariants, statusDisplayNames, allowedTransitions };
