import { Token } from "@/types/auth/SessionTypes";
import { ProductData } from "@/types/product/productTypes";

export interface Request_AddFavoriteProduct {
    productId: string;
    token: Token;
}

export interface Request_RemoveFavoriteProduct {
    productId: string;
    token: Token;
}

export interface Request_GetAllFavoriteProducts {
    token: Token;
}

export type Response_GetAllFavoriteProducts = ProductData[];