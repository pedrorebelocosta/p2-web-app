'use client';

import { useFetchSWR } from "@/hooks/useFetchSWR";
import { useShoppingCart } from "@/hooks/useShoppingCart";
import { useCallback, useMemo } from "react";
import CartListItem from "./components";
import { buildCartListItems } from "./util";
import { SellableType } from "../SellableCard";

export const CartList = () => {
    const { data: products } = useFetchSWR("http://localhost:8080/api/products");
    const { data: services } = useFetchSWR("http://localhost:8080/api/services");

    const { cartItems, removeCartItem } = useShoppingCart();

    const cartListItems = useMemo<CartListItem[]>(
        () => buildCartListItems(cartItems, products, services),
        [cartItems, products, services]
    );

    const onItemDelete = useCallback((id: number, type: SellableType) => {
        removeCartItem({ id, type, qty: 0 });
    }, [removeCartItem]);

    return (
        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div className="flex items-start justify-between">
                    <div className="text-lg font-medium text-gray-900">Shopping cart</div>
                </div>
                <div className="mt-8">
                    <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cartListItems.map(
                                (item) => <CartListItem
                                    key={`${item.id}-${item.type}`}
                                    id={item.id}
                                    type={item.type}
                                    title={item.title}
                                    qty={item.qty}
                                    price={item.price}
                                    imageUrl={item.imageUrl}
                                    href={item.href}
                                    onItemDelete={onItemDelete} />
                            )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartList;
