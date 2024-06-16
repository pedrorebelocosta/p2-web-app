'use client'

import {
    Button,
    Typography,
} from "@material-tailwind/react";
import { useShoppingCart } from "@/hooks/useShoppingCart";
import { SellableType } from "../SellableCard";

export const SellableDetail = ({ props }: { props: string }) => {
    const { id, type, title, price, categoryName, imagePath } = JSON.parse(props);
    const { addCartItem } = useShoppingCart();

    const onClickBuy = () => {
        // TODO add to cart, behavior when already in cart add +1
        addCartItem({ id, type, qty: 1 });
    }

    return (
        <section className="py-16 px-8">
            <div className="mx-auto container grid place-items-center grid-cols-1 md:grid-cols-2">
                <img
                    src={imagePath ?? '../image_not_found.jpg'}
                    className="h-[36rem]"
                />
                <div>
                    <Typography className="mb-4" variant="h3">
                        {title}
                    </Typography>
                    { type === SellableType.PRODUCT && <Typography className="mb-4" variant="h4">{categoryName}</Typography> }
                    <Typography variant="h5">{price} EUR</Typography>
                    <div className="mb-4 flex w-full items-center gap-3 md:w-1/2" onClick={onClickBuy}>
                        <Button color="gray" className="w-52" >
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
