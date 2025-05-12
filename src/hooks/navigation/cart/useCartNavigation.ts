import CartPaths from "@/constants/paths/appPaths/cartPaths";
import { useNavigate } from "react-router-dom";
export function useCartNavigation() {
    const navigate = useNavigate();

    const goToCartRoot = () => navigate(CartPaths.BasicPaths.ROOT);
    const goToCartProducts = () => navigate(CartPaths.CartCompletePaths.CART_PRODUCTS);
    const goToCartIdentification = () => navigate(CartPaths.CartCompletePaths.IDENTIFICATION);
    const goToCartPurchase = () => navigate(CartPaths.CartCompletePaths.PURCHASE);

    return {
        goToCartRoot,
        goToCartProducts,
        goToCartIdentification,
        goToCartPurchase,
    };
}