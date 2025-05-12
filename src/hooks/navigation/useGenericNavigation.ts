import { useNavigate } from "react-router-dom";

export const useGenericNavigation = () => {
    const navigate = useNavigate();

    return {
        goBack: () => navigate(-1),
        replaceTo: (path: string) => navigate(path, { replace: true }),
        pushTo: (path: string) => navigate(path),
    };
}