
import { Response } from '@/types/api/ResponseTypes';
import {
    Request_AddFavoriteProduct,
    Request_RemoveFavoriteProduct,
    Request_GetAllFavoriteProducts,
    Response_GetAllFavoriteProducts
} from '@/types/api/services/FavoriteProductServiceTypes';
import { MakeRequest } from '../makeRequest';

export const FavoriteProductService = {
    get_all_favorites: async ({
        token
    }: Request_GetAllFavoriteProducts): Promise<Response<Response_GetAllFavoriteProducts>> => {
        console.log(token);
        return MakeRequest<Response_GetAllFavoriteProducts>({
            endpoint: 'product/favorite/all',
            method: 'GET',
            token
        });
    },

    add_favorite: async ({
        productId,
        token
    }: Request_AddFavoriteProduct): Promise<Response<any>> => {
        return MakeRequest({
            endpoint: 'product/favorite/add',
            method: 'POST',
            data: { productId },
            token
        });
    },

    remove_favorite: async ({
        productId,
        token
    }: Request_RemoveFavoriteProduct): Promise<Response<any>> => {
        return MakeRequest({
            endpoint: 'product/favorite/remove',
            method: 'DELETE',
            data: { productId },
            token
        });
    }
};