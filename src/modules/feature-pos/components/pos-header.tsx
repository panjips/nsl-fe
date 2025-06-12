import type React from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface POSHeaderProps {
    cartItemCount: number;
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
    cartContent: React.ReactNode;
}

export function POSHeader({ cartItemCount, isCartOpen, setIsCartOpen, cartContent }: POSHeaderProps) {
    return (
        <header>
            <div className="pb-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Needsixletters POS</h1>
                    <div className="md:hidden">
                        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="sm" className="relative">
                                    <ShoppingCart className="h-5 w-5" />
                                    {cartItemCount > 0 && (
                                        <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                                            {cartItemCount}
                                        </Badge>
                                    )}
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-full sm:w-96">
                                <SheetHeader>
                                    <SheetTitle>Order(s)</SheetTitle>
                                </SheetHeader>
                                <div className="mt-6 h-full">{cartContent}</div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
