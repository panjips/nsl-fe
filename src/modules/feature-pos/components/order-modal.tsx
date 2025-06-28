import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, ArrowRight } from "lucide-react";
import type { CartItem } from "../domain";
import { formatCurrency } from "@/lib/utils";
import { useCreateOrder } from "../hooks";
import { useOrderStore } from "../stores";
import { MidtransPayment } from "@/modules/feature-shared";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useStrickerStore } from "@/stores/sticker/store";

interface OrderModalProps {
    cart: CartItem[];
    cartTotal: number;
}

const clientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

export function OrderModal({ cart, cartTotal }: OrderModalProps) {
    const [notes, setNotes] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("CASH");
    const [cashReceived, setCashReceived] = useState("");
    const [showChangeModal, setShowChangeModal] = useState(false);
    const [changeAmount, setChangeAmount] = useState(0);

    const { isSubmitting, createOrder, createOrderState, setShowMidtransPayment, showMidtransPayment } =
        useCreateOrder();
    const paymentMethods = ["CASH", "QRIS MIDTRANS", "QRIS OFFLINE"];
    const { modal, resetModal, modalInvoice } = useOrderStore();
    const { modalStricker } = useStrickerStore();

    const transactionToken = createOrderState.state === "success" && createOrderState.data?.data?.token;

    useEffect(() => {
        if (paymentMethod !== "CASH") {
            setCashReceived("");
        }
    }, [paymentMethod]);

    const handleSubmit = async () => {
        if (paymentMethod === "CASH") {
            const receivedAmount = Number.parseFloat(cashReceived.replace(/[^0-9.-]+/g, ""));
            if (isNaN(receivedAmount) || receivedAmount < cartTotal) {
                toast.error("Uang yang diterima harus lebih besar atau sama dengan total belanja");
                return;
            }
            const change = receivedAmount - cartTotal;
            setChangeAmount(change);
            setShowChangeModal(true);
            return;
        }

        if (paymentMethod === "QRIS OFFLINE") {
            modalInvoice.onOpen(cart);
            modalStricker.onOpen(cart);
        }
        await createOrder(paymentMethod, notes);
    };

    const handlePaymentSuccess = () => {
        toast.dismiss();
        toast.success("Payment completed successfully!");
        modalStricker.onOpen(cart);
        modalInvoice.onOpen(cart);
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
        setShowChangeModal(false);
        resetModal();
        setNotes("");
        setPaymentMethod("CASH");
        setCashReceived("");
    };

    function formatNumberWithSeparator(value: string): string {
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const handleCreateOrder = async () => {
        await createOrder(paymentMethod, notes);
        modalStricker.onOpen(cart);
        modalInvoice.onOpen(cart);
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

                        {paymentMethod === "CASH" && (
                            <div className="flex flex-col space-y-2">
                                <Label htmlFor="cashReceived">Uang Diterima</Label>
                                <Input
                                    id="cashReceived"
                                    type="text"
                                    value={cashReceived ? formatNumberWithSeparator(cashReceived) : ""}
                                    prefix="Rp "
                                    onChange={(e) => {
                                        const rawValue = e.target.value.replace(/[^0-9]/g, "");
                                        setCashReceived(rawValue);
                                    }}
                                />
                                {cashReceived &&
                                    Number.parseFloat(cashReceived.replace(/[^0-9.-]+/g, "")) >= cartTotal && (
                                        <div className="flex justify-between items-center text-sm p-2 bg-muted/50 rounded-md">
                                            <span>Kembalian:</span>
                                            <span className="font-medium text-green-600">
                                                {formatCurrency(
                                                    Number.parseFloat(cashReceived.replace(/[^0-9.-]+/g, "")) -
                                                        cartTotal,
                                                )}
                                            </span>
                                        </div>
                                    )}
                            </div>
                        )}

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

            <Dialog open={showChangeModal} onOpenChange={setShowChangeModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Konfirmasi Pembayaran Tunai</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="flex flex-col items-center text-center">
                                <span className="text-muted-foreground mb-2">Total Belanja</span>
                                <span className="text-2xl font-bold">{formatCurrency(cartTotal)}</span>
                            </div>

                            <ArrowRight className="h-8 w-8 text-muted-foreground" />

                            <div className="grid grid-cols-2 gap-8">
                                <div className="flex flex-col items-center text-center">
                                    <span className="text-muted-foreground mb-2">Diterima</span>
                                    <span className="text-xl font-bold">{formatCurrency(cashReceived)}</span>
                                </div>

                                <div className="flex flex-col items-center text-center">
                                    <span className="text-muted-foreground mb-2">Kembalian</span>
                                    <span className="text-xl font-bold text-green-600">
                                        {formatCurrency(changeAmount)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowChangeModal(false)}>
                            Batal
                        </Button>
                        <Button
                            onClick={async () => {
                                setShowChangeModal(false);
                                handleCreateOrder();
                            }}
                        >
                            Konfirmasi Pembayaran
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
