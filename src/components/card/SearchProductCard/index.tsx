"use client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import styles from "./search-product-card.module.css";
import { ProductData } from "@/types/product/productTypes";
import { getDiscountedPrice, getInstallmentText } from "@/utils/prices/calculatePrices";
import MainPaths from "@/constants/paths/appPaths/mainPaths";
import { useFavoriteProductHandler } from "@/hooks/product/useFavoriteProductHandler";

interface SearchProductCardProps {
    product: ProductData;
}

const SearchProductCard: React.FC<SearchProductCardProps> = ({ product }) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const navigate = useNavigate();
    const {
        handleAddProductToFavorites,
        handleRemoveProductFromFavorites,
        isProductInFavorites,
        favoriteProducts
    } = useFavoriteProductHandler();

    useEffect(() => {
        setIsFavorited(isProductInFavorites(product));
    }, [favoriteProducts, product]);

    const toggleFavorite = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isFavorited) {
            await handleRemoveProductFromFavorites(product._id);
        } else {
            await handleAddProductToFavorites(product);
        }
    };

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                stars.push(<FaStar key={i} className="star filled" />);
            } else if (rating >= i - 0.5) {
                stars.push(<FaStarHalfAlt key={i} className="star half" />);
            } else {
                stars.push(<FaRegStar key={i} className="star empty" />);
            }
        }
        return stars;
    };

    const finalPrice = getDiscountedPrice(product.initial_price, product.discount);
    const installmentText = getInstallmentText(finalPrice, product.max_installments || 0);

    return (
        <div className={styles["search-product-card"]} onClick={() => navigate(`/${MainPaths.BasicPaths.PRODUCT}/${product._id}`)}>
            <img
                src={product.imgs[0]}
                alt={product.name}
                className={styles["search-product-image"]}
                draggable={false}
            />
            <div className={styles["search-product-info"]}>
                <h3 className={styles["search-product-title"]}>{product.name}</h3>
                <p className={styles["search-product-category"]}>{product.subcategory}</p>
                <div className={styles["search-product-rating"]}>
                    {renderStars(product.rating[0].rating_stars)}
                </div>
                <div className={styles["search-product-price"]}>
                    {product.discount > 0 ? (
                        <>
                            <span className={styles["price-original"]}>
                                {product.initial_price.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                })}
                            </span>
                            <strong className={styles["price-discounted"]}>
                                {finalPrice.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                })}
                            </strong>
                        </>
                    ) : (
                        <strong>
                            {product.initial_price.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            })}
                        </strong>
                    )}
                    {installmentText && <p className={styles["installment-text"]}>{installmentText}</p>}
                </div>
            </div>
            <button
                className={styles["search-product-favorite-btn"]}
                onClick={toggleFavorite}
                aria-label="Favoritar"
            >
                {isFavorited ? (
                    <FaHeart className={styles["heart-icon filled"]} color="#020202" />
                ) : (
                    <FaRegHeart className={styles["heart-icon"]} />
                )}
            </button>
        </div>
    );
};

export default SearchProductCard;
