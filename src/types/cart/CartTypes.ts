import { ProductData } from "../product/productTypes";

export type CartProductData = {
    id: string;
    product: ProductData;
    quantity: number;
    selectedSize: string;
};
