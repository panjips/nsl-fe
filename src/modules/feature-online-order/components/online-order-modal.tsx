import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, ShoppingBag, QrCode } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useCheckout, type CartProduct } from "../hooks";
import { MidtransPayment } from "@/modules/feature-shared";
import { toast } from "sonner";

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    cart: CartProduct[];
    cartTotal: number;
    clearCart: () => void;
}

const clientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

export function CheckoutModal({ isOpen, onClose, cart, cartTotal, clearCart }: CheckoutModalProps) {
    const [notes, setNotes] = useState("");
    const { showMidtransPayment, setShowMidtransPayment, isSubmitting, createOrder, createOrderState } = useCheckout();

    const transactionToken = createOrderState.state === "success" ? createOrderState.data?.data?.token : null;

    useEffect(() => {
        if (createOrderState.state === "success") {
            clearCart();
        }
    }, [createOrderState.state]);

    const handlePaymentSuccess = () => {
        toast.dismiss();
        toast.success("Payment completed successfully!");
        handleClose();
    };

    const handlePaymentError = (error: any) => {
        toast.error("Payment failed: " + (error?.message || "Unknown error"));
    };

    const handlePaymentClose = () => {
        toast.info("Payment canceled");
    };

    const handleClose = () => {
        setShowMidtransPayment(false);
        setNotes("");
        onClose();
    };

    const calculateItemTotal = (item: CartProduct) => {
        let itemTotal = (item.price || 0) * item.quantity;

        if (item.addons && item.addons.length > 0) {
            itemTotal +=
                item.addons.reduce((addonTotal, addon) => addonTotal + (addon.price || 0) * addon.quantity, 0) *
                item.quantity;
        }

        return itemTotal;
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={handleClose}>
                <DialogContent className="sm:max-w-md md:max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <ShoppingBag className="h-5 w-5" />
                            Review Order
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="mt-4">
                            <ScrollArea className="h-52 rounded border p-2">
                                <div className="space-y-3">
                                    {cart.map((item) => (
                                        <div key={item.product_id} className="flex justify-between pb-2 border-b">
                                            <div>
                                                <p className="font-medium">
                                                    {item.name} × {item.quantity}
                                                </p>
                                                {item.addons && item.addons.length > 0 && (
                                                    <div className="text-xs text-muted-foreground">
                                                        {item.addons.map((addon) => (
                                                            <p key={addon.addon_id}>+ {addon.name}</p>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <p className="font-medium">{formatCurrency(calculateItemTotal(item))}</p>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <h3 className="text-sm font-medium">Payment Method</h3>
                            <div className="flex items-center gap-2 px-4 py-2 border rounded-md bg-muted/20">
                                <QrCode className="h-5 w-5 text-primary" />
                                <span>QRIS Midtrans Payment</span>
                                <Badge variant="outline" className="ml-auto">
                                    Only option
                                </Badge>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <Label htmlFor="notes">Notes</Label>
                            <Textarea
                                id="notes"
                                placeholder="Add any special instructions or requests..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                rows={3}
                            />
                        </div>

                        <div className="py-2 border-t">
                            <div className="flex justify-between font-medium">
                                <span>Total</span>
                                <span>{formatCurrency(cartTotal)}</span>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button onClick={() => createOrder(cart, notes)} disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                "Pay with QRIS"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {showMidtransPayment && transactionToken && (
                <MidtransPayment
                    clientKey={clientKey}
                    transactionToken={transactionToken}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                    onClose={handlePaymentClose}
                />
            )}
        </>
    );
}
