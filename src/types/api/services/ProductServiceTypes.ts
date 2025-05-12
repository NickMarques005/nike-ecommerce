import { Token } from "@/types/auth/SessionTypes";
import { ProductData } from "@/types/product/productTypes";

export interface Request_GetComboProducts {
    combo: string;
}

export interface Request_GetProductById {
    productId: string;
}

export interface Request_GetProductsBySearch{
    searchQuery: string;
}

export type Response_GetAllProducts = ProductData[];
export type Response_GetBestDiscountProducts = ProductData[];
export type Response_GetComboProducts = ProductData[];
export type Response_GetProductById = {
    selectedProduct: ProductData;
    variants?: ProductData[];
};
export type Response_GetProductsBySearch = ProductData[];