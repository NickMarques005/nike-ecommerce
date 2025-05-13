// BannerProductCard.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import styles from "./banner-product-card.module.css";
import { ProductData } from "@/types/product/productTypes";
import { getDiscountedPrice, getInstallmentText } from "@/utils/prices/calculatePrices";
import MainPaths from "@/constants/paths/appPaths/mainPaths";
import { useFavoriteProductHandler } from "@/hooks/product/useFavoriteProductHandler";
import { formatBRLPrice } from "@/utils/prices/formatPrice";

interface BannerProductCardProps {
    product: ProductData;
}

const BannerProductCard: React.FC<BannerProductCardProps> = ({ product }) => {
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
                stars.push(<FaStar key={i} color={"orange"} className={styles["star filled"]} />);
            } else if (rating >= i - 0.5) {
                stars.push(<FaStarHalfAlt key={i} color={"orange"} className={styles["star half"]} />);
            } else {
                stars.push(<FaRegStar key={i} color={"orange"} className={styles["star empty"]} />);
            }
        }
        return stars;
    };

    const finalPrice = getDiscountedPrice(product.initial_price, product.discount);
    const installmentText = getInstallmentText(finalPrice, product.max_installments || 0);

    return (
        <div className={styles["banner-product-card"]} onClick={() => navigate(`/${MainPaths.BasicPaths.PRODUCT}/${product._id}`)}>
            <img
                src={product.imgs[0]}
                alt={product.name}
                className={styles["banner-product-image"]}
                draggable={false}
            />
            <div className={styles["banner-product-info"]}>
                <h3 className={styles["banner-product-title"]}>{product.name}</h3>
                <div className={styles["banner-product-rating"]}>
                    {renderStars(product.rating[0].rating_stars)}
                </div>
                <div className={styles["banner-product-price"]}>
                    {product.discount > 0 ? (
                        <>
                            <span className={styles["price-original"]}>
                                {formatBRLPrice(product.initial_price)}
                            </span>
                            <strong className={styles["price-discounted"]}>
                                {formatBRLPrice(finalPrice)}
                            </strong>
                        </>
                    ) : (
                        <strong>
                            {formatBRLPrice(product.initial_price)}
                        </strong>
                    )}
                    {installmentText && <p className={styles["installment-text"]}>{installmentText}</p>}
                </div>
            </div>
            <button
                className={styles["banner-product-favorite-btn"]}
                onClick={toggleFavorite}
                aria-label="Favoritar"
            >
                {isFavorited ? (
                    <FaHeart className={styles["heart-icon filled"]} color="#f59300" />
                ) : (
                    <FaRegHeart className={styles["heart-icon"]} />
                )}
            </button>
        </div>
    );
};

export default BannerProductCard;
