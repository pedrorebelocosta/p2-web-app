'use client';

import { useShoppingCart } from "@/hooks/useShoppingCart";
import Link from "next/link";

export enum SellableType {
    PRODUCT = 'product',
    SERVICE = 'service'
}

export type SellableItemProps = {
    id: number;
    type: SellableType;
    title: string;
    price: string;
    categoryName?: string;
    imagePath?: string;
}

export const SellableCard = ({ props }: { props: string }) => {
    const { id, type, title, price, categoryName, imagePath } = JSON.parse(props);
    const { addCartItem } = useShoppingCart();

    
    const onClickBuy = () => {
        // TODO add to cart, behavior when already in cart add +1
        addCartItem({ id, type, qty: 1 });
    }

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <Link href={type === SellableType.PRODUCT ? `/products/${id}` : `/services/${id}`}>
                <img className="w-full h-[320px] object-scale-down" src={imagePath ?? 'image_not_found.jpg'} alt="Sunset in the mountains" />
            </Link>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
            </div>
            <div className="px-6 pt-4 pb-2">
                Price: <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{price} EUR</div>
                { type === SellableType.PRODUCT && <>Category: <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{categoryName}</div></> }
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onClickBuy}>Add to Cart</button>
            </div>
        </div>
    );
}