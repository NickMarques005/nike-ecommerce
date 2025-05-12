import AuthPaths from "@/constants/paths/appPaths/authPaths";
import { useNavigate } from "react-router-dom";

export const useSubHeaderActions = () => {
    const navigate = useNavigate();


    const subHeaderActions = {
        handleLogin: () => {
            navigate(AuthPaths.CompleteAuthPaths.INITIATE);
        }
    }

    return {
        subHeaderActions
    };
};