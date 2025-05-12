"use client";

import SearchProductCard from "@/components/card/SearchProductCard";
import { ProductData } from "@/types/product/productTypes";

interface FavoritesProductListProps {
    favoriteProductList: ProductData[];
}

const FavoritesProductList = ({ favoriteProductList }: FavoritesProductListProps) => {
    return (
        <div className="favorites-product-list">
            {favoriteProductList.map((product) => (
                <SearchProductCard key={product._id} product={product} />
            ))}
        </div>
    );
};

export default FavoritesProductList;