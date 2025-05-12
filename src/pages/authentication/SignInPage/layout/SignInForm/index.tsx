import AuthInputField from "@/components/form-inputs/AuthInputField";
import DefaultButton from "@/components/button/DefaultButton";
import DefaultLink from "@/components/link/DefaultLink";
import AuthPaths from "@/constants/paths/appPaths/authPaths";
import { useSignInForm } from "@/hooks/auth/useSignInForm";
import ButtonIcon from "@/components/button/Buttonicon";
import { FaArrowsRotate } from "react-icons/fa6";
import { PuffLoader } from "react-spinners";
import { useResendOTPHandler } from "@/hooks/auth/useResendOTPHandler";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface SignInFormProps{
    userEmail: string;
}

export function SignInForm({
    userEmail
}: SignInFormProps) {
    const {
        credentials,
        handleChange,
        handleSubmit,
        signInFormErrors,
        signInFormLoading,
        signInFormInputFieldValidation,
        signInFormValidation,
        showPassword,
        handleTogglePasswordVisibility
    } = useSignInForm({ userEmail });

    const { resendEmailLoading, handleResendOTPCode } = useResendOTPHandler();

    const isFormValid = signInFormValidation(credentials);

    const formLoading = signInFormLoading.loading || resendEmailLoading.loading;

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-input-field-container">
                <AuthInputField
                    placeholder="Código*"
                    value={credentials.otp_code}
                    onChange={handleChange('otp_code')}
                    icon={
                        <ButtonIcon
                            icon={
                                resendEmailLoading.loading ?
                                    <PuffLoader
                                        size={20}
                                        color={"#999"}
                                    /> :
                                    <FaArrowsRotate size={20} color={"#999"} />
                            }
                            onClick={() => handleResendOTPCode(credentials.email)}
                            disabled={formLoading}
                        />
                    }
                    errorMessage={signInFormErrors.otp_code}
                    onBlur={() => signInFormInputFieldValidation("otp_code")}
                    disabled={formLoading}
                />
                <AuthInputField
                    placeholder={"Senha*"}
                    value={credentials.password}
                    onChange={handleChange("password")}
                    errorMessage={signInFormErrors.password}
                    type={showPassword ? "text" : "password"}
                    disabled={formLoading}
                    icon={
                        <ButtonIcon
                            icon={showPassword ? <FaEyeSlash color={"#999"} size={20} /> : <FaEye color={"#999"} size={20} />}
                            onClick={() => handleTogglePasswordVisibility()}
                            disabled={formLoading}
                        />
                    }
                    onBlur={() => signInFormInputFieldValidation("password")}
                />
            </div>

            <div className="auth-form-footer">
                <div className="auth-forgot-password">
                    <DefaultLink to={`${AuthPaths.ROOT}/${AuthPaths.FORGOT_PASSWORD}`}>Esqueceu a senha?</DefaultLink>
                </div>
                <div className="auth-form-button">
                    <DefaultButton
                        disabled={formLoading || !isFormValid}
                        type={"submit"}>
                        {
                            signInFormLoading.loading ?
                                <PuffLoader
                                    size={22}
                                    color={"#FFFFFF"}
                                />
                                :
                                "Entrar"}
                    </DefaultButton>
                </div>
            </div>
        </form>
    );
}