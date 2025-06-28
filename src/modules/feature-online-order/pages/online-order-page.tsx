import { useEffect, useMemo } from "react";
import { useProducts } from "../hooks/use-products";
import { ShopHeader } from "../components/shop-header";
import { ShopStatusAlert } from "../components/shop-status-alert";
import { CategoryFilter } from "../components/category-filter";
import { ProductGrid } from "../components/product-grid";
import { ProductSearchBar } from "../components/product-search-bar";
import { useGlobalAuthStore } from "@/stores";
import { useCart, type CartAddon } from "../hooks";
import { useNavigate } from "@tanstack/react-router";
import { useSharedStore } from "@/modules/feature-shared";

export const OnlineOrderPage = () => {
    const { products, categories, searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, isLoading } =
        useProducts();

    const { getStatusStore } = useSharedStore();

    const { cart, cartItemsCount, cartTotal, addToCart, clearCart, removeFromCart } = useCart();

    console.log(cart);

    useEffect(() => {}, [cart]);

    const isShopOpen = useMemo(() => {
        if (getStatusStore.state.state === "success") {
            return getStatusStore.state.data.isOpen;
        }

        return false;
    }, [getStatusStore.state]);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch =
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory =
                selectedCategory.toLowerCase() === "all" ||
                (product.category_id && product.category.name.toLowerCase() === selectedCategory.toLowerCase());
            return matchesSearch && matchesCategory;
        });
    }, [products, searchTerm, selectedCategory]);

    const { isAuthenticated, user, logout } = useGlobalAuthStore();

    const navigate = useNavigate();

    const handleLogOut = () => {
        logout();
        navigate({ to: "/login" });
    };

    const handleAddToCart = (product: any, quantity: number, addons: CartAddon[] = [], sugarType?: string) => {
        if (!isShopOpen || !isAuthenticated) return;
        addToCart(product, quantity, addons, sugarType);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center">
            <div className="w-full max-w-md bg-white min-h-screen shadow-lg flex flex-col relative">
                <ShopHeader
                    isLoggedIn={isAuthenticated}
                    handleLogOut={handleLogOut}
                    cartItemsCount={cartItemsCount}
                    clearCart={clearCart}
                    cart={cart}
                    cartTotal={cartTotal}
                    isShopOpen={isShopOpen}
                    user={user || undefined}
                    removeFromCart={removeFromCart}
                />
                <main className="flex-1 px-4 py-4 overflow-y-auto">
                    <ShopStatusAlert isShopOpen={isShopOpen} />
                    <div className="rounded-sm aspect-[16/9] w-full">
                        <img src="/nsl-logo.png" alt="Description" className="w-full h-full object-cover rounded-sm" />
                    </div>

                    <ProductSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <CategoryFilter
                        categories={categories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                    {isLoading ? (
                        <div className="flex justify-center items-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                        </div>
                    ) : (
                        <ProductGrid
                            products={filteredProducts}
                            addToCart={handleAddToCart}
                            isLoggedIn={isAuthenticated}
                            isShopOpen={isShopOpen}
                        />
                    )}
                    {filteredProducts.length === 0 && !isLoading && (
                        <div className="text-center py-8">
                            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-200 mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-labelledby="noProductsIcon"
                                >
                                    <title id="noProductsIcon">No products found</title>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                            <p className="text-gray-500">
                                Try adjusting your search or filter to find what you're looking for.
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};
