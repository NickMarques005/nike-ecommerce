import { Token } from "@/types/auth/SessionTypes";
import { CartProductData } from "@/types/cart/CartTypes";

export type Response_GetCartItems = {
    products: CartProductData[];
};

export type Request_AddCartItem = {
    productId: string;
    quantity: number;
    token: Token;
};

export type Request_RemoveCartItem = {
    productId: string;
    quantity: number;
    token: Token;
};

export type Request_GetCartItems = {
    token: Token;
}

export type Request_PurchaseCart = {
    token: Token;
}