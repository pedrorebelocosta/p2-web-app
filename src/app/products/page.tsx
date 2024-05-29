import { SellableCard, SellableType } from "@/components/SellableCard";
import { SellableCardProps } from "@/components/SellableCard";

import styles from './style.module.scss';

type Product = {
    id: number;
    name: string;
    title: string;
    price: string;
    categoryId: number,
    imagePath: string;
}

type Category = {
    id: number;
    name: string;
    title: string;
}

export default async function Products() {
    const products = await (await fetch("http://localhost:8080/api/products")).json()
    const categories = await (await fetch("http://localhost:8080/api/categories")).json();

    const productCards = products.map((product: Product) => ({
        ...product,
        type: 'product',
        categoryName: categories.find((c: Category) => c.id === product.categoryId).title
    })) as SellableCardProps[];

    return (
        <div className={styles.ProductGrid}>
            {productCards.map((product) => <SellableCard props={JSON.stringify(product)} key={product.id} />)}
        </div>
    );
}
