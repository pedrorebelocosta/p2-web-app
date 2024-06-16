import { SellableCard } from '@/components/SellableCard';
import styles from './style.module.scss';

export type Service = {
    id: number;
    name: string;
    title: string;
    price: string;
}

export default async function Services() {
    const services = await (await fetch('http://localhost:8080/api/services')).json() as Service[];

    const serviceCards = services.map((service) => ({
        ...service,
        type: 'service',
    }));

    return (
        <div className={styles.ProductGrid}>
            {serviceCards.map((service) => <SellableCard props={JSON.stringify(service)} key={service.id} />)}
        </div>
    )
}
