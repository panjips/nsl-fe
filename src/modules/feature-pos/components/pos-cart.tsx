import { ShoppingCart, Plus, Minus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CartItem } from "../domain";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import { useOrderStore } from "../stores";
import type { CreateOrderAddonItemDTOType, CreateOrderProductItemDTOType } from "../data";

interface CartProps {
    cart: CartItem[];
    updateCartItemQuantity: (itemId: string, newQuantity: number) => void;
    removeCartItem: (itemId: string) => void;
    cartTotal: number;
    cartItemCount: number;
    showHeader?: boolean;
}

export function Cart({
    cart,
    updateCartItemQuantity,
    removeCartItem,
    cartTotal,
    cartItemCount,
    showHeader = false,
}: CartProps) {
    const { modal } = useOrderStore();

    const handlePayNow = () => {
        if (cart.length === 0) {
            toast.error("Cannot pay with an empty cart");
            return;
        }

        const items = cart.map((item: CartItem) => {
            const addons: CreateOrderAddonItemDTOType[] =
                item.addOns?.map((addon) => ({
                    addon_id: Number(addon.id),
                    quantity: 1,
                })) || [];

            return {
                product_id: Number(item.productId),
                quantity: item.quantity,
                addons: addons.length > 0 ? addons : undefined,
            } as CreateOrderProductItemDTOType;
        }) as CreateOrderProductItemDTOType[];

        modal.onOpen("create", items);
    };

    const CartContent = () => (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-auto">
                {cart.length === 0 ? (
                    <div className="text-center py-8">
                        <ShoppingCart className="mx-auto h-12 w-12 mb-4 opacity-50" />
                        <p className="text-muted-foreground">Your cart is empty</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {cart.map((item) => {
                            const totalPrice = item.price * item.quantity;

                            return (
                                <Card key={item.id} className="p-4">
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-medium">{item.name}</h4>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeCartItem(item.id)}
                                            className="p-0 h-4 w-4"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    {item.addOns && item.addOns.length > 0 && (
                                        <div className="text-sm text-muted-foreground mt-1">
                                            {item.addOns.map((addOn) => addOn.name).join(", ")}
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center mt-2">
                                        <div className="flex items-center">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                                                className="h-6 w-6 p-0"
                                            >
                                                <Minus className="h-3 w-3" />
                                            </Button>
                                            <span className="w-8 text-center">{item.quantity}</span>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                                                className="h-6 w-6 p-0"
                                            >
                                                <Plus className="h-3 w-3" />
                                            </Button>
                                        </div>
                                        <span className="font-medium">{formatCurrency(totalPrice)}</span>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>

            {cart.length > 0 && (
                <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold">Total:</span>
                        <span className="text-lg font-bold">{formatCurrency(cartTotal)}</span>
                    </div>
                    <Button className="w-full" size="lg" onClick={handlePayNow}>
                        Pay Now
                    </Button>
                </div>
            )}
        </div>
    );

    if (showHeader) {
        return (
            <Card className="h-full flex flex-col">
                <CardHeader className="pb-2 shrink-0">
                    <CardTitle className="flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5" />
                        Order(s)
                        {cartItemCount > 0 && <Badge>{cartItemCount}</Badge>}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden flex flex-col">
                    <CartContent />
                </CardContent>
            </Card>
        );
    }

    return <CartContent />;
}
