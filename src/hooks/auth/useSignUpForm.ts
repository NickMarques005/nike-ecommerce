import { useEffect, useState } from "react";
import { RegisterCredentials, SignUpFormErrors } from "@/types/auth/AuthCredentialsTypes";
import { validateField, validateForm } from "@/utils/helpers/validationHelpers";
import { signUpFormValidationSchema } from "@/utils/validation/authValidationSchemas";
import { UseAuthService } from "../api/auth/useAuthService";
import { useLoading } from "../loading/useLoading";
import { Request_SignUpArgs } from "@/types/api/services/AuthServiceTypes";
import { useMainNavigation } from "../navigation/main/useMainNavigation";
import { firebaseAuthService } from "@/api/firebase/firebaseAuthServices";
import { useRequestToast } from "../toast/useRequestToast";

interface UseSignUpFormParams {
    userEmail: string;
}

export function useSignUpForm(params: UseSignUpFormParams) {
    const signUpFormLoading = useLoading();
    const { performSignUp } = UseAuthService(signUpFormLoading.setLoading);
    const toast = useRequestToast();
    const { goToRoot } = useMainNavigation();

    const [credentials, setCredentials] = useState<RegisterCredentials>({
        name: "",
        email: params.userEmail || "",
        birth: "",
        password: "",
        otp_code: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const [birthDay, setBirthDay] = useState("");
    const [birthMonth, setBirthMonth] = useState("");
    const [birthYear, setBirthYear] = useState("");

    const [signUpFormErrors, setSignUpFormErrors] = useState<SignUpFormErrors>({});
    const [birthError, setBirthError] = useState<string | null>(null);

    const handleChange = (field: keyof RegisterCredentials) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setCredentials((prev) => ({ ...prev, [field]: e.target.value }));
        };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            console.log("Dados submetidos:", credentials);

            const validationResult = signUpFormValidation(credentials);
            if (!validationResult) {
                toast.error("Preencha todos os campos corretamente.");
                return;
            }

            const response = await performSignUp(credentials as Request_SignUpArgs, false);

            if (response.success) {
                console.log("Executar login do usuário com email e senha!");
                toast.success("Cadastro realizado com sucesso!");

                await firebaseAuthService.loginWithEmailPassword(
                    credentials.email,
                    credentials.password
                );
                
                // Navega para a rota principal
                goToRoot();
            }
            else {
                toast.error(response.error || "Erro ao realizar cadastro. Tente novamente.");
                console.error("Houve um erro ao cadastrar usuário: ", response.error);
            }
        }
        catch (err) {
            toast.error("Erro inesperado ao cadastrar. Verifique sua conexão.");
            console.error("Houve um erro ao fazer cadastro do usuário: ", err);
        }
        finally {
            signUpFormLoading.setLoading(false);
        }
    };

    /** 
     * Validações do SignUpForm
    */

    const signUpFormValidation = (signUpForm: RegisterCredentials) => {
        const errors = validateForm(signUpFormValidationSchema, signUpForm); // Valida o formulário inteiro
        const hasErrors = Object.keys(errors).length > 0; // Verifica se há algum erro
        return !hasErrors;
    }

    const signUpFormInputFieldValidation = (field: keyof RegisterCredentials) => {
        const error = validateField(signUpFormValidationSchema, field, credentials); // Validação dos campos do formulário cadastro
        setSignUpFormErrors((prev) => ({
            ...prev,
            [field]: error,
        }));
    }

    const isValidDate = (day: number, month: number, year: number): boolean => {
        if (month < 1 || month > 12) return false;
        if (year < 1900 || year > new Date().getFullYear() - 10) return false;

        const maxDays = new Date(year, month, 0).getDate(); // último dia do mês
        return day >= 1 && day <= maxDays;
    };

    useEffect(() => {
        if (birthDay && birthMonth && birthYear) {
            const day = parseInt(birthDay);
            const month = parseInt(birthMonth);
            const year = parseInt(birthYear);

            if (isNaN(day) || isNaN(month) || isNaN(year)) {
                setBirthError("Data inválida.");
                setCredentials(prev => ({ ...prev, birth: "" }));
                return;
            }

            if (isValidDate(day, month, year)) {
                const date = new Date(year, month - 1, day);
                setCredentials(prev => ({ ...prev, birth: date.toISOString() }));
                setBirthError(null);
            } else {
                setCredentials(prev => ({ ...prev, birth: "" }));
                setBirthError("Data de nascimento inválida.");
            }
        } else {
            setBirthError(null);
        }
    }, [birthDay, birthMonth, birthYear]);

    return {
        credentials,
        birthDay,
        birthMonth,
        birthYear,
        showPassword,
        birthError,
        signUpFormErrors,
        signUpFormLoading,
        handleChange,
        handleTogglePasswordVisibility,
        handleSubmit,
        setBirthDay,
        setBirthMonth,
        setBirthYear,
        signUpFormInputFieldValidation,
        signUpFormValidation
    };
}