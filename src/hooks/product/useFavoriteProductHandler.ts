
import { useFavoriteProducts } from "@/contexts/product/FavoriteProductsContext";
import { useGetToken } from "../api/auth/useGetToken";
import { useAuthNavigation } from "../navigation/auth/useAuthNavigation";
import { ProductData } from "@/types/product/productTypes";

export const useFavoriteProductHandler = () => {
    const { goToInitAuth } = useAuthNavigation();
    const { getIdToken } = useGetToken();
    const { addFavorite, removeFavorite, favoriteProducts } = useFavoriteProducts();

    const handleAddProductToFavorites = async (product: ProductData) => {
        const token = await getIdToken();
        if (!token) {
            console.error("Usuário não autenticado!");
            return goToInitAuth();
        }

        addFavorite(product);
    }

    const handleRemoveProductFromFavorites = async (productId: string) => {
        const token = await getIdToken();
        if (!token) {
            console.error("Usuário não autenticado!");
            return goToInitAuth();
        }

        removeFavorite(productId);
    }

    const isProductInFavorites = (product: ProductData): boolean => {
        return favoriteProducts.some((p) => p._id === product._id);
    };

    return {
        handleAddProductToFavorites,
        handleRemoveProductFromFavorites,
        isProductInFavorites,
        favoriteProducts
    }
}