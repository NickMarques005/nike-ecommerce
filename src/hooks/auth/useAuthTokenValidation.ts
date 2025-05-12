import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useLoading } from "../loading/useLoading";
import { UseAuthService } from "../api/auth/useAuthService";
import { Request_ValidateAuthToken } from "@/types/api/services/AuthServiceTypes";
import { AuthContextType } from "@/types/auth/ContextTypes";

// Tipos que você pode ajustar conforme a resposta da sua API
type TokenValidationResponse = {
    success: boolean;
    data?: { email: string };
    error?: string;
};

export function useAuthTokenValidation() {
    const [searchParams] = useSearchParams();
    const { pathname } = useLocation(); // Rota atual de autenticação
    const token = searchParams.get("token");

    const authTokenValidationLoading = useLoading(true);
    const [email, setEmail] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const { performValidateAuthToken } = UseAuthService(authTokenValidationLoading.setLoading);

    useEffect(() => {
        const validateToken = async () => {
            if (!token) {
                setError("Token inválido ou expirado.");
                return;
            }

            try {
                console.log("Rota PathName: ", pathname);

                const contextFromPath: AuthContextType | undefined = pathname.includes('entrar')
                ? 'entrar'
                : pathname.includes('criar-conta')
                ? 'criar-conta'
                : pathname.includes('resetar-senha')
                ? 'resetar-senha'
                : undefined;

                if(!contextFromPath)
                {
                    setError("Contexto da autenticação inválido.");
                    return;
                }

                const requestAuthTokenValidation: Request_ValidateAuthToken = {
                    token: token,
                    context: contextFromPath
                }

                const response: TokenValidationResponse = await performValidateAuthToken(requestAuthTokenValidation);

                if (response.success && response.data?.email) {
                    setEmail(response.data.email);
                } else {
                    setError(response.error || "Token inválido ou expirado.");
                }
            } catch (err) {
                setError("Erro ao validar o token.");
                console.error(err);
            } finally {
                authTokenValidationLoading.setLoading(false);
            }
        };

        validateToken();
    }, [token]);

    return {
        token,
        email,
        error,
        authTokenValidationLoading,
    };
}