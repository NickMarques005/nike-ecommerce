import { PuffLoader } from "react-spinners";
import { useCart } from '@/contexts/cart/CartContext';
import { useCheckoutPrices } from '@/hooks/checkout/useCheckoutPrices';
import { usePurchaseCart } from '@/hooks/checkout/usePurchaseCart';
import { FaCartShopping } from "react-icons/fa6";
import "./checkout-page.css";

const CheckoutPage = () => {

    const { cart } = useCart();
    const { purchaseLoading } = usePurchaseCart();
    const { prices } = useCheckoutPrices();

    return (
        <div className="checkout-container">
            <div className="cart-products-container">
                {
                    cart.length !== 0 ?
                        <ul>
                            {
                                Object.values(cart).map((item, index) => (
                                    <li key={`${item.product.id}-${index}`} className="cart-product-item">
                                        <img src={item.product.imgs[0]} alt={item.product.name} />
                                        <div className="cart-product-quantity">
                                            <p>
                                                {item.quantity}
                                            </p>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                        : ""
                }
                <div className="checkout-cart-icon">
                    <FaCartShopping className="cart-icon" />
                </div>
            </div>

            <div className="checkout-summary-container">
                <div className="checkout-summary-title-box">
                    <h2>Resumo do pedido</h2>
                </div>

                <div className="checkout-summary-info-container">
                    <div className="checkout-summary-info-box">
                        <span>Total em produtos {`(itens)`}</span>
                        <span>R$ {prices.subTotal}</span>
                    </div>

                    <div className="checkout-summary-info-box">
                        <span>Frete</span>
                        <span>R$ {`0.00`}</span>
                    </div>

                    <div className="checkout-summary-info-box">
                        <span>Você está economizando</span>
                        <span>R$ {prices.discountValue}</span>
                    </div>

                    <div className="checkout-summary-total-container">
                        <h3>Valor:</h3>

                        <div className="checkout-summary-total-price">
                            <span>R$ {prices.totalPrice}</span>
                            {
                                prices.totalCondition && prices.totalConditionPrice !== 0 ?
                                    <p>em até {prices.totalCondition}x de R$ {prices.totalConditionPrice}</p>
                                    : ""
                            }

                        </div>

                    </div>
                </div>

                <div className="checkout-summary-finish">
                    <button onClick={() => console.log("Comprar produtos")}>
                        {
                            purchaseLoading.loading ? <PuffLoader
                                size={22}
                                color={"#FFFFFF"}
                            />
                                :
                                <span>
                                    Finalizar Compra
                                </span>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage;