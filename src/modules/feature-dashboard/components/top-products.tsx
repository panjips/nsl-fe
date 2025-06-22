import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Package, Plus } from "lucide-react";
import type { TopProduct } from "../domain";

export interface TopProductsProps {
    productsData: TopProduct[];
}

export const TopProducts = ({ productsData }: TopProductsProps) => {
    const getTypeVariant = (type: string) => {
        return type === "Product" ? "default" : "secondary";
    };

    const getTypeIcon = (type: string) => {
        return type === "Product" ? <Package className="w-3 h-3" /> : <Plus className="w-3 h-3" />;
    };

    const getRankIcon = (index: number) => {
        if (index === 0) return <Trophy className="w-4 h-4 text-yellow-500" />;
        if (index === 1) return <Trophy className="w-4 h-4 text-gray-400" />;
        if (index === 2) return <Trophy className="w-4 h-4 text-amber-600" />;
        return (
            <span className="w-4 h-4 flex items-center justify-center text-xs font-semibold text-muted-foreground">
                #{index + 1}
            </span>
        );
    };

    return (
        <Card className="w-full h-full flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    Top Products
                </CardTitle>
                <CardDescription>Most popular items based on quantity sold</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden">
                <div className="space-y-3 overflow-auto h-full pr-2">
                    {productsData.slice(0, 5).map((product, index) => (
                        <div
                            key={product.name}
                            className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                {getRankIcon(index)}
                                <div className="flex items-center gap-2 ">
                                    <div className="flex items-center gap-2">
                                        <Badge
                                            variant={getTypeVariant(product.type)}
                                            className="text-xs flex items-center gap-1"
                                        >
                                            {getTypeIcon(product.type)}
                                        </Badge>
                                    </div>
                                    <h3 className="font-medium text-sm leading-none">{product.name}</h3>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-semibold">{product.quantity}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
