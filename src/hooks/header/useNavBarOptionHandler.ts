import { useCartNavigation } from "../navigation/cart/useCartNavigation";
import { useMainNavigation } from "../navigation/main/useMainNavigation"


export const useNavBarOptionHandler = () => {
    const { goToFavorites } = useMainNavigation();
    const { goToCartCheckout } = useCartNavigation();

    const handleGoToFavorites = () => {
        goToFavorites();
    }

    const handleGoToCart = () => {
        goToCartCheckout();
    }

    return {
        handleGoToFavorites,
        handleGoToCart
    }
}