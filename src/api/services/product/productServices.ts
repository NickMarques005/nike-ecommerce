import { Response } from '@/types/api/ResponseTypes';
import { MakeRequest } from '../makeRequest';
import {
    Request_GetComboProducts,
    Request_GetProductById,
    Request_GetProductsBySearch,
    Response_GetAllProducts,
    Response_GetBestDiscountProducts,
    Response_GetComboProducts,
    Response_GetProductById,
    Response_GetProductsBySearch
} from '@/types/api/services/ProductServiceTypes';

export const ProductService = {
    get_all_products: async (): Promise<Response<Response_GetAllProducts>> => {
        return MakeRequest<Response_GetAllProducts>({
            endpoint: 'product/all',
            method: 'GET'
        });
    },

    get_best_discounts: async (): Promise<Response<Response_GetBestDiscountProducts>> => {
        return MakeRequest<Response_GetBestDiscountProducts>({
            endpoint: 'product/best-discounts',
            method: 'GET'
        });
    },

    get_combo_products: async (
        { combo }: Request_GetComboProducts
    ): Promise<Response<Response_GetComboProducts>> => {
        return MakeRequest<Response_GetComboProducts>({
            endpoint: `product/combo`,
            queryParams: { combo },
            method: 'GET'
        });
    },

    get_product_by_id: async (
        { productId }: Request_GetProductById
    ): Promise<Response<Response_GetProductById>> => {
        return MakeRequest<Response_GetProductById>({
            endpoint: `product/${productId}`,
            method: 'GET'
        });
    },

    get_products_by_search: async (
        { searchQuery }: Request_GetProductsBySearch
    ): Promise<Response<Response_GetProductsBySearch>> => {
        return MakeRequest<Response_GetProductsBySearch>({
            endpoint: `product/search`,
            queryParams: { q: searchQuery },
            method: 'GET'
        });
    },
};
