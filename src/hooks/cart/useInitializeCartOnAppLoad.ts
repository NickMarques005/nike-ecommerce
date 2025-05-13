import { useEffect } from "react";
import { useAuth } from "@/contexts/auth/AuthContext";
import { useLoading } from "@/hooks/loading/useLoading";
import { CartProductData } from "@/types/cart/CartTypes";
import { UseCartService } from "../api/cart/useCartService";

interface UseInitializeCartOnAppLoadParams {
    setCart: (products: CartProductData[]) => void;
}

export const useInitializeCartOnAppLoad = ({
    setCart,
}: UseInitializeCartOnAppLoadParams) => {
    const { user, authLoadingState } = useAuth();
    const fetchCartLoading = useLoading(true);
    const { performGetCartItems } = UseCartService(fetchCartLoading.setLoading);

    const fetchInitialCart = async () => {
        try {
            if(authLoadingState.loading)
            {
                return;
            }

            if (!user) {
                console.log("Usuário não autenticado. Não buscar carrinho.");
                return;
            }

            const response = await performGetCartItems();

            if (response.success && response.data) {
                setCart(response.data);
            }
            else {
                console.log("O carrinho parece estar vazio aparentemente.");
            }
        } catch (error) {
            console.error("Erro ao carregar carrinho inicial:", error);
        }
    };

    useEffect(() => {


        fetchInitialCart();
    }, [user]);

    return {
        fetchCartLoading,
    };
};
