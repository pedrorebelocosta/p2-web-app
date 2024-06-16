import { SellableDetail } from "@/components/SellableDetail";

export default async function ProductDetailPage({ params }: { params: { id: number } }) {
    const product = await (await fetch(`http://localhost:8080/api/products/${params.id}`)).json()
    const category = await (await fetch(`http://localhost:8080/api/categories/${product.categoryId}`)).json();
    
    const props = {
        ...product,
        type: 'product',
        categoryName: category.title
    }

    return <SellableDetail props={JSON.stringify(props)} />;
}