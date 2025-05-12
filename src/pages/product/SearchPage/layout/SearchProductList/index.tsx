"use client";

import SearchProductCard from "@/components/card/SearchProductCard";
import { ProductData } from "@/types/product/productTypes";
import React from "react";

interface SearchProductListProps {
    searchProductList: ProductData[];
}

const SearchProductList: React.FC<SearchProductListProps> = ({
    searchProductList,
}) => {

    return (
        <div className="search-product-list">
            {searchProductList.map((product) => (
                <SearchProductCard key={product._id} product={product} />
            ))}
        </div>
    );
};

export default SearchProductList;