import { useCart } from "@/contexts/cart/CartContext"
import { useGetToken } from "../api/auth/useGetToken";
import { useAuthNavigation } from "../navigation/auth/useAuthNavigation";
import { ProductData } from "@/types/product/productTypes";
import { CartProductData } from "@/types/cart/CartTypes";


export const useCartProductsHandler = () => {
    const { goToInitAuth } = useAuthNavigation();
    const { getIdToken } = useGetToken();
    const { addToCart, removeFromCart, decrementItem } = useCart();

    const handleAddProductToCart = async (product: ProductData, selectedSize: string | null) => {
        if(!selectedSize)
        {
            return console.error("Tamanho não selecionado!");
        }
        
        const token = await getIdToken();
        if (!token) {
            console.error("Usuário não autenticado!");
            return goToInitAuth();
        }

        addToCart(product, selectedSize);
    }

    const handleRemoveProductFromCart = async (product: ProductData, quantity: number, selectedSize: string) => {
        const token = await getIdToken();
        if (!token) {
            console.error("Usuário não autenticado!");
            return goToInitAuth();
        }

        const cartProductToRemove: CartProductData = {
            id: `${product._id}-${selectedSize}`,
            product,
            selectedSize,
            quantity
        }

        removeFromCart(cartProductToRemove);
    }

    const handleDecreaseProductFromCart = async (product: ProductData, quantity: number, selectedSize: string) => {
        const token = await getIdToken();
        if (!token) {
            console.error("Usuário não autenticado!");
            return goToInitAuth();
        }

        const cartProductToDecrease: CartProductData = {
            id: `${product._id}-${selectedSize}`,
            product,
            selectedSize,
            quantity
        }

        decrementItem(cartProductToDecrease);
    }


    return {
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleDecreaseProductFromCart
    }
}