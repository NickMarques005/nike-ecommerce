import { CartProductData } from "@/types/cart/CartTypes";
import { getDiscountedPrice } from "@/utils/prices/calculatePrices";
import { useEffect, useState } from "react"

interface UseCheckoutPricesParams {
    cart: CartProductData[];
}

interface CheckoutPrices {
    subTotal: number;
    discountValue: number;
    totalPrice: number;
    installments: number;
    installmentPrice: number;
}

export const useCheckoutPrices = ({ cart }: UseCheckoutPricesParams) => {

    const [prices, setPrices] = useState<CheckoutPrices>({
        subTotal: 0,
        discountValue: 0,
        totalPrice: 0,
        installments: 1,
        installmentPrice: 0
    });

    useEffect(() => {
        if (!cart || cart.length === 0) {
            setPrices({
                subTotal: 0,
                discountValue: 0,
                totalPrice: 0,
                installments: 1,
                installmentPrice: 0
            });
            return;
        }

        let subTotal = 0;
        let totalDiscount = 0;
        let totalPrice = 0;

        cart.forEach(({ product, quantity }) => {
            const price = product.initial_price;
            const discountPrice = product.discount > 0 ?
                getDiscountedPrice(product.initial_price, product.discount) : price;

            subTotal += price * quantity;
            totalPrice += discountPrice * quantity;
            totalDiscount += (price - discountPrice) * quantity;
        });

        const installments = Math.min(15, cart.length);
        const installmentPrice = parseFloat((totalPrice / installments).toFixed(2));

        setPrices({
            subTotal,
            discountValue: totalDiscount,
            totalPrice,
            installments,
            installmentPrice
        });

    }, [cart]);

    return { prices };
}