import { ProductData } from "./productTypes";

export interface FavoriteProductData extends ProductData {
    favorite: boolean;
}