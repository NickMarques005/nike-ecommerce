import { CartProductData } from "@/types/cart/CartTypes";

type Action =
    | { type: 'SET_CART'; payload: CartProductData[] }
    | { type: 'ADD_CART_ITEM'; payload: CartProductData }
    | { type: 'REMOVE_CART_ITEM'; payload: { productId: string; selectedSize: string } }
    | { type: 'DECREMENT_CART_ITEM'; payload: { productId: string; selectedSize: string } };

export const cartReducer = (
    state: CartProductData[],
    action: Action
): CartProductData[] => {
    switch (action.type) {
        case 'SET_CART':
            return action.payload;

        case 'ADD_CART_ITEM':
            const existingIndex = state.findIndex(
                p =>
                    p.product._id === action.payload.product._id &&
                    p.selectedSize === action.payload.selectedSize
            );

            if (existingIndex !== -1) {
                const updated = [...state];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity: updated[existingIndex].quantity + 1,
                };
                return updated;
            }

            return [...state, action.payload];

        case 'REMOVE_CART_ITEM':
            return state.filter(
                p =>
                    !(
                        p.product._id === action.payload.productId &&
                        p.selectedSize === action.payload.selectedSize
                    )
            );

        case 'DECREMENT_CART_ITEM':
            return state.reduce<CartProductData[]>((acc, item) => {
                if (
                    item.product._id === action.payload.productId &&
                    item.selectedSize === action.payload.selectedSize
                ) {
                    if (item.quantity > 1) {
                        acc.push({ ...item, quantity: item.quantity - 1 });
                    }
                } else {
                    acc.push(item);
                }
                return acc;
            }, []);

        default:
            return state;
    }
};