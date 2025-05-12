import { useSearchProducts } from "@/contexts/product/SearchProductsContext";
import { UseProductService } from "../api/product/useProductService";
import { useEffect } from "react";

interface UseFetchSearchProductsParams{
    query: string;
}

export const useFetchSearchProducts = ({
    query
}: UseFetchSearchProductsParams) => {
    const { searchGlobalLoading, 
        handleSearchProducts, handleSearchQuery
    } = useSearchProducts();

    const { performGetProductsBySearch } = UseProductService(searchGlobalLoading.setLoading);

    const fetchProductsBySearch = async (query: string) => {
        try {
            handleSearchQuery(query);
            const response = await performGetProductsBySearch(query);
            if (response?.success) {
                if (response.data) {
                    handleSearchProducts(response.data);
                }
            } else {
                handleSearchProducts([]);
                console.error("Houve um erro ao buscar os dados dos produtos: ", response.error);
            }
        }
        catch (err) {
            console.error("Houve um erro inesperado ao buscar dados dos produtos: ", err);
        }
    };

    useEffect(() => {
        fetchProductsBySearch(query);
    }, [query]);

    return {
        fetchProductsBySearch,
        searchGlobalLoading
    }
}