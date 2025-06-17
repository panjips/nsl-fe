import type { CreateOrderProductItemDTOType } from "@/modules/feature-pos";
import { useState, useEffect } from "react";

export interface CartAddon {
    addon_id: string | number;
    quantity: number;
    name?: string;
    price?: number;
}

export interface CartProduct {
    product_id: string | number;
    quantity: number;
    name?: string;
    price?: number;
    addons: CartAddon[];
}

export const cartToDTO = (cart: CartProduct[]): CreateOrderProductItemDTOType[] => {
    return cart.map((item) => ({
        product_id: Number(item.product_id),
        quantity: item.quantity,
        addons: item.addons.map((addon) => ({
            addon_id: Number(addon.addon_id),
            quantity: addon.quantity,
        })),
    }));
};

const CART_STORAGE_KEY = "online-order-cart";

export const useCart = () => {
    const [cart, setCart] = useState<CartProduct[]>(() => {
        try {
            const savedCart = localStorage.getItem(CART_STORAGE_KEY);
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error("Failed to parse cart from localStorage", error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }, [cart]);

    const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cart.reduce((total, item) => {
        let itemTotal = (item.price || 0) * item.quantity;

        if (item.addons && item.addons.length > 0) {
            itemTotal +=
                item.addons.reduce((addonTotal, addon) => addonTotal + (addon.price || 0) * addon.quantity, 0) *
                item.quantity;
        }

        return total + itemTotal;
    }, 0);

    const addToCart = (product: any, quantity: number = 1, addons: CartAddon[] = []) => {
        if (!product || !product.id) {
            console.error("Invalid product provided to addToCart:", product);
            return;
        }

        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex((item) => {
                const productMatches = item.product_id === product.id;

                if ((!item.addons || item.addons.length === 0) && addons.length === 0) {
                    return productMatches;
                }

                if (item.addons?.length !== addons.length) {
                    return false;
                }

                const allAddonsMatch =
                    addons.every((newAddon) =>
                        item.addons.some((existingAddon) => existingAddon.addon_id === newAddon.addon_id),
                    ) &&
                    item.addons.every((existingAddon) =>
                        addons.some((newAddon) => newAddon.addon_id === existingAddon.addon_id),
                    );

                return productMatches && allAddonsMatch;
            });

            if (existingItemIndex >= 0) {
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex] = {
                    ...updatedCart[existingItemIndex],
                    quantity: updatedCart[existingItemIndex].quantity + quantity,
                };

                return updatedCart;
            } else {
                const newItem: CartProduct = {
                    product_id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: quantity,
                    addons: addons.map((addon) => ({
                        addon_id: addon.addon_id,
                        name: addon.name,
                        price: addon.price,
                        quantity: addon.quantity || 1,
                    })),
                };

                const newCart = [...prevCart, newItem];
                console.log("Added new product to cart:", newCart);
                return newCart;
            }
        });
    };

    const removeFromCart = (productId: string | number) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.filter((item) => {
                if (item.product_id !== productId) return true;

                return false;
            });

            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));

            return updatedCart;
        });
    };

    const updateQuantity = (productId: string | number, quantity: number, addons: CartAddon[] = []) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setCart((prevCart) => {
            const updatedCart = prevCart.map((item) => {
                if (item.product_id !== productId) return item;

                if (addons.length > 0) {
                    if (item.addons.length !== addons.length) return item;

                    const allAddonsMatch = addons.every((targetAddon) =>
                        item.addons.some((existingAddon) => existingAddon.addon_id === targetAddon.addon_id),
                    );

                    if (!allAddonsMatch) return item;
                } else if (item.addons.length > 0) {
                    return item;
                }

                return { ...item, quantity };
            });

            // Update localStorage immediately with the new cart state
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));

            return updatedCart;
        });
    };

    const clearCart = () => {
        localStorage.removeItem(CART_STORAGE_KEY);
        setCart([]);
    };

    return {
        cart,
        cartItemsCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
    };
};
