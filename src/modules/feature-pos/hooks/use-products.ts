import { useState, useMemo } from "react";
import { useListProduct } from "@/modules/feature-product";
import { useListCategory, type Category } from "@/modules/feature-category";
import { type Product as POSProduct } from "../domain";

export const useProducts = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const { data: productsData, isLoading: isLoadingProducts } = useListProduct();

    const { data: categoriesData, isLoading: isLoadingCategories } = useListCategory();

    const products = useMemo(() => {
        if (!productsData) return [];

        return productsData.map((product) => ({
            ...product,

            image: product.image_url || "/placeholder.svg",
        })) as POSProduct[];
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

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const isLoading = isLoadingProducts || isLoadingCategories;

    return {
        products: paginatedProducts,
        allProducts: products,
        categories,
        isLoading,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        currentPage,
        setCurrentPage,
        totalPages,
    };
};
