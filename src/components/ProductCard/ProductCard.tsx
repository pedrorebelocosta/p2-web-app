'use client';

export type ProductCardProps = {
    id: number;
    title: string;
    price: string;
    categoryName: string;
    imagePath: string;
}

export const ProductCard = ({ props }: { props: string }) => {
    const { id, title, price, categoryName, imagePath } = JSON.parse(props);
    
    const onClickBuy = () => {
        // TODO add to cart, behavior when already in cart add +1
    }

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full h-[320px] object-scale-down" src={imagePath ?? 'image_not_found.jpg'} alt="Sunset in the mountains" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
            </div>
            <div className="px-6 pt-4 pb-2">
                Price: <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{price} EUR</div>
                Category: <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{categoryName}</div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onClickBuy}>Buy</button>
            </div>
        </div>
    );
}