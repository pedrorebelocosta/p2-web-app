'use client';

import { useShoppingCart } from "@/hooks/useShoppingCart";
import { SellableType } from "../SellableCard";

export const CartList = () => {
    const { cartItems, addCartItem } = useShoppingCart();

    return (<div>
        <button type="button" onClick={() => {
            addCartItem({ id: 1, type: SellableType.PRODUCT, qty: 1 });
        }}>Add Item to Cart</button>
        {cartItems.map((item) => <div key={item.id}>{item.id} {item.type} {item.qty} </div>)}
    </div>);
};

export default CartList;
