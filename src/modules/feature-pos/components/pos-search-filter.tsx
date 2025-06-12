import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Category } from "@/modules/feature-category";

interface SearchAndFiltersProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    categories: Category[];
    setCurrentPage: (page: number) => void;
}

export function SearchAndFilters({
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    categories,
    setCurrentPage,
}: SearchAndFiltersProps) {
    return (
        <div className="bg-white p-4 rounded-lg border shadow-xs space-y-3">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
            </div>

            <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex gap-2">
                    {categories.map((category) => (
                        <Badge
                            key={category.id}
                            variant="outline"
                            className={cn(
                                "cursor-pointer capitalize py-1.5 px-3 whitespace-nowrap transition-colors",
                                selectedCategory === category.id.toString()
                                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                    : "bg-background hover:bg-muted",
                            )}
                            onClick={() => {
                                setSelectedCategory(category.id.toString());
                                setCurrentPage(1);
                            }}
                        >
                            {category.name}
                        </Badge>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" className="h-1.5 opacity-0" />
            </ScrollArea>
        </div>
    );
}
