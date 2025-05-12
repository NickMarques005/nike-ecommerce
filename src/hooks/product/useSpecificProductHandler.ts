import { ProductData } from '@/types/product/productTypes';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoading } from '../loading/useLoading';
import { UseProductService } from '../api/product/useProductService';

export const useSpecificProductHandler = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { setLoading } = useLoading();
    const { performGetProductById } = UseProductService(setLoading);

    const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
    const [productVariants, setProductVariants] = useState<ProductData[] | null>(null);

    const handleChangeSelectedProduct = (newId: string) => {
        if (!productVariants) return;

        const foundProduct = productVariants.find(variant => variant._id === newId);
        if (foundProduct) {
            setSelectedProduct(foundProduct);
        }
    };

    const fetchProduct = async () => {
        if (!id) {
            navigate('/'); // fallback se id estiver ausente
            return;
        }

        try {
            const response = await performGetProductById(id);
            if (response.success) {
                if (response.data) {
                    const product = response.data.selectedProduct;
                    const variants = response.data.variants;
                    setSelectedProduct(product);
                    if (variants) {
                        setProductVariants(variants);
                    }

                    console.log("Produto: ", product);
                    console.log("Variantes: ", variants);
                }
            }
            else {
                navigate("/");
            }
        } catch (error) {
            console.error('Erro ao buscar produto:', error);
            navigate('/');
        }
    };

    const handleChangeProductParam = (newId: string) => {
        if (newId !== id) {
            navigate(`/produto/${newId}`); // isso aciona o useEffect
        }
    };

    useEffect(() => {
        // Se já temos os variants carregados, evitamos nova requisição
        if (productVariants && id) {
            handleChangeSelectedProduct(id);
        } else {
            fetchProduct();
        }
    }, [id]);

    return { 
        selectedProduct, 
        productVariants,
        handleChangeProductParam 
    };
};