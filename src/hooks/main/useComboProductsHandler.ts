"use client";

import { useEffect, useState } from "react";

import { ProductData } from "@/types/product/productTypes";
import { useLoading } from "../loading/useLoading";
import { UseProductService } from "../api/product/useProductService";


export const useComboProductsHandler = (combo: string) => {
    const [comboProducts, setComboProducts] = useState<ProductData[]>([]);
    const { setLoading } = useLoading();
    const { performGetComboProducts } = UseProductService(setLoading);

    const fetchComboProducts = async () => {
        try {
            const response = await performGetComboProducts(combo);
            if (response?.success && Array.isArray(response.data)) {
                setComboProducts(response.data);
            } else {
                console.warn("Falha ao buscar produtos do combo:", combo);
            }
        } catch (error) {
            console.error("Erro ao buscar combo products:", error);
        }
    };

    useEffect(() => {
        fetchComboProducts();
    }, [combo]);

    return {
        comboProducts,
    };
};