"use client";

import { useEffect, useState } from "react";

import { ProductData } from "@/types/product/productTypes";
import { useLoading } from "../loading/useLoading";
import { UseProductService } from "../api/product/useProductService";
export const useBestDiscountProductsHandler = () => {
    const [bestDiscountProducts, setBestDiscountProducts] = useState<ProductData[]>([]);
    const { setLoading } = useLoading();
    const { performGetBestDiscounts } = UseProductService(setLoading);

    const fetchBestDiscountProducts = async () => {
        try {
            const response = await performGetBestDiscounts();
            if (response?.success && Array.isArray(response.data)) {
                setBestDiscountProducts(response.data);
            } else {
                console.warn("Falha ao buscar os melhores descontos.");
            }
        } catch (error) {
            console.error("Erro ao buscar melhores descontos:", error);
        }
    };

    useEffect(() => {
        fetchBestDiscountProducts();
    }, []);

    return {
        bestDiscountProducts,
    };
};