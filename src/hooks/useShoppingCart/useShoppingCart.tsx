'use client';

import { SellableType } from "@/components/SellableCard";
import { useCallback, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts"

export type ShoppingCartItem = { id: number, type: SellableType, qty: number };
export type UseShoppingCartReturn = {
    cartItems: ShoppingCartItem[];
    addCartItem: (item: ShoppingCartItem) => void;
    removeCartItem: (item: ShoppingCartItem) => void;
    emptyCart: () => void;
}

const SHOPPING_CART_KEY = "shopping_cart_key";
const SHOPPING_CART_DEFAULT: ShoppingCartItem[] = [];

export const useShoppingCart = (): UseShoppingCartReturn => {
    const [cartItems, setCartItems] = useLocalStorage(SHOPPING_CART_KEY, SHOPPING_CART_DEFAULT);

    const addCartItem = useCallback((item: ShoppingCartItem) => {
        const newArray = [...cartItems];
        const foundItem = newArray.find(cartItem => item.id === cartItem.id && item.type === cartItem.type);

        if (foundItem) {
            foundItem.qty += 1;
            setCartItems(newArray);
            return;
        }

        newArray.push(item);
        setCartItems(newArray);
    }, [cartItems, setCartItems]);

    const removeCartItem = useCallback((item: ShoppingCartItem) => {
        const newCartItems = cartItems.filter((cartItem) => !(item.id === cartItem.id && item.type === cartItem.type));
        setCartItems(newCartItems);
    }, [cartItems, setCartItems]);

    const emptyCart = useCallback(() => {
        setCartItems([]);
    }, [setCartItems]);

    return { cartItems, addCartItem, removeCartItem, emptyCart };
}
