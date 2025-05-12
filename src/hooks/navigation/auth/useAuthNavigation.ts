import AuthPaths from "@/constants/paths/appPaths/authPaths";
import { useNavigate } from "react-router-dom";

export const useAuthNavigation = () => {
    const navigate = useNavigate();

    return {
        goToInitAuth: () => navigate(AuthPaths.CompleteAuthPaths.INITIATE),
        goToSignIn: () => navigate(AuthPaths.CompleteAuthPaths.SIGN_IN),
        goToSignUp: () => navigate(AuthPaths.CompleteAuthPaths.SIGN_UP),
        goToForgotPassword: () => navigate(AuthPaths.CompleteAuthPaths.FORGOT_PASSWORD),
    };
}