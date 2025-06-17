import { useEffect, useMemo } from "react";
import { useProducts } from "../hooks/use-products";
import { ShopHeader } from "../components/shop-header";
import { ShopStatusAlert } from "../components/shop-status-alert";
import { CategoryFilter } from "../components/category-filter";
import { ProductGrid } from "../components/product-grid";
import { ProductSearchBar } from "../components/product-search-bar";
import { useGlobalAuthStore } from "@/stores";
import { useCart, type CartAddon } from "../hooks";

export const OnlineOrderPage = () => {
    const { products, categories, searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, isLoading } =
        useProducts();

    const { cart, cartItemsCount, cartTotal, addToCart, clearCart, removeFromCart } = useCart();

    useEffect(() => {}, [cart]);

    const isShopOpen = useMemo(() => {
        const now = new Date();
        const currentHour = now.getHours();
        return true;
    }, []);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch =
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === "all" || product.category_id?.toString() === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchTerm, selectedCategory]);

    const { isAuthenticated, logout, user } = useGlobalAuthStore();

    const handleAddToCart = (product: any, quantity: number, addons: CartAddon[] = []) => {
        if (!isShopOpen || !isAuthenticated) return;
        addToCart(product, quantity, addons);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <ShopHeader
                isLoggedIn={isAuthenticated}
                handleLogOut={logout}
                cartItemsCount={cartItemsCount}
                clearCart={clearCart}
                cart={cart}
                cartTotal={cartTotal}
                isShopOpen={isShopOpen}
                user={user || undefined}
                removeFromCart={removeFromCart}
            />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <ShopStatusAlert isShopOpen={isShopOpen} />
                <ProductSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <CategoryFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
                {isLoading ? (
                    <div className="text-center py-8">Loading...</div>
                ) : (
                    <ProductGrid
                        products={filteredProducts}
                        addToCart={handleAddToCart}
                        isLoggedIn={isAuthenticated}
                        isShopOpen={isShopOpen}
                    />
                )}
                {filteredProducts.length === 0 && !isLoading && (
                    <div className="text-center py-12">
                        <span className="inline-block h-12 w-12 bg-gray-200 rounded-full mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                        <p className="text-gray-500">
                            Try adjusting your search or filter to find what you're looking for.
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
};
