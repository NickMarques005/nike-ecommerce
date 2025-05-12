import { useLoading } from "@/hooks/loading/useLoading";  // Supondo que você tenha um hook de loading
import React, { createContext, useContext, useReducer } from "react";
import { cartReducer } from "@/reducer/cart/cartReducer";
import { ProductData } from "@/types/product/productTypes";
import { LoadingStructure } from "@/types/loading/LoadingTypes";
import { CartProductData } from "@/types/cart/CartTypes";

interface CartContextType {
    cart: CartProductData[];
    addToCart: (product: ProductData) => void;
    removeFromCart: (productId: string) => void;
    setCart: (products: CartProductData[]) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    fetchCartLoading: LoadingStructure;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, []);
    const cartLoading = useLoading();

    const addToCart = async (product: ProductData) => {
        try {
            // Suponha que você tenha algum serviço de API aqui para adicionar o produto ao carrinho
            // await addToCartService(product);
            dispatch({ type: "ADD_CART", payload: product });
        } catch (error) {
            console.error("Erro ao adicionar produto ao carrinho:", error);
        }
    };

    const removeFromCart = async (productId: string) => {
        try {
            // Suponha que você tenha algum serviço de API aqui para remover o produto do carrinho
            // await removeFromCartService(productId);
            dispatch({ type: "REMOVE_CART", payload: productId });
        } catch (error) {
            console.error("Erro ao remover produto do carrinho:", error);
        }
    };

    const setCart = (products: CartProductData[]) => {
        dispatch({ type: "SET_CART", payload: products });
    };

    const updateQuantity = (productId: string, quantity: number) => {
        dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            setCart,
            updateQuantity,
            fetchCartLoading: cartLoading
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};
