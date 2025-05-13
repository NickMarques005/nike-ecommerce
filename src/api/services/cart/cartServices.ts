import { Response } from '@/types/api/ResponseTypes';
import { MakeRequest } from '../makeRequest';
import {
    Request_AddCartItem,
    Request_GetCartItems,
    Request_PurchaseCart,
    Request_RemoveCartItem,
    Response_GetCartItems,
} from '@/types/api/services/CartServiceTypes';

export const CartService = {
    get_cart_items: async ({ token }: Request_GetCartItems): Promise<Response<Response_GetCartItems>> => {
        return MakeRequest<Response_GetCartItems>({
            endpoint: 'cart/all',
            method: 'GET',
            token
        });
    },

    add_cart_item: async (
        { productId, quantity, selectedSize, token }: Request_AddCartItem
    ): Promise<Response<Response_GetCartItems>> => {
        return MakeRequest<Response_GetCartItems>({
            endpoint: 'cart/items/add',
            method: 'PUT',
            data: { productId, quantity, selectedSize },
            token
        });
    },

    remove_cart_item: async (
        { productId, quantity, selectedSize, token }: Request_RemoveCartItem
    ): Promise<Response<Response_GetCartItems>> => {
        return MakeRequest<Response_GetCartItems>({
            endpoint: 'cart/items/remove',
            method: 'PUT',
            data: { productId, quantity, selectedSize },
            token
        });
    },

    purchase_cart: async ({ token }: Request_PurchaseCart): Promise<Response<null>> => {
        return MakeRequest<null>({
            endpoint: 'cart/purchase',
            method: 'POST',
            token
        });
    }
};