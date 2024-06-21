'use client';

import { useFetchSWR } from "@/hooks/useFetchSWR";
import { useShoppingCart } from "@/hooks/useShoppingCart";
import { useCallback, useMemo } from "react";
import CartListItem from "./components";
import { buildCartListItems, calculateCartTotal } from "./util";
import { SellableType } from "../SellableCard";
import { useUserJwt } from "@/hooks/useUserJwt";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const CartList = () => {
    const { isLoggedIn, getToken } = useUserJwt();
    const { data: products } = useFetchSWR("http://localhost:8080/api/products");
    const { data: services } = useFetchSWR("http://localhost:8080/api/services");

    const { cartItems, removeCartItem, emptyCart } = useShoppingCart();
    const router = useRouter();

    const cartListItems = useMemo<CartListItem[]>(
        () => buildCartListItems(cartItems, products, services),
        [cartItems, products, services]
    );

    const totalPrice = useMemo(
        () => calculateCartTotal(cartItems, products, services),
        [cartItems, products, services]
    );

    const onItemDelete = useCallback((id: number, type: SellableType) => {
        removeCartItem({ id, type, qty: 0 });
    }, [removeCartItem]);

    const onCompletePurchase = useCallback(async () => {
        if (!cartItems) return;

        const mappedItems = cartItems.map(item => ( {
            ...item,
            type: item.type.toLocaleUpperCase()
        }));  

        await fetch('http://localhost:8080/api/users/me/orders', {
            method: 'POST',
            body: JSON.stringify({ cart_items: mappedItems }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': `Bearer ${getToken()}`
            })
        }).then((res) => {
            if (res.ok) {
                emptyCart();
                router.push("/cart/success");
            }
        })
    }, [cartItems, emptyCart, getToken, router]);

    return (
        <>
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
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between mt-5">
                <div>Total</div>
                <div>{totalPrice} EUR</div>
            </div>
            {!isLoggedIn ?
                <Link href={'/user/login'}>
                    <h3 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{!isLoggedIn && "Please login to proceed to checkout"}</h3>
                </Link> :
                <>
                    <h3 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Payment Method</h3>
                    <div className="flex items-center mb-4">
                        <input id="default-radio-1" checked readOnly type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-gray-900">Pay in store</label>
                    </div>
                    <button className="flex mt-10 items-end w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onCompletePurchase}><div>Complete Purchase</div></button>
                </>
            }

        </>
    );
};

export default CartList;
