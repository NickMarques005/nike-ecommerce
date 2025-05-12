import { useFavoriteProductService } from "@/hooks/api/product/useFavoriteProductService";
import { useLoading } from "@/hooks/loading/useLoading";
import { useInitializeFavoriteProductsOnAppLoad } from "@/hooks/product/useInitializeFavoriteProductsOnAppLoad";
import { favoriteProductReducer } from "@/reducer/product/favoriteProductReducer";
import { LoadingStructure } from "@/types/loading/LoadingTypes";
import { ProductData } from "@/types/product/productTypes";
import React, { createContext, useContext, useReducer } from "react";

interface FavoriteProductContextType {
    favoriteProducts: ProductData[];
    addFavorite: (product: ProductData) => void;
    removeFavorite: (productId: string) => void;
    setFavorites: (products: ProductData[]) => void;
    fetchFavoriteProductsLoading: LoadingStructure;
}

const FavoriteProductContext = createContext<FavoriteProductContextType | undefined>(undefined);

export const FavoriteProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favoriteProducts, dispatch] = useReducer(favoriteProductReducer, []);
    const favoriteProductLoading = useLoading();
    const {
        performAddFavorite,
        performRemoveFavorite
    } = useFavoriteProductService(favoriteProductLoading.setLoading);

    const addFavorite = async (product: ProductData) => {
        try {
            await performAddFavorite(product._id);
            dispatch({ type: "ADD_FAVORITE", payload: product });
        } catch (error) {
            console.error("Erro ao adicionar favorito:", error);
        }
    };

    const removeFavorite = async (productId: string) => {
        try {
            await performRemoveFavorite(productId);
            dispatch({ type: "REMOVE_FAVORITE", payload: productId });
        } catch (error) {
            console.error("Erro ao remover favorito:", error);
        }
    };

    const setFavorites = (products: ProductData[]) => {
        dispatch({ type: "SET_FAVORITES", payload: products });
    };

    const { fetchFavoriteProductsLoading } = useInitializeFavoriteProductsOnAppLoad({ setFavorites });

    return (
        <FavoriteProductContext.Provider value={{ 
            favoriteProducts, addFavorite, 
            removeFavorite, setFavorites, fetchFavoriteProductsLoading
            }}>
            {children}
        </FavoriteProductContext.Provider>
    );
};

export const useFavoriteProducts = () => {
    const context = useContext(FavoriteProductContext);
    if (!context) throw new Error("useFavoriteProducts must be used within a FavoriteProductProvider");
    return context;
};