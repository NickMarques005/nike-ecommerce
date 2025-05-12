import { useAuth } from "@/contexts/auth/AuthContext";
import { Token } from "@/types/auth/SessionTypes";

export const useGetToken = () => {
    const { user } = useAuth();

    const getIdToken = async () => {
        if (!user) {
            console.error("Usuário não autenticado");
            return;
        }
        return await user.getIdToken() as Token;
    };

    return {
        getIdToken
    }
}