// src/hooks/services/useCartService.ts

import { CartService } from '@/api/services/cart/cartServices';
import { SetLoading } from '@/types/loading/LoadingTypes';
import { createServiceRunner } from '@/utils/helpers/createServiceRunner';
import { useGetToken } from '../auth/useGetToken';
import { Token } from '@/types/auth/SessionTypes';
import { CartProductData } from '@/types/cart/CartTypes';

export const UseCartService = (setLoading: SetLoading) => {
    const { getIdToken } = useGetToken();
    const run = createServiceRunner(setLoading);

    return {
        performGetCartItems: async (stopLoading?: boolean) => {
            const token: Token = await getIdToken();
            return run(CartService.get_cart_items, [{ token }], stopLoading);
        },

        performAddCartItem: async (cartProduct: CartProductData, stopLoading?: boolean) => {
            const token: Token = await getIdToken();
            return run(CartService.add_cart_item, [{ 
                productId: cartProduct.product._id, 
                quantity: cartProduct.quantity,
                selectedSize: cartProduct.selectedSize,
                token }], stopLoading)
        },

        performRemoveCartItem: async (cartProduct: CartProductData, stopLoading?: boolean) => {
            const token: Token = await getIdToken();
            return run(CartService.remove_cart_item, [{ 
                productId: cartProduct.product._id, 
                quantity: cartProduct.quantity, 
                selectedSize: cartProduct.selectedSize,
                token }], stopLoading);
        },

        performPurchaseCart: async (stopLoading?: boolean) => {
            const token: Token = await getIdToken();
            return run(CartService.purchase_cart, [{ token }], stopLoading);
        },
    };
};
