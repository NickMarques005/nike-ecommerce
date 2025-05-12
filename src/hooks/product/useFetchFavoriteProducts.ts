import { useFavoriteProducts } from "@/contexts/product/FavoriteProductsContext";
import { useFavoriteProductService } from "@/hooks/api/product/useFavoriteProductService";
import { useLoading } from "@/hooks/loading/useLoading";
import { useCallback } from "react";

export const useFetchFavoriteProducts = () => {
    const { setLoading } = useLoading();
    const { performGetAllFavorites } = useFavoriteProductService(setLoading);
    const { favoriteProducts, setFavorites } = useFavoriteProducts();

    const fetchFavorites = useCallback(async () => {
        try {
            const response = await performGetAllFavorites();

            if (response.success) {
                if (response.data) {
                    setFavorites(response.data);
                }
            }

        } catch (err) {
            console.error("Erro ao buscar favoritos:", err);
        }
    }, [performGetAllFavorites, setFavorites]);

    return { fetchFavorites, favoriteProducts };
};