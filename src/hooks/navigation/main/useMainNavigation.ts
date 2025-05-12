import MainPaths from "@/constants/paths/appPaths/mainPaths";
import { useNavigate } from "react-router-dom";

export function useMainNavigation() {
    const navigate = useNavigate();

    const goToRoot = () => navigate(MainPaths.BasicPaths.ROOT);
    const goToSearch = () => navigate(MainPaths.BasicPaths.SEARCH);
    const goToFavorites = () => navigate(MainPaths.BasicPaths.FAVORITES);

    return {
        goToRoot,
        goToSearch,
        goToFavorites,
    };
}