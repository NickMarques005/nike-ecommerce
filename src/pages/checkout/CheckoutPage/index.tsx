import { PuffLoader } from "react-spinners";
import { useCart } from '@/contexts/cart/CartContext';
import { useCheckoutPrices } from '@/hooks/checkout/useCheckoutPrices';
import { usePurchaseCart } from '@/hooks/checkout/usePurchaseCart';
import { FaCartShopping } from "react-icons/fa6";
import "./checkout-page.css";
import NoCartProducts from "./layout/NoCartProducts";
import DefaultHeader from "@/components/header/DefaultHeader";
import { useCartProductsHandler } from "@/hooks/cart/useCartProductsHandler";
import { FaPlus, FaMinus } from "react-icons/fa";
import { formatBRLPrice } from "@/utils/prices/formatPrice";

const CheckoutPage = () => {

    const { cart } = useCart();
    const { purchaseLoading } = usePurchaseCart();
    const { handleAddProductToCart, handleDecreaseProductFromCart } = useCartProductsHandler();
    const { prices } = useCheckoutPrices({ cart });
    const isCartEmpty = cart.length === 0;

    return (
        <div className="checkout-container">
            <DefaultHeader />
            <div className="cart-products-container">
                {
                    isCartEmpty ? (
                        <NoCartProducts />
                    ) : (
                        <ul>
                            {
                                Object.values(cart).map((item, index) => (
                                    <li key={`${item.product._id}-${index}`} className="cart-product-item">
                                        <img src={item.product.imgs[0]} alt={item.product.name} />
                                        <div className="cart-product-quantity">
                                            <p>
                                                {item.quantity}
                                            </p>
                                        </div>
                                        <div className={"cart-product-item-info"}>
                                            <p>
                                                Tamanho: {item.selectedSize}
                                            </p>

                                            <div className="cart-product-quantity-controls">
                                                <button
                                                    onClick={() => handleDecreaseProductFromCart(item.product, item.quantity, item.selectedSize)}
                                                    className="quantity-btn"
                                                >
                                                    <FaMinus />
                                                </button>
                                                <button
                                                    onClick={() => handleAddProductToCart(item.product, item.selectedSize)}
                                                    className="quantity-btn"
                                                >
                                                    <FaPlus />
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }

                <div className="checkout-cart-icon">
                    <FaCartShopping className="cart-icon" />
                </div>
            </div>

            {
                !isCartEmpty && (
                    <div className="checkout-summary-container">
                        <div className="checkout-summary-wrapper">
                            <div className="checkout-summary-title-box">
                                <h2>Resumo do pedido</h2>
                            </div>

                            <div className="checkout-summary-info-container">
                                <div className="checkout-summary-info-box">
                                    <span>Total em produtos {`(itens)`}</span>
                                    <span>{formatBRLPrice(prices.subTotal) }</span>
                                </div>

                                <div className="checkout-summary-info-box">
                                    <span>Frete</span>
                                    <span>R$ {`0.00`}</span>
                                </div>

                                <div className="checkout-summary-info-box">
                                    <span>Você está economizando</span>
                                    <span>{formatBRLPrice(prices.discountValue)}</span>
                                </div>

                                <div className="checkout-summary-total-container">
                                    <h3>Valor:</h3>

                                    <div className="checkout-summary-total-price">
                                        <span>{formatBRLPrice(prices.totalPrice)}</span>
                                        {
                                            prices.installments > 1 && prices.installmentPrice !== 0 ? (
                                                <p>em até {prices.installments}x de {formatBRLPrice(prices.installmentPrice)}</p>
                                            ) : ""
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="checkout-summary-finish">
                                <button onClick={() => console.log("Comprar produtos")}>
                                    {
                                        purchaseLoading.loading ? <PuffLoader size={22} color={"#FFFFFF"} />
                                            :
                                            <span>Finalizar Compra</span>
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default CheckoutPage;
