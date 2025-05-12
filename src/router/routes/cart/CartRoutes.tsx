import authPaths from "@/constants/paths/appPaths/authPaths";
import cartPaths from "@/constants/paths/appPaths/cartPaths";
import CheckoutPage from "@/pages/checkout/CheckoutPage/index";
import NotFoundErrorPage from "@/pages/error/NotFoundErrorPage/index";
import { RouteObject } from "react-router-dom";
import ProtectedAppRoute from "../protected/ProtectedAppRoutes";

const CartRoutes: RouteObject[] = [
    {
        path: cartPaths.BasicPaths.ROOT,
        errorElement: <NotFoundErrorPage />,
        children: [
            {
                path: cartPaths.BasicPaths.CHECKOUT,
                element: (
                    <ProtectedAppRoute redirectTo={authPaths.CompleteAuthPaths.INITIATE}>
                        <CheckoutPage />
                    </ProtectedAppRoute>
                )
            }
        ]
    },
];

export default CartRoutes;