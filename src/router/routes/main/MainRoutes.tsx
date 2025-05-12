import { RouteObject } from "react-router-dom";
import MainPage from "@/pages/main/MainPage";
import MainPaths from "@/constants/paths/appPaths/mainPaths";
import NotFoundErrorPage from "@/pages/error/NotFoundErrorPage";
import SearchPage from "@/pages/product/SearchPage";
import FavoritesPage from "@/pages/product/FavoritesPage";
import MainWrapper from "@/pages/main/MainWrapper";
import SpecificProductPage from "@/pages/product/SpecificProductPage";
import ProtectedAppRoute from "../protected/ProtectedAppRoutes";
import authPaths from "@/constants/paths/appPaths/authPaths";

const MainRoutes: RouteObject[] = [
    {
        path: MainPaths.BasicPaths.ROOT,
        element: <MainWrapper />,
        errorElement: <NotFoundErrorPage />,
        children: [
            {
                index: true,
                element: <MainPage />,
                errorElement: <NotFoundErrorPage />
            },
            {
                path: MainPaths.BasicPaths.SEARCH,
                element: <SearchPage />,
                errorElement: <NotFoundErrorPage />
            },
            {
                path: MainPaths.BasicPaths.FAVORITES,
                element: (
                    <ProtectedAppRoute redirectTo={authPaths.CompleteAuthPaths.INITIATE}>
                        <FavoritesPage />
                    </ProtectedAppRoute>
                ),
                errorElement: <NotFoundErrorPage />
            },
            {
                path: `${MainPaths.BasicPaths.PRODUCT}`,
                errorElement: <NotFoundErrorPage />,
                children: [{
                    path: ":id",
                    element: <SpecificProductPage />
                }]
            }
        ]
    }
];

export default MainRoutes;
