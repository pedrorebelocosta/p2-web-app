import { Product } from "@/app/products/page";
import { Service } from "@/app/services/page";
import { ShoppingCartItem } from "@/hooks/useShoppingCart";
import CartListItem from "./components";
import { SellableType } from "../SellableCard";

export const buildCartListItems = (
    cartItems: ShoppingCartItem[],
    products: Product[],
    services: Service[]
) => {
    if (!cartItems || !products || !services) return [];

    return cartItems.reduce<CartListItem[]>((acc, cur) => {
        const sellable: Product | Service = cur.type === SellableType.PRODUCT
            ? products.find((product: Product) => product.id == cur.id)
            : services.find((service: Service) => service.id == cur.id);

        const href = cur.type === SellableType.PRODUCT ? `/products/${cur.id}` : `/services/${cur.id}`;
        const item = {
            id: sellable.id,
            type: cur.type,
            title: sellable.title,
            qty: cur.qty,
            price: sellable.price as unknown as number,
            href,
            imageUrl: (sellable as Product).imagePath
        }
        acc.push(item);
        return acc;
    }, []);
}

export const calculateCartTotal = (
    cartItems: ShoppingCartItem[],
    products: Product[],
    services: Service[]
) => {

    if (!cartItems || !products || !services) return 0;
    
    return cartItems.reduce<number>(
        (acc, cur) => {
            const sellable: Product | Service = cur.type === SellableType.PRODUCT
                ? products.find((product: Product) => product.id == cur.id)
                : services.find((service: Service) => service.id == cur.id);

            return acc + Number(sellable.price) * cur.qty;
        }, 0);
}
