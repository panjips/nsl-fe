import { ShoppingCart, Coffee, LayoutDashboard, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "@tanstack/react-router";
import type { UserLogin } from "@/modules/feature-auth";
import { formatCurrency, getInitials } from "@/lib/utils";
import { cartToDTO, type CartProduct } from "../hooks";
import { CheckoutModal } from "./online-order-modal";
import { onlineOrderStore } from "../stores";

interface ShopHeaderProps {
    isLoggedIn: boolean;
    handleLogOut: () => void;
    cartItemsCount: number;
    clearCart: () => void;
    cart: CartProduct[];
    cartTotal: number;
    isShopOpen: boolean;
    user?: UserLogin;
    removeFromCart?: (productId: string | number) => void;
}

export function ShopHeader({
    isLoggedIn,
    handleLogOut,
    cartItemsCount,
    clearCart,
    cart,
    cartTotal,
    isShopOpen,
    user,
    removeFromCart = () => {},
}: ShopHeaderProps) {
    const navigate = useNavigate();
    const initialName = getInitials(user?.name || "Guest");
    const { modal } = onlineOrderStore();

    const handleOpenCheckoutModal = () => {
        if (cart.length === 0) return;
        modal.onOpen("review", cartToDTO(cart));
    };

    const handleCalculateCartTotal = (cart: CartProduct) => {
        let itemTotal = (cart.price || 0) * cart.quantity;

        if (cart.addons && cart.addons.length > 0) {
            itemTotal +=
                cart.addons.reduce((addonTotal, addon) => addonTotal + (addon.price || 0) * addon.quantity, 0) *
                cart.quantity;
        }

        return Number(itemTotal);
    };

    const handleLoginClick = () => {
        navigate({ to: "/login" });
    };

    const handleDashboardClick = () => {
        navigate({ to: "/dashboard" });
    };

    const handleProfileClick = () => {
        navigate({ to: "/dashboard/profile" });
    };

    return (
        <>
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-2">
                            <Coffee />
                            <h1 className="text-xl font-bold text-gray-900">Needsixletters</h1>
                        </div>
                        <div className="flex-1 max-w-lg mx-8" />
                        <div className="flex items-center space-x-4">
                            {isLoggedIn && (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" size="sm" className="relative">
                                            <ShoppingCart className="h-4 w-4" />
                                            {cartItemsCount > 0 && (
                                                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                                                    {cartItemsCount}
                                                </Badge>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80" align="end">
                                        <div className="space-y-4">
                                            <h3 className="font-semibold">Shopping Cart</h3>
                                            {cart.length === 0 ? (
                                                <p className="text-gray-500 text-sm">Your cart is empty</p>
                                            ) : (
                                                <>
                                                    <div className="space-y-2 max-h-60 overflow-y-auto">
                                                        {cart.map((item) => (
                                                            <div
                                                                key={item.product_id}
                                                                className="flex justify-between items-center text-sm"
                                                            >
                                                                <div className="flex items-center space-x-3">
                                                                    <Button
                                                                        variant={"destructive"}
                                                                        size="sm"
                                                                        className="h-6 w-6"
                                                                        onClick={() => removeFromCart(item.product_id)}
                                                                    >
                                                                        <X className="h-4 w-4" />
                                                                    </Button>
                                                                    <div>
                                                                        <p className="font-medium">{item.name}</p>
                                                                        <p className="text-gray-500">
                                                                            Qty: {item.quantity}
                                                                        </p>
                                                                        {item.addons && item.addons.length > 0 && (
                                                                            <div className="text-xs text-muted-foreground">
                                                                                {item.addons.map((addon) => (
                                                                                    <p key={addon.addon_id}>
                                                                                        + {addon.name}
                                                                                    </p>
                                                                                ))}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <p className="font-medium">
                                                                    {formatCurrency(handleCalculateCartTotal(item))}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <Separator />
                                                    <div className="flex justify-between items-center font-semibold">
                                                        <span>Total:</span>
                                                        <span>{formatCurrency(cartTotal || 0)}</span>
                                                    </div>
                                                    <Button
                                                        className="w-full"
                                                        disabled={!isShopOpen}
                                                        onClick={handleOpenCheckoutModal}
                                                    >
                                                        {isShopOpen ? "Checkout" : "Shop Closed"}
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )}
                            {isLoggedIn ? (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                            <Avatar className="h-8 w-8 rounded-lg grayscale">
                                                <AvatarFallback className="rounded-lg">{initialName}</AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-56" align="end">
                                        <div className="space-y-4">
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium">{user?.name}</p>
                                                <p className="text-xs text-gray-500">{user?.email || ""}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <Button
                                                    variant="ghost"
                                                    className="w-full justify-start"
                                                    size="sm"
                                                    onClick={handleDashboardClick}
                                                >
                                                    <LayoutDashboard className="mr-2 h-4 w-4" />
                                                    Dashboard
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    className="w-full justify-start"
                                                    size="sm"
                                                    onClick={handleProfileClick}
                                                >
                                                    <User className="mr-2 h-4 w-4" />
                                                    Profile
                                                </Button>
                                            </div>
                                            <Separator />
                                            <Button
                                                variant="ghost"
                                                className="w-full justify-start text-red-600 hover:text-red-700"
                                                size="sm"
                                                onClick={handleLogOut}
                                            >
                                                Log out
                                            </Button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            ) : (
                                <Button onClick={handleLoginClick} size="sm">
                                    Log in
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </header>
            <CheckoutModal
                cart={cart}
                cartTotal={cartTotal}
                isOpen={modal.isOpen}
                onClose={modal.onClose}
                clearCart={clearCart}
            />
        </>
    );
}
