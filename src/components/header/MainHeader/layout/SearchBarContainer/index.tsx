import React from "react";
import { FaHeart, FaShoppingBag } from "react-icons/fa";
import "./search-bar-container.css";
import SearchInputField from "@/components/form-inputs/SearchInputField";
import { useSearchInputHandler } from "@/hooks/search/useSearchInputHandler";
import { useNavBarOptionHandler } from "@/hooks/header/useNavBarOptionHandler";
import { useNavBarStateBehavior } from "@/hooks/header/useNavBarStateBehavior";

const SearchBarContainer: React.FC = () => {
    const {
        searchValue,
        handleInputChange,
        handleSubmit,
    } = useSearchInputHandler();

    const { favoriteProducts } = useNavBarStateBehavior();
    const { handleGoToFavorites, handleGoToCart } = useNavBarOptionHandler();

    return (
        <div className="search-bar-container">
            <SearchInputField
                inputProps={{
                    value: searchValue,
                    onChange: handleInputChange,
                    placeholder: "Buscar",
                    name: "search"
                }}
                onSubmit={handleSubmit}
            />
            <button className="icon-button" aria-label="Favoritos" onClick={handleGoToFavorites}>
                <FaHeart />
                {favoriteProducts.length > 0 && (
                    <div className={"products-badge"}>
                        <span>{favoriteProducts.length}</span>
                    </div>
                )}
            </button>
            <button className="icon-button" aria-label="Carrinho" onClick={handleGoToCart}>
                <FaShoppingBag />
            </button>
        </div>
    );
};

export default SearchBarContainer;