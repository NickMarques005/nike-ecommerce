import CartPaths from "@/constants/paths/appPaths/cartPaths";
import { useNavigate } from "react-router-dom";
export function useCartNavigation() {
    const navigate = useNavigate();

    const goToCartRoot = () => navigate(CartPaths.BasicPaths.ROOT);
    const goToCartCheckout = () => navigate(CartPaths.CartCompletePaths.CHECKOUT);

    return {
        goToCartRoot,
        goToCartCheckout
    };
}