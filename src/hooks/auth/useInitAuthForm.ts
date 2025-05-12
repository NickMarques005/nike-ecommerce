
import { useState } from "react";
import { StartAuthCredentials, StartAuthErrors } from "@/types/auth/AuthCredentialsTypes";
import { UseAuthService } from "../api/auth/useAuthService";
import { useLoading } from "../loading/useLoading";
import { validateField, validateForm } from "@/utils/helpers/validationHelpers";
import { initAuthFormValidationSchema } from "@/utils/validation/authValidationSchemas";
import { useRequestToast } from "../toast/useRequestToast";

export function useInitAuthForm() {
    const initAuthLoading = useLoading();
    const { performInitAuth } = UseAuthService(initAuthLoading.setLoading);
    const toast = useRequestToast();

    const [credentials, setCredentials] = useState<StartAuthCredentials>({ email: "" });
    const [initAuthErrors, setInitAuthErrors] = useState<StartAuthErrors>({});

    const handleChange = (field: keyof StartAuthCredentials) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setCredentials((prev) => ({ ...prev, [field]: e.target.value }));
        };

    const initAuthFormInputFieldValidation = (field: keyof StartAuthCredentials) => {
        const error = validateField(initAuthFormValidationSchema, field, credentials);
        setInitAuthErrors((prev) => ({
            ...prev,
            [field]: error,
        }));
    };

    const initAuthFormValidation = () => {
        const errors = validateForm(initAuthFormValidationSchema, credentials);
        const hasErrors = Object.keys(errors).length > 0;
        return !hasErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();

            const isValid = initAuthFormValidation();
            if (!isValid) {
                toast.error("Preencha o campo de e-mail corretamente.");
                return;
            }

            console.log("Dados submetidos (início):", credentials);

            const response = await performInitAuth(credentials);
            if (response.success && response.data?.redirectUrl) {
                console.log("Redirecionando para:", response.data.redirectUrl);
                window.location.href = response.data.redirectUrl;
            } else {
                toast.error("Erro ao iniciar autenticação.");
                console.error("Erro ao iniciar autenticação:", response.error);
            }
        } catch (err) {
            toast.error("Erro inesperado. Tente novamente.");
            console.error("Erro inesperado ao iniciar autenticação:", err);
        } finally {
            initAuthLoading.setLoading(false);
        }
    };

    return {
        credentials,
        initAuthErrors,
        initAuthLoading,
        handleChange,
        handleSubmit,
        initAuthFormInputFieldValidation,
        initAuthFormValidation
    };
}