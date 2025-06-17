import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Category {
    id: string | number;
    name: string;
    icon?: LucideIcon;
}

interface CategoryFilterProps {
    categories: Category[];
    selectedCategory: string | number;
    setSelectedCategory: (category: string | number) => void;
}

export function CategoryFilter({ categories, selectedCategory, setSelectedCategory }: CategoryFilterProps) {
    return (
        <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Categories</h2>
            <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                    <Button
                        key={category.id || category.name}
                        variant={
                            selectedCategory === category.id || selectedCategory === category.name
                                ? "default"
                                : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedCategory(category.id || category.name)}
                        className="flex items-center space-x-2"
                    >
                        {category.icon && <category.icon className="h-4 w-4" />}
                        <span>{category.name}</span>
                    </Button>
                ))}
            </div>
        </div>
    );
}
