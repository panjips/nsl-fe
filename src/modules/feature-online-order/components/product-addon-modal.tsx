import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import { convertToTitleCase, formatCurrency, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { CartAddon } from "../hooks";
import type { Addon } from "@/modules/feature-addon/domain";

interface ProductAddonModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddToCart: (product: any, quantity: number, addons: CartAddon[], sugar_type?: string) => void;
    product: any;
    availableAddons: Addon[];
}

export function ProductAddonModal({ isOpen, onClose, onAddToCart, product, availableAddons }: ProductAddonModalProps) {
    const [selectedAddons, setSelectedAddons] = useState<CartAddon[]>([]);
    const [quantity, setQuantity] = useState(1);
    const [imageError, setImageError] = useState(false);
    const [sugarType, setSugarType] = useState<string | undefined>(undefined);

    const handleSugarTypeChange = (value: string) => {
        setSugarType(value);
    };

    useEffect(() => {
        if (isOpen) {
            setSelectedAddons([]);
            setQuantity(1);
            setImageError(false);
        }
    }, [isOpen, product?.id]);

    const unselectedAddons = availableAddons.filter(
        (addon) => !selectedAddons.some((selected) => selected.addon_id === addon.id),
    );

    const handleAddAddon = (addonId: string) => {
        const addon = availableAddons.find((item) => item.id === Number(addonId));
        if (addon) {
            setSelectedAddons((prev) => [
                ...prev,
                {
                    addon_id: addon.id,
                    name: addon.name,
                    price: addon.price,
                    quantity: quantity, // Set initial addon quantity to match product quantity
                },
            ]);
        }
    };

    const handleRemoveAddon = (addonId: number) => {
        setSelectedAddons((prev) => prev.filter((item) => item.addon_id !== addonId));
    };

    const handleImageError = () => {
        setImageError(true);
    };

    const incrementQuantity = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);

        setSelectedAddons((prevAddons) =>
            prevAddons.map((addon) => ({
                ...addon,
                quantity: newQuantity,
            })),
        );
    };

    const decrementQuantity = () => {
        if (quantity <= 1) return;

        const newQuantity = quantity - 1;
        setQuantity(newQuantity);

        setSelectedAddons((prevAddons) =>
            prevAddons.map((addon) => ({
                ...addon,
                quantity: newQuantity,
            })),
        );
    };

    const addonTotal = selectedAddons.reduce((sum, addon) => sum + Number(addon.price || 0) * (addon.quantity || 1), 0);

    const totalPrice = Number(product?.price || 0) * quantity + Number(addonTotal);

    const handleAddToCart = () => {
        onAddToCart(product, quantity, selectedAddons, sugarType);
        onClose();
    };

    const initialName = product?.name ? getInitials(product.name) : "";

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-lg">Customize {product?.name}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 pt-4">
                    <div className="text-center">
                        {!imageError ? (
                            <img
                                src={product?.image || "/placeholder.svg"}
                                alt={product?.name}
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
                        <p className="text-lg font-semibold">{formatCurrency(product?.price || 0)}</p>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-sm font-medium">Quantity</h3>
                        <div className="flex items-center space-x-3">
                            <Button variant="outline" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
                                -
                            </Button>
                            <span className="w-8 text-center">{quantity}</span>
                            <Button variant="outline" size="icon" onClick={incrementQuantity}>
                                +
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-sm font-medium">Type</h4>
                        <Select
                            onValueChange={handleSugarTypeChange}
                            value={sugarType}
                            disabled={unselectedAddons.length === 0}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select add-ons" />
                            </SelectTrigger>
                            <SelectContent>
                                {product.sugar_type.map((type: any) => (
                                    <SelectItem key={type} value={type}>
                                        <div className="flex justify-between w-full">
                                            <span>{convertToTitleCase(type)}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-sm font-medium">Add-ons</h4>
                        <Select onValueChange={handleAddAddon} disabled={unselectedAddons.length === 0}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select add-ons" />
                            </SelectTrigger>
                            <SelectContent>
                                {unselectedAddons.map((addon) => (
                                    <SelectItem key={addon.id} value={addon.id.toString()}>
                                        <div className="flex justify-between w-full">
                                            <span>{addon.name}</span>
                                            <span className="text-muted-foreground">{formatCurrency(addon.price)}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {selectedAddons.length > 0 && (
                            <div className="mt-4 space-y-2">
                                <h5 className="text-sm text-muted-foreground">Selected Add-ons</h5>
                                <div className="bg-muted/50 px-3 rounded-md space-y-2 py-2">
                                    {selectedAddons.map((addon) => (
                                        <div key={addon.addon_id} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    checked={true}
                                                    onCheckedChange={(checked) => {
                                                        if (!checked) {
                                                            handleRemoveAddon(Number(addon.addon_id));
                                                        }
                                                    }}
                                                    id={`selected-${addon.addon_id}`}
                                                />
                                                <label
                                                    htmlFor={`selected-${addon.addon_id}`}
                                                    className="text-sm font-medium cursor-pointer"
                                                >
                                                    {addon.name}
                                                    <span className="ml-1 text-xs text-muted-foreground">
                                                        (x{addon.quantity || 1})
                                                    </span>
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm">
                                                    {formatCurrency((addon.price || 0) * (addon.quantity || 1))}
                                                </span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-5 w-5"
                                                    onClick={() => handleRemoveAddon(Number(addon.addon_id))}
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
                        <span className="text-lg font-semibold">Total: {formatCurrency(totalPrice)}</span>
                        <Button onClick={handleAddToCart}>Add to Cart</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
