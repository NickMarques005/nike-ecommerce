"use client";

import React from "react";

interface NoSearchProductsProps {
    searchInput: string;
}

const NoSearchProducts: React.FC<NoSearchProductsProps> = ({ searchInput }) => {
    return (
        <div className="no-search-results-container">
            <h2 className="no-search-results-message">
                Não encontramos nenhum resultado para "{searchInput}".
            </h2>
        </div>
    );
};

export default NoSearchProducts;