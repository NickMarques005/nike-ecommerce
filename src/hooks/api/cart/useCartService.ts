// src/hooks/services/useCartService.ts

import { CartService } from '@/api/services/cart/cartServices';
import { SetLoading } from '@/types/loading/LoadingTypes';
import { createServiceRunner } from '@/utils/helpers/createServiceRunner';
import { useGetToken } from '../auth/useGetToken';
import { Token } from '@/types/auth/SessionTypes';

export const UseCartService = (setLoading: SetLoading) => {
    const { getIdToken } = useGetToken();
    const run = createServiceRunner(setLoading);

    return {
        performGetCartItems: async (stopLoading?: boolean) => {
            const token: Token = await getIdToken();
            run(CartService.get_cart_items, [{ token }], stopLoading)
        },

        performAddCartItem: async (productId: string, quantity: number, stopLoading?: boolean) => {
            const token: Token = await getIdToken();
            run(CartService.add_cart_item, [{ productId, quantity, token }], stopLoading)
        },

        performRemoveCartItem: async (productId: string, quantity: number, stopLoading?: boolean) => {
            const token: Token = await getIdToken();
            run(CartService.remove_cart_item, [{ productId, quantity, token }], stopLoading)
        },

        performPurchaseCart: async (stopLoading?: boolean) => {
            const token: Token = await getIdToken();
            run(CartService.purchase_cart, [{ token }], stopLoading)
        },
    };
};
