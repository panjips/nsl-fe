import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Product } from "../domain";
import { cn, formatCurrency, getInitials } from "@/lib/utils";

interface ProductCardProps {
    product: Product;
    onProductClick: (product: Product) => void;
}

export function ProductCard({ product, onProductClick }: ProductCardProps) {
    const [imageError, setImageError] = useState(false);
    const price = formatCurrency(product.price);
    const initialName = getInitials(product.name);
    const isAvailable = (product.possible_qty ?? 0) > 0;

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <Card
            className={cn(
                "cursor-pointer hover:shadow-md transition-shadow p-0 gap-2",
                !isAvailable && "opacity-50 pointer-events-none grayscale",
            )}
            onClick={() => onProductClick(product)}
        >
            <CardHeader className="px-3 pt-3 relative">
                {!imageError ? (
                    <img
                        src={product.image_url || "/placeholder.svg"}
                        alt={product.name}
                        className="aspect-square w-full object-cover rounded-md"
                        onError={handleImageError}
                    />
                ) : (
                    <div className="aspect-square w-full flex items-center justify-center bg-muted rounded-md">
                        <Avatar className="h-20 w-20">
                            <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                                {initialName}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                )}
            </CardHeader>
            <CardContent className="px-3 pt-0">
                <CardTitle className="text-sm font-medium">{product.name}</CardTitle>
                <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs mt-1 capitalize">
                        {product.category.name}
                    </Badge>
                    <Badge variant="outline" className="text-xs mt-1 capitalize">
                        Qty: {product.possible_qty}
                    </Badge>
                </div>
            </CardContent>
            <CardFooter className="px-3 pt-0 pb-3">
                <span className="font-bold text-lg">{price}</span>
            </CardFooter>
        </Card>
    );
}
