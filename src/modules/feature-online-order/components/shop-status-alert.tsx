import { Clock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ShopStatusAlertProps {
    isShopOpen: boolean;
}

export function ShopStatusAlert({ isShopOpen }: ShopStatusAlertProps) {
    if (isShopOpen) return null;
    return (
        <Alert className="mb-6 border-amber-200 bg-amber-50">
            <Clock className="h-4 w-4" />
            <AlertDescription className="text-amber-800">
                <strong>Coffee shop is currently closed.</strong> We're open daily from 9:00 AM to 9:00 PM. You can
                browse our menu, but ordering is temporarily disabled.
            </AlertDescription>
        </Alert>
    );
}
