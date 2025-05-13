import { useLoading } from "@/hooks/loading/useLoading";  // Supondo que você tenha um hook de loading
import React, { createContext, useContext, useReducer } from "react";
import { cartReducer } from "@/reducer/cart/cartReducer";
import { ProductData } from "@/types/product/productTypes";
import { LoadingStructure } from "@/types/loading/LoadingTypes";
import { CartProductData } from "@/types/cart/CartTypes";
import { useInitializeCartOnAppLoad } from "@/hooks/cart/useInitializeCartOnAppLoad";
import { UseCartService } from "@/hooks/api/cart/useCartService";

interface CartContextType {
    cart: CartProductData[];
    addToCart: (product: ProductData, selectedSize: string) => Promise<void>;
    removeFromCart: (cartProduct: CartProductData) => Promise<void>;
    decrementItem: (cartProduct: CartProductData) => void;
    setCart: (products: CartProductData[]) => void;
    getTotalItemsFromCart: () => number;
    fetchCartLoading: LoadingStructure;
    updateCartLoading: LoadingStructure;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, []);
    const updateCartLoading = useLoading();
    const { performAddCartItem, performRemoveCartItem } = UseCartService(updateCartLoading.setLoading);

    const addToCart = async (product: ProductData, selectedSize: string) => {
        try {
            const newCartItem: CartProductData = {
                id: `${product._id}-${selectedSize}`,
                product,
                quantity: 1,
                selectedSize,
            };

            await performAddCartItem(newCartItem);

            dispatch({ type: "ADD_CART_ITEM", payload: newCartItem });
        } catch (error) {
            console.error("Erro ao adicionar produto ao carrinho:", error);
        }
    };

    const removeFromCart = async (cartProduct: CartProductData) => {
        try {
            const productId = cartProduct.product._id;
            const selectedSize = cartProduct.selectedSize;

            dispatch({ type: "REMOVE_CART_ITEM", payload: { productId, selectedSize } });
        } catch (error) {
            console.error("Erro ao remover produto do carrinho:", error);
        }
    };

    const decrementItem = async (cartProduct: CartProductData) => {
        const productId = cartProduct.product._id;
        const selectedSize = cartProduct.selectedSize;

        const decrementCartProduct: CartProductData = {
            ...cartProduct,
            quantity: 1
        }

        await performRemoveCartItem(decrementCartProduct);
        dispatch({ type: "DECREMENT_CART_ITEM", payload: { productId, selectedSize } });
    };

    const setCart = (products: CartProductData[]) => {
        dispatch({ type: "SET_CART", payload: products });
    };

    const getTotalItemsFromCart = (): number => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const { fetchCartLoading } = useInitializeCartOnAppLoad({ setCart });

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            decrementItem,
            setCart,
            getTotalItemsFromCart,
            fetchCartLoading,
            updateCartLoading
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
