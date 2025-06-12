import { useState } from "react";
import { ProductCustomizationModal, Pagination, ProductGrid, SearchAndFilters, POSHeader, Cart } from "../components";
import type { Product } from "../domain";
import { useProducts, useAddons } from "../hooks";
import { useCartStore } from "../stores";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderModal } from "../components/order-modal";

export const POSPage = () => {
    const {
        products,
        categories,
        isLoading: isLoadingProducts,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        currentPage,
        setCurrentPage,
        totalPages,
    } = useProducts();

    const { addons, isLoading: isLoadingAddons } = useAddons();

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        items: cart,
        addItem,
        updateQuantity,
        removeItem,
        itemCount: cartItemCount,
        totalAmount: cartTotal,
    } = useCartStore();

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const cartContent = (
        <Cart
            cart={cart}
            updateCartItemQuantity={updateQuantity}
            removeCartItem={removeItem}
            cartTotal={cartTotal()}
            cartItemCount={cartItemCount()}
        />
    );

    return (
        <div>
            <POSHeader
                cartItemCount={cartItemCount()}
                isCartOpen={isCartOpen}
                setIsCartOpen={setIsCartOpen}
                cartContent={cartContent}
            />

            <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 space-y-6">
                        <SearchAndFilters
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            categories={categories}
                            setCurrentPage={setCurrentPage}
                        />

                        {isLoadingProducts ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                {Array(8)
                                    .fill(0)
                                    .map((_, index) => (
                                        <Skeleton key={index} className="h-48 w-full rounded-md" />
                                    ))}
                            </div>
                        ) : (
                            <ProductGrid products={products} onProductClick={handleProductClick} />
                        )}

                        <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
                    </div>

                    <div className="hidden md:block">
                        <Cart
                            cart={cart}
                            updateCartItemQuantity={updateQuantity}
                            removeCartItem={removeItem}
                            cartTotal={cartTotal()}
                            cartItemCount={cartItemCount()}
                            showHeader={true}
                        />
                    </div>
                </div>
            </div>

            <ProductCustomizationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={selectedProduct}
                addOns={isLoadingAddons ? [] : addons}
                onAddToCart={addItem}
            />

            <OrderModal cart={cart} cartTotal={cartTotal()} />
        </div>
    );
};
