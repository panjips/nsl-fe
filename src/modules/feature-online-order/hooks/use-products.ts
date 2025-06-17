import { useState, useMemo } from "react";
import { useListProduct } from "@/modules/feature-product";
import { useListCategory, type Category } from "@/modules/feature-category";
import type { TableProduct } from "@/modules/feature-product";

export interface OnlineOrderProduct extends TableProduct {
    image: string;
}

export const useProducts = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const { data: productsData, isLoading: isLoadingProducts } = useListProduct();
    const { data: categoriesData, isLoading: isLoadingCategories } = useListCategory();

    const products = useMemo(() => {
        if (!productsData) return [];
        return productsData.map((product) => ({
            ...product,
            image: product.image_url || "/placeholder.svg",
        })) as OnlineOrderProduct[];
    }, [productsData]);

    const categories = useMemo(() => {
        const defaultCategory: Category = { id: "all", name: "All", description: "All products", is_active: true };
        if (!categoriesData?.length) return [defaultCategory];
        return [defaultCategory, ...categoriesData];
    }, [categoriesData]);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory =
                selectedCategory === "all" ||
                (product.category_id && product.category_id.toString() === selectedCategory);
            return matchesSearch && matchesCategory;
        });
    }, [products, searchTerm, selectedCategory]);

    const isLoading = isLoadingProducts || isLoadingCategories;

    const handleSelectedCategory = (category: string | number) => {
        setSelectedCategory(category.toString());
    };

    return {
        products: filteredProducts,
        allProducts: products,
        categories,
        isLoading,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory: handleSelectedCategory,
    };
};
