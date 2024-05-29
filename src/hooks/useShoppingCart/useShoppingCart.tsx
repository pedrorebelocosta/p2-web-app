'use client';

import { SellableType } from "@/components/SellableCard";
import { useCallback } from "react";
import { useLocalStorage } from "usehooks-ts"

export type ShoppingCartItem = { id: number, type: SellableType, qty: number };
export type UseShoppingCartReturn = {
    cartItems: ShoppingCartItem[];
    addCartItem: (item: ShoppingCartItem) => void;
    updateCartItemQuantity: (item: ShoppingCartItem) => void;
    removeCartItem: (item: ShoppingCartItem) => void;
    emptyCart: () => void;
}

const SHOPPING_CART_KEY = "shopping_cart_key";
const SHOPPING_CART_DEFAULT: ShoppingCartItem[] = [];

export const useShoppingCart = (): UseShoppingCartReturn => {
    const [cartItems, setCartItems] = useLocalStorage(SHOPPING_CART_KEY, SHOPPING_CART_DEFAULT);

    const addCartItem = useCallback((item: ShoppingCartItem) => {
        cartItems.push(item);
        setCartItems(cartItems);
    }, [cartItems, setCartItems]);

    const updateCartItemQuantity = useCallback((item: ShoppingCartItem) => {
        const foundItem = cartItems.find(cartItem => item.id === cartItem.id && item.type === cartItem.type);

        if (foundItem) {
            foundItem.qty = item.qty;
        }
    }, [cartItems]);

    const removeCartItem = useCallback((item: ShoppingCartItem) => {
        const newCartItems = cartItems.filter((cartItem) => item.id !== cartItem.id && item.type !== cartItem.type);
        setCartItems(newCartItems);
    }, [cartItems, setCartItems]);

    const emptyCart = useCallback(() => {
        setCartItems([]);
    }, [setCartItems]);

    return { cartItems, addCartItem, updateCartItemQuantity, removeCartItem, emptyCart };
}