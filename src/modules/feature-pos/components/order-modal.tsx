import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import type { CartItem } from "../domain";
import { formatCurrency } from "@/lib/utils";
import { useCreateOrder } from "../hooks";
import { useOrderStore } from "../stores";
import { MidtransPayment } from "@/modules/feature-shared";
import { toast } from "sonner";

interface OrderModalProps {
    cart: CartItem[];
    cartTotal: number;
}

const clientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

export function OrderModal({ cart, cartTotal }: OrderModalProps) {
    const [notes, setNotes] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("CASH");
    const { isSubmitting, createOrder, createOrderState, setShowMidtransPayment, showMidtransPayment } =
        useCreateOrder();
    const paymentMethods = ["QRIS", "CASH", "GOPAY", "SHOPEEPAY"];
    const { modal, resetModal } = useOrderStore();

    const transactionToken = createOrderState.state === "success" && createOrderState.data?.data?.token;

    const handleSubmit = async () => {
        await createOrder(paymentMethod, notes);
    };

    const handlePaymentSuccess = () => {
        toast.success("Payment completed successfully!");
        handleClose();
    };

    const handlePaymentError = (error: any) => {
        toast.error("Payment failed: " + (error?.message || "Unknown error"));
    };

    const handlePaymentClose = () => {
        toast.info("Payment canceled");
        setShowMidtransPayment(false);
    };

    const handleClose = () => {
        setShowMidtransPayment(false);
        resetModal();
        setNotes("");
        setPaymentMethod("MIDTRANS");
    };

    return (
        <>
            <Dialog open={modal.isOpen} onOpenChange={handleClose}>
                <DialogContent className="sm:max-w-md md:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Order Summary</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="mt-4">
                            <ScrollArea className="h-52 rounded border p-2">
                                <div className="space-y-3">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex justify-between pb-2 border-b">
                                            <div>
                                                <p className="font-medium">
                                                    {item.name} × {item.quantity}
                                                </p>
                                                {item.addOns && item.addOns.length > 0 && (
                                                    <div className="text-xs text-muted-foreground">
                                                        {item.addOns.map((addon) => (
                                                            <p key={addon.id}>+ {addon.name}</p>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <h3 className="text-sm font-medium">Payment Method</h3>
                            <div className="flex flex-wrap gap-2">
                                {paymentMethods.map((method) => (
                                    <Badge
                                        key={method}
                                        variant={paymentMethod === method ? "default" : "outline"}
                                        className="cursor-pointer py-1.5"
                                        onClick={() => setPaymentMethod(method)}
                                    >
                                        {method}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <Label htmlFor="notes">Notes</Label>
                            <Textarea
                                id="notes"
                                placeholder="Add any special instructions..."
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
                        <Button onClick={handleSubmit} disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : paymentMethod === "MIDTRANS" ? (
                                "Pay with Midtrans"
                            ) : (
                                "Place Order"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {showMidtransPayment && transactionToken && (
                <MidtransPayment
                    clientKey={clientKey}
                    transactionToken={createOrderState.data?.data?.token}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                    onClose={handlePaymentClose}
                />
            )}
        </>
    );
}
