import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, formatCurrency, getInitials } from "@/lib/utils";
import { ProductAddonModal } from "./product-addon-modal";
import { useAddons } from "../hooks/use-addons";
import type { CartAddon } from "../hooks";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";

interface ProductGridProps {
    products: any[];
    isLoggedIn: boolean;
    isShopOpen: boolean;
    addToCart: (product: any, quantity: number, addons: CartAddon[]) => void;
}

export function ProductGrid({ products, isLoggedIn, isShopOpen, addToCart }: ProductGridProps) {
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [showAddonModal, setShowAddonModal] = useState(false);
    const { addons } = useAddons();
    const [imageErrors, setImageErrors] = useState<Record<string | number, boolean>>({});

    const handleImageError = (productId: string | number) => {
        setImageErrors((prev) => ({
            ...prev,
            [productId]: true,
        }));
    };

    const handleProductClick = (product: any) => {
        if (!isLoggedIn || !isShopOpen) return;

        setSelectedProduct(product);
        setShowAddonModal(true);
    };

    const handleModalClose = () => {
        setShowAddonModal(false);
        setSelectedProduct(null);
    };

    const handleAddToCartWithAddons = (product: any, quantity: number, selectedAddons: CartAddon[]) => {
        addToCart(product, quantity, selectedAddons);
    };

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
                {products.map((product) => {
                    const isAvailable = isLoggedIn && isShopOpen && product.possible_qty > 0;
                    const initialName = getInitials(product.name);
                    const hasImageError = imageErrors[product.id] || !product.image;
                    return (
                        <Card
                            onClick={() => handleProductClick(product)}
                            key={product.id}
                            className={cn(
                                "overflow-hidden hover:shadow-md transition-shadow p-0 gap-2",
                                !isAvailable && "opacity-50 pointer-events-none grayscale",
                            )}
                        >
                            <CardHeader className="p-0">
                                <div className="aspect-square relative bg-muted cursor-pointer">
                                    {!hasImageError ? (
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="object-cover w-full h-full"
                                            onError={() => handleImageError(product.id)}
                                        />
                                    ) : (
                                        <div className="aspect-square w-full flex items-center justify-center bg-muted rounded-md">
                                            <Avatar>
                                                <AvatarFallback className="text-3xl">{initialName}</AvatarFallback>
                                            </Avatar>
                                        </div>
                                    )}
                                    <Badge className="absolute top-2 right-2">
                                        {product.category?.name || "Product"}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4">
                                <CardTitle
                                    className="text-base mb-1 cursor-pointer truncate whitespace-nowrap overflow-hidden"
                                    onClick={() => handleProductClick(product)}
                                    title={product.name}
                                >
                                    {product.name}
                                </CardTitle>
                                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                                    {product.description || "No description available"}
                                </p>
                                <p className="text-base font-bold">{formatCurrency(product.price || 0)}</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {selectedProduct && (
                <ProductAddonModal
                    isOpen={showAddonModal}
                    onClose={handleModalClose}
                    onAddToCart={handleAddToCartWithAddons}
                    product={selectedProduct}
                    availableAddons={addons || []}
                />
            )}
        </>
    );
}
