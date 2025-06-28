import { useEffect, useRef, useState } from "react";
import { ProductCustomizationModal, ProductGrid, SearchAndFilters, POSHeader, Cart } from "../components";
import type { Product } from "../domain";
import { useProducts, useAddons } from "../hooks";
import { useCartStore } from "../stores";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderModal } from "../components/order-modal";
import { useNotificationStore } from "@/stores";
import { toast } from "sonner";
import { ConfirmationInvoiceModal } from "../components/confirmation-invoice-modal";
import { ConfirmationStrickerModal } from "../components/sticker-detail-product-modal";

export const POSPage = () => {
    const {
        products,
        categories,
        isLoading: isLoadingProducts,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
    } = useProducts();

    const { addons, isLoading: isLoadingAddons } = useAddons();

    const socket = useNotificationStore((s) => s.socket);
    const toastShownRef = useRef(false);

    useEffect(() => {
        console.log(socket);
        if (!socket || toastShownRef.current) return;

        const handleNewOrder = (order: any) => {
            toastShownRef.current = true;
            toast(`🛒 New order received, ${order.items.length} item(s)`, {
                duration: Infinity,
                action: {
                    label: "Dismiss",
                    onClick: () => {
                        toast.dismiss();
                        toastShownRef.current = false;
                    },
                },
            });
        };

        socket.on("new_online_order", handleNewOrder);

        return () => {
            socket.off("new_order", handleNewOrder);
            toastShownRef.current = false;
        };
    }, [socket]);

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

            <div className="h-fit">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 calc(100vh - rem)">
                    <div className="md:col-span-2 space-y-6">
                        <SearchAndFilters
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            categories={categories}
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
                            <div className="h-[calc(100vh-18.5rem)] overflow-y-auto">
                                <ProductGrid products={products} onProductClick={handleProductClick} />
                            </div>
                        )}
                    </div>

                    <div className="hidden md:block">
                        <div className="h-[calc(100vh-10rem)] ">
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
            </div>

            <ProductCustomizationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={selectedProduct}
                addOns={isLoadingAddons ? [] : addons}
                onAddToCart={addItem}
            />

            <OrderModal cart={cart} cartTotal={cartTotal()} />
            <ConfirmationInvoiceModal />
            <ConfirmationStrickerModal />
        </div>
    );
};
