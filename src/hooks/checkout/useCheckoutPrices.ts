import { useState } from "react"


export const useCheckoutPrices = () => {

    const [totalPrice, setTotalPrice] = useState<number | undefined>(undefined);

    const prices = {
        subTotal: 500,
        discountValue: 25,
        totalPrice: 375,
        totalCondition: 10,
        totalConditionPrice: 37.5
    }

    return {
        totalPrice,
        prices
    }
}