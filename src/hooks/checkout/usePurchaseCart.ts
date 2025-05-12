import { CartProductData } from "@/types/cart/CartTypes"
import { getDiscountedPrice } from "@/utils/prices/calculatePrices"
import { useLoading } from "../loading/useLoading";

export const usePurchaseCart = () => {
    const purchaseLoading = useLoading();

    const createCheckoutProduct = (cartProduct: CartProductData) => {
        const price = getDiscountedPrice(cartProduct.product.initial_price, cartProduct.product.discount);
        
        return {
            id: cartProduct.product._id,
            name: cartProduct.product.name,
            quantity: cartProduct.quantity,
            image: cartProduct.product.imgs[0],
            price: price
        }
    }

    const handlePurchaseCart = (cartProducts: CartProductData[]) => {
        const checkoutProducts = cartProducts.map((product) => {
            createCheckoutProduct(product);
        })

        console.log("Produtos de Checkout -> ", checkoutProducts);
    }

    return {
        handlePurchaseCart,
        purchaseLoading
    }
}