import { ReactNode } from "react";
import { UserProvider } from "./user/UserContext";
import { AuthProvider } from "./auth/AuthContext";
import { SearchProductsProvider } from "./product/SearchProductsContext";
import { FavoriteProductProvider } from "./product/FavoriteProductsContext";
import { CartProvider } from "./cart/CartContext";

interface MainProviderProps {
    children: ReactNode;
}

export const MainProvider = ({ children }: MainProviderProps) => {
    return (
        <AuthProvider>
            <UserProvider>
                <FavoriteProductProvider>
                    <SearchProductsProvider>
                        <CartProvider>
                            {children}
                        </CartProvider>
                    </SearchProductsProvider>
                </FavoriteProductProvider>
            </UserProvider>
        </AuthProvider>
    );
};