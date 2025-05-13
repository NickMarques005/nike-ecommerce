import { useCart } from "@/contexts/cart/CartContext";
import { useFavoriteProducts } from "@/contexts/product/FavoriteProductsContext"


export const useNavBarStateBehavior = () => {

    const { favoriteProducts } = useFavoriteProducts();
    const { cart, getTotalItemsFromCart } = useCart();

    return {
        favoriteProducts,
        cart,
        getTotalItemsFromCart
    }
}