import { useState } from "react";
import { useLoading } from "../loading/useLoading";
import { ProductData } from "@/types/product/productTypes";

export const useSearchProductBehavior = () => {
    const [searchProducts, setSearchProducts] = useState<ProductData[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const searchGlobalLoading = useLoading(true);

    const clearProducts = () => {
        setSearchProducts([]);
        setSearchQuery("");
    };

    const handleSearchQuery = (query: string) => {
        setSearchQuery(query);
    }

    const handleSearchProducts = (products: ProductData[]) => {
        setSearchProducts(products);
    }

    return {
        searchProducts,
        searchQuery,
        clearProducts,
        handleSearchQuery,
        handleSearchProducts,
        searchGlobalLoading
    };
};