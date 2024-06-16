export const getClientTier = (discountRate: number) => {
    if (discountRate === 0) { return 'Standard' }
    if (discountRate > 15) return 'VIP';

    if (discountRate > 0 && discountRate <= 5) { 
        return 'Silver';
    }

    if (discountRate > 5 && discountRate <= 10) {
        return 'Gold';
    }

    if (discountRate > 10 && discountRate <= 15) {
        return 'Platinum';
    }
}