import { RouteObject } from "react-router-dom";
import AuthPaths from "@/constants/paths/appPaths/authPaths";
import NotFoundErrorPage from "@/pages/error/NotFoundErrorPage";
import SignInPage from "@/pages/authentication/SignInPage";
import SignUpPage from "@/pages/authentication/SignUpPage";
import ForgotPasswordPage from "@/pages/authentication/ForgotPasswordPage";
import AuthWrapper from "@/pages/authentication/AuthWrapper";
import StartAuthPage from "@/pages/authentication/StartAuthPage";

const AuthRoutes: RouteObject[] = [
    {
        path: AuthPaths.BasicPaths.ROOT,
        element: <AuthWrapper/>,
        errorElement: <NotFoundErrorPage />,
        children: [
            {
                path: AuthPaths.BasicPaths.INITIATE,
                element: <StartAuthPage />,
            },
            {
                path: AuthPaths.BasicPaths.SIGN_IN,
                element: <SignInPage />,
            },
            {
                path: AuthPaths.BasicPaths.SIGN_UP,
                element: <SignUpPage/>,
            },
            {
                path: AuthPaths.BasicPaths.FORGOT_PASSWORD,
                element: <ForgotPasswordPage />,
            },
        ],
    },
];

export default AuthRoutes;