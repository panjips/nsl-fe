import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import type { AddOn, CartItem, Product } from "../domain";
import { formatCurrency, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ProductCustomizationModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
    addOns: AddOn[];
    onAddToCart: (cartItem: Omit<CartItem, "id">) => void;
}

export function ProductCustomizationModal({
    isOpen,
    onClose,
    product,
    addOns,
    onAddToCart,
}: ProductCustomizationModalProps) {
    const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
    const [imageError, setImageError] = useState(false);

    const availableAddOns = addOns.filter((addOn) => !selectedAddOns.some((selected) => selected.id === addOn.id));

    const handleAddOnAdd = (addOnId: string) => {
        const addOn = addOns.find((item) => item.id === Number.parseInt(addOnId));
        if (addOn) {
            setSelectedAddOns((prev) => [...prev, addOn]);
        }
    };

    const handleAddOnRemove = (addOnId: string) => {
        setSelectedAddOns((prev) => prev.filter((item) => item.id !== Number.parseInt(addOnId)));
    };

    const handleImageError = () => {
        setImageError(true);
    };

    const handleAddToCart = () => {
        if (!product) return;

        const addOnPrice = selectedAddOns.reduce((sum, addOn) => sum + Number.parseFloat(addOn.price.toString()), 0);
        const totalPrice = Number.parseFloat(product.price.toString()) + addOnPrice;

        const cartItem: Omit<CartItem, "id"> = {
            productId: Number.parseInt(product.id),
            name: product.name,
            price: totalPrice,
            quantity: 1,
            addOns: selectedAddOns,
        };

        onAddToCart(cartItem);
        handleClose();
    };

    const handleClose = () => {
        setSelectedAddOns([]);
        onClose();
    };

    if (!product) return null;

    const totalPrice =
        Number.parseFloat(product.price.toString()) +
        selectedAddOns.reduce((sum, addOn) => sum + Number.parseFloat(addOn.price.toString()), 0);

    const initialName = getInitials(product.name);

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Customize {product.name}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 pt-4">
                    <div className="text-center">
                        {!imageError ? (
                            <img
                                src={product.image_url || "/placeholder.svg"}
                                alt={product.name}
                                className="w-32 h-32 object-cover rounded-md mx-auto mb-2"
                                onError={handleImageError}
                            />
                        ) : (
                            <div className="w-32 h-32 mx-auto mb-2 flex items-center justify-center">
                                <Avatar className="h-20 w-20">
                                    <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                                        {initialName}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                        )}
                        <p className="text-lg font-semibold">{formatCurrency(product.price)}</p>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-medium">Add-ons</h4>
                        <Select onValueChange={handleAddOnAdd} disabled={availableAddOns.length === 0}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select add-ons" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableAddOns.map((addOn) => (
                                    <SelectItem key={addOn.id} value={addOn.id.toString()}>
                                        <div className="flex justify-between w-full">
                                            <span>{addOn.name}</span>
                                            <span className="text-muted-foreground">{formatCurrency(addOn.price)}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {selectedAddOns.length > 0 && (
                            <div className="mt-4 space-y-2">
                                <h5 className="text-sm text-muted-foreground">Selected Add-ons</h5>
                                <div className="bg-muted/50 px-3 rounded-md space-y-2">
                                    {selectedAddOns.map((addOn) => (
                                        <div key={addOn.id} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    checked={true}
                                                    onCheckedChange={(checked) => {
                                                        if (!checked) {
                                                            handleAddOnRemove(addOn.id.toString());
                                                        }
                                                    }}
                                                    id={`selected-${addOn.id}`}
                                                />
                                                <label
                                                    htmlFor={`selected-${addOn.id}`}
                                                    className="text-sm font-medium cursor-pointer"
                                                >
                                                    {addOn.name}
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm">{formatCurrency(addOn.price)}</span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-5 w-5"
                                                    onClick={() => handleAddOnRemove(addOn.id.toString())}
                                                >
                                                    <X className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t">
                        <div>
                            <span className="text-lg font-semibold">Total: {formatCurrency(totalPrice)}</span>
                        </div>
                        <Button onClick={handleAddToCart}>Add to Cart</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
