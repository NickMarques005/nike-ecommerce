import { useState } from "react";
import { LoginCredentials, SignInFormErrors } from "@/types/auth/AuthCredentialsTypes";
import { useLoading } from "../loading/useLoading";
import { UseAuthService } from "../api/auth/useAuthService";
import { Request_CheckUserBeforeSignInArgs } from "@/types/api/services/AuthServiceTypes";
import { validateField, validateForm } from "@/utils/helpers/validationHelpers";
import { signInFormValidationSchema } from "@/utils/validation/authValidationSchemas";
import { useRequestToast } from "../toast/useRequestToast";
import { firebaseAuthService } from "@/api/firebase/firebaseAuthServices";
import { useMainNavigation } from "../navigation/main/useMainNavigation";

interface UseSignInFormParams {
    userEmail: string;
}

export function useSignInForm(params: UseSignInFormParams) {
    const signInFormLoading = useLoading();
    const { performCheckUserBeforeSignIn } = UseAuthService(signInFormLoading.setLoading);
    const toast = useRequestToast();
    const { goToRoot } = useMainNavigation();

    const [credentials, setCredentials] = useState<LoginCredentials>({
        email: params.userEmail || "",
        password: "",
        otp_code: ""
    });

    const [signInFormErrors, setSignInFormErrors] = useState<SignInFormErrors>({});
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const handleChange = (field: keyof LoginCredentials) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setCredentials((prev) => ({ ...prev, [field]: e.target.value }));
        };

    const signInFormInputFieldValidation = (field: keyof LoginCredentials) => {
        const error = validateField(signInFormValidationSchema, field, credentials);
        setSignInFormErrors((prev) => ({
            ...prev,
            [field]: error,
        }));
    };

    const signInFormValidation = (form: LoginCredentials) => {
        const errors = validateForm(signInFormValidationSchema, form);
        const hasErrors = Object.keys(errors).length > 0;
        return !hasErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            console.log("Dados submetidos (login):", credentials);

            const isValid = signInFormValidation(credentials);
            if (!isValid) {
                toast.error("Preencha todos os campos corretamente.");
                return;
            }

            const response = await performCheckUserBeforeSignIn(credentials as Request_CheckUserBeforeSignInArgs, false);
            
            if (response.success) {

                await firebaseAuthService.loginWithEmailPassword(
                    credentials.email,
                    credentials.password
                );

                // Navega para a rota principal
                goToRoot();

                toast.success("Autenticação feita com sucesso!");
            }
            else {
                toast.error(response.error || "Erro ao autenticar. Tente novamente.");
                console.error("Houve um erro ao logar usuário: ", response.error);
            }
        }
        catch (err) {
            toast.error("Erro inesperado ao tentar logar.");
            console.error("Houve um erro inesperado ao logar usuário: ", err);
        }
        finally {
            signInFormLoading.setLoading(false);
        }
    };

    return {
        credentials,
        showPassword,
        signInFormLoading,
        signInFormErrors,
        handleChange,
        handleSubmit,
        handleTogglePasswordVisibility,
        signInFormInputFieldValidation,
        signInFormValidation
    };
}