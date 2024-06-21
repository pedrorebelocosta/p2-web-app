import { SellableType } from "@/components/SellableCard";
import Image from "next/image";
import { useCallback } from "react";

export type CartListItem = {
    id: number;
    type: SellableType;
    title: string;
    qty: number;
    price: number;
    imageUrl: string;
    href: string;
}

export type CartListItemCallbacks = {
    onItemDelete: (id: number, type: SellableType) => void;
}

export type CartListItemProps = CartListItem & CartListItemCallbacks;

export const CartListItem = ({ id, type, title, imageUrl, price, qty, href, onItemDelete }: CartListItemProps) => {
    const onDeleteRequest = useCallback(() => onItemDelete(id, type), [id, type, onItemDelete]);

    return (
        <li key={`${id}-${type}`} className="flex py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <Image
                    src={imageUrl ?? '/image_not_found.jpg'}
                    className="h-full w-full object-cover object-center"
                    alt={title}
                    width={24}
                    height={24}
                    unoptimized
                />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                            <a href={href}>{title}</a>
                        </h3>
                        <p className="ml-4">{price} EUR</p>
                    </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Qty {qty}</p>

                    <div className="flex">
                        <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={onDeleteRequest}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </li>);
}