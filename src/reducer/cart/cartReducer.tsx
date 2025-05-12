import { CartProductData } from "@/types/cart/CartTypes";
import { ProductData } from "@/types/product/productTypes";



type Action =
    | { type: 'SET_CART'; payload: CartProductData[] }
    | { type: 'ADD_CART'; payload: ProductData }
    | { type: 'REMOVE_CART'; payload: string } // id do produto
    | { type: 'UPDATE_QUANTITY'; payload: { productId: string, quantity: number } };

export const cartReducer = (
    state: CartProductData[],
    action: Action
): CartProductData[] => {
    switch (action.type) {
        case 'SET_CART':
            return action.payload;
        case 'ADD_CART':
            const existingProductIndex = state.findIndex(p => p.product._id === action.payload._id);
            if (existingProductIndex !== -1) {
                // Se o produto já existe, apenas aumenta a quantidade
                const updatedCart = [...state];
                updatedCart[existingProductIndex].quantity += 1;
                return updatedCart;
            }
            // Caso contrário, adiciona um novo produto ao carrinho
            return [...state, { product: action.payload, quantity: 1 }];
        case 'REMOVE_CART':
            // Remove o produto baseado no id
            return state.filter((p) => p.product._id !== action.payload);
        case 'UPDATE_QUANTITY':
            return state.map((item) =>
                item.product._id === action.payload.productId
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            );
        default:
            return state;
    }
};
