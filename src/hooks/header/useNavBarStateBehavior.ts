import { useFavoriteProducts } from "@/contexts/product/FavoriteProductsContext"


export const useNavBarStateBehavior = () => {

    const { favoriteProducts } = useFavoriteProducts();

    return {
        favoriteProducts
    }
}