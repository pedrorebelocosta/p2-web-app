import { SellableDetail } from "@/components/SellableDetail";

export default async function ServiceDetailPage({ params }: { params: { id: number } }) {
    const service = await (await fetch(`http://localhost:8080/api/services/${params.id}`)).json()
    
    const props = {
        ...service,
        type: 'product',
    }

    return <SellableDetail props={JSON.stringify(props)} />;
}