import { useState, useEffect } from 'react';
import { useSpecificProductHandler } from '@/hooks/product/useSpecificProductHandler';
import './specific-product-page-styles.css';
import { getDiscountedPrice } from '@/utils/prices/calculatePrices';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useFavoriteProductHandler } from '@/hooks/product/useFavoriteProductHandler';
import { useCartProductsHandler } from '@/hooks/cart/useCartProductsHandler';
import { formatBRLPrice } from '@/utils/prices/formatPrice';

const SpecificProductPage = () => {
    const {
        selectedProduct, productVariants, handleChangeProductParam
    } = useSpecificProductHandler();
    const [currentImageList, setCurrentImageList] = useState<string[]>([]);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    const {
        handleAddProductToFavorites,
        handleRemoveProductFromFavorites,
        isProductInFavorites,
        favoriteProducts,
    } = useFavoriteProductHandler();

    const {
        handleAddProductToCart
    } = useCartProductsHandler();

    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        if (selectedProduct) {
            setIsFavorited(isProductInFavorites(selectedProduct));
        }
    }, [selectedProduct, favoriteProducts]);

    const toggleFavorite = async () => {
        if (!selectedProduct) return;

        if (isFavorited) {
            await handleRemoveProductFromFavorites(selectedProduct._id);
        } else {
            await handleAddProductToFavorites(selectedProduct);
        }
    };

    useEffect(() => {
        if (!selectedProduct || !productVariants) return;

        const index = productVariants.findIndex(p => p._id === selectedProduct._id);
        if (index !== -1) {
            setCurrentImageList(productVariants[index]?.imgs || []);
        }
    }, [selectedProduct, productVariants]);

    const handleChangeVariant = (index: number) => {
        if (!productVariants) return;
        const variant = productVariants[index];
        setSelectedSize(null);
        handleChangeProductParam(variant._id);
    };

    const handleSizeSelect = (size: string) => {
        const newSize = size === selectedSize ? null : size
        setSelectedSize(newSize);
    };

    return (
        <div className="specific-product-main-container">
            {
                selectedProduct && <div className="specific-product-wrapper">
                    <div className="specific-product-imgs-container">
                        <div className="specific-product-img-section">
                            {currentImageList.length > 0 && (
                                <ul>
                                    {currentImageList.map((img, index) => (
                                        <li key={index}>
                                            <img src={img} alt={`Imagem ${index + 1}`} />
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className="specific-product-info-container">
                        <div className="specific-product-name-container">
                            <h1>{selectedProduct?.name}</h1>
                            <span>{selectedProduct?.subcategory}</span>
                        </div>

                        <div className="specific-product-price-container">
                            {selectedProduct?.discount !== undefined && (
                                <>
                                    <span className="buy-specific-product-new-price">
                                        { formatBRLPrice(getDiscountedPrice(selectedProduct.initial_price, selectedProduct.discount)) }
                                    </span>
                                    {selectedProduct?.discount > 0 && (
                                        <div className="buy-specific-product_prices-discount-container">
                                            <span className="buy-specific-product-inicial-price">
                                                {formatBRLPrice(selectedProduct.initial_price)}
                                            </span>
                                            <span className="buy-specific-product-discount">
                                                -{selectedProduct.discount}% off
                                            </span>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        <div className="specific-product-variant-main-container">
                            <div className="specific-product-color-container">
                                <span>
                                    <strong>Cor: </strong>
                                    {selectedProduct?.color}
                                </span>
                            </div>
                            {
                                productVariants &&
                                <div className="specific-product-variant-container">
                                    <ul>
                                        {productVariants.map((variant, index) => (
                                            <li key={index} onClick={() => handleChangeVariant(index)}>
                                                <img
                                                    className="itemType_img"
                                                    src={variant.imgs[0]}
                                                    alt={`Variante ${index}`}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            }
                            <div className="specific-product-sizes-container">
                                <span>
                                    <strong>Tamanho: </strong>
                                    {selectedSize || 'Selecione'}
                                </span>
                                <div className="buy-specific-product-size-ul-container">
                                    <ul>
                                        {selectedProduct?.sizes?.map(({ size, quantity }, index) => (
                                            <li
                                                key={index}
                                                className={`buy-specific-product_size_li ${quantity === 0 ? 'off' : 'on'
                                                    } ${selectedSize === size ? 'add' : ''}`}
                                                onClick={() => handleSizeSelect(size)}
                                            >
                                                <span className="itemType_size">{size}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="specific-product_purchase-wishlist-container">
                            <button
                                style={{
                                    opacity: selectedSize ? 1 : 0.5
                                }}
                                disabled={!selectedSize}
                                className={"buy-specific-product-purchase-button"} onClick={() => handleAddProductToCart(selectedProduct, selectedSize)}>
                                Adicionar ao carrinho
                            </button>
                            <button className="buy-specific-product-wishlist-button" onClick={toggleFavorite}>
                                <>
                                    {isFavorited ? (
                                        <>
                                            Salvo nos favoritos <FaHeart color="#000000" size={15} />
                                        </>
                                    ) : (
                                        <>
                                            Salvar como favoritos <FaRegHeart color="#999" size={15} />
                                        </>
                                    )}
                                </>
                            </button>
                        </div>

                        <div className="specific-product-description-container">
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: (selectedProduct?.description || '')
                                        .replace(/\\n/g, '\n')  // Converte \n literal em quebras de linha reais
                                        .replace(/\n/g, '<br />') // Converte quebras de linha reais em <br />
                                }}
                            />
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default SpecificProductPage;
