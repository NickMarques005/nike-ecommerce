"use client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    FaHeart,
    FaRegHeart,
    FaStar,
    FaStarHalfAlt,
    FaRegStar,
} from "react-icons/fa";
import styles from "./default-product-card.module.css";
import { ProductData } from "@/types/product/productTypes";
import { getDiscountedPrice, getInstallmentText } from "@/utils/prices/calculatePrices";
import MainPaths from "@/constants/paths/appPaths/mainPaths";
import { useFavoriteProductHandler } from "@/hooks/product/useFavoriteProductHandler";

interface DefaultProductCardProps {
    product: ProductData;
}

const DefaultProductCard: React.FC<DefaultProductCardProps> = ({ product }) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const {
        handleAddProductToFavorites,
        handleRemoveProductFromFavorites,
        isProductInFavorites,
        favoriteProducts
    } = useFavoriteProductHandler();

    useEffect(() => {
        setIsFavorited(isProductInFavorites(product));
    }, [favoriteProducts, product]);

    const toggleFavorite = async () => {
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
                stars.push(<FaStar key={i} color={"#000000"} className={styles["star filled"]} />);
            } else if (rating >= i - 0.5) {
                stars.push(<FaStarHalfAlt key={i} color={"#000000"} className={styles["star half"]} />);
            } else {
                stars.push(<FaRegStar key={i} color={"#000000"} className={styles["star empty"]} />);
            }
        }
        return stars;
    };

    const finalPrice = getDiscountedPrice(product.initial_price, product.discount);
    const installmentText = getInstallmentText(finalPrice, product.max_installments || 0);

    return (
        <div className={styles["default-product-card"]}>
            <Link to={`/${MainPaths.BasicPaths.PRODUCT}/${product._id}`} className={styles["default-product-link"]}>
                <img
                    src={product.imgs[0]}
                    alt={product.name}
                    className={styles["default-product-image"]}
                    draggable={false}
                />
                <div className={styles["default-product-info"]}>
                    <h3 className={styles["default-product-title"]}>{product.name}</h3>
                    <p className={styles["default-product-category"]}>{product.subcategory}</p>
                    <div className={styles["default-product-rating"]}>
                        {renderStars(product.rating[0].rating_stars)}
                    </div>
                    <div className={styles["default-product-price"]}>
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
                        {installmentText && (
                            <p className={styles["installment-text"]}>{installmentText}</p>
                        )}
                    </div>
                </div>
            </Link>

            <button
                className={styles["default-product-favorite-btn"]}
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    toggleFavorite();
                }}
                aria-label="Favoritar"
            >
                {isFavorited ? (
                    <FaHeart className={styles["heart-icon"]} color="#000000" />
                ) : (
                    <FaRegHeart className={styles["heart-icon"]} />
                )}
            </button>
        </div>
    );
};

export default DefaultProductCard;
