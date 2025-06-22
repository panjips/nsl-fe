import { CheckCircle2, Clock, AlertTriangle, XCircle } from "lucide-react";

export const orderStatusIcons = {
    PENDING: <AlertTriangle className="h-3 w-3 fill-orange-500" />,
    PROCESSING: <Clock className="h-3 w-3 fill-yellow-500" />,
    COMPLETED: <CheckCircle2 className="h-3 w-3 fill-green-500" />,
    CANCELLED: <XCircle className="h-3 w-3 fill-red-500" />,
};

export const paymentStatusIcons = {
    SUCCESS: <CheckCircle2 className="h-3 w-3 fill-green-500" />,
    PENDING: <Clock className="h-3 w-3 fill-orange-500" />,
    FAILURE: <XCircle className="h-3 w-3 fill-red-500" />,
    EXPIRE: <AlertTriangle className="h-3 w-3 fill-orange-500" />,
};

