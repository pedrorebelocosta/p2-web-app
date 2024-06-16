import dynamic from "next/dynamic";
// Cart is client side using localStorage, therefore there will be mismatches between what is rendered server side and what the client renders
const CartListCSR = dynamic(() => import('../../components/CartList/CartList'), { ssr: false });

export default async function Cart() {
    return <CartListCSR />;
};
