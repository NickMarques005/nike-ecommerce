import { useCartNavigation } from "../navigation/cart/useCartNavigation";
import { useMainNavigation } from "../navigation/main/useMainNavigation"


export const useNavBarOptionHandler = () => {
    const { goToFavorites } = useMainNavigation();
    const { goToCartProducts } = useCartNavigation();

    const handleGoToFavorites = () => {
        goToFavorites();
    }

    const handleGoToCart = () => {
        goToCartProducts();
    }

    return {
        handleGoToFavorites,
        handleGoToCart
    }
}