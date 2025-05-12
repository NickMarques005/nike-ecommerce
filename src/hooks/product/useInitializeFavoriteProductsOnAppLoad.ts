import { useEffect } from "react";
import { useAuth } from "@/contexts/auth/AuthContext";
import { useFavoriteProductService } from "@/hooks/api/product/useFavoriteProductService";
import { useLoading } from "@/hooks/loading/useLoading";
import { ProductData } from "@/types/product/productTypes";

interface UseInitializeFavoriteProductsOnAppLoadParams{
    setFavorites: (products: ProductData[]) => void;
}

export const useInitializeFavoriteProductsOnAppLoad = ({
    setFavorites
}: UseInitializeFavoriteProductsOnAppLoadParams) => {
    const { user } = useAuth();
    const fetchFavoriteProductsLoading = useLoading(true);
    const { performGetAllFavorites } = useFavoriteProductService(fetchFavoriteProductsLoading.setLoading);

    useEffect(() => {
        const fetchInitialFavorites = async () => {
            try {
                if (!user){ 
                    console.log("Usuário não autenticado. Não buscar produtos favoritados");
                    return;
                }

                const response = await performGetAllFavorites();

                if (response.success && response.data) {
                    setFavorites(response.data);
                }
            } catch (error) {
                console.error("Erro ao carregar favoritos iniciais:", error);
            }
        };

        fetchInitialFavorites();
    }, [user]);

    return {
        fetchFavoriteProductsLoading
    }
};