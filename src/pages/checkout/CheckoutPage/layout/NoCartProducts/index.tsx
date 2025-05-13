// src/components/cart/NoCartProducts.tsx
import { FaCartShopping } from "react-icons/fa6";
import "./no-cart-products.css";

const NoCartProducts = () => {
    return (
        <div className="no-cart-products">
            <FaCartShopping className="no-cart-icon" />
            <h2>Oops! Seu carrinho está vazio.</h2>
        </div>
    );
};

export default NoCartProducts;
