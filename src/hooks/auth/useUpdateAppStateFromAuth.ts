import { useAuth } from "@/contexts/auth/AuthContext";
import { useCart } from "@/contexts/cart/CartContext";
import { useFavoriteProducts } from "@/contexts/product/FavoriteProductsContext";
import { useEffect } from "react";

export const useUpdateAppStateFromAuth = () => {

    const { user, authLoadingState } = useAuth();
    const { setFavorites } = useFavoriteProducts();
    const { setCart } = useCart();

    const clearUserRelatedStates = () => {
        setFavorites([]);
        setCart([]);
    }

    useEffect(() => {
        if (!user && !authLoadingState.loading) {
            clearUserRelatedStates();
        }
    }, [user, authLoadingState.loading]);

    return null;
}