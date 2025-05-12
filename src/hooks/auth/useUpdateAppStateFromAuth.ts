import { useAuth } from "@/contexts/auth/AuthContext";
import { useFavoriteProducts } from "@/contexts/product/FavoriteProductsContext";
import { useEffect } from "react";

export const useUpdateAppStateFromAuth = () => {

    const { user } = useAuth();
    const { setFavorites } = useFavoriteProducts();

    const clearUserRelatedStates = () => {
        setFavorites([]);
    }

    useEffect(() => {
        if (!user) {
            clearUserRelatedStates();
        }
    }, [user]);

    return null;
}