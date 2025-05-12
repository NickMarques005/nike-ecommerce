import AuthInputField from "@/components/form-inputs/AuthInputField";
import DefaultButton from "@/components/button/DefaultButton";
import { FaArrowsRotate } from "react-icons/fa6";
import ButtonIcon from "@/components/button/Buttonicon";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSignUpForm } from "@/hooks/auth/useSignUpForm";
import { PuffLoader } from "react-spinners";
import { useResendOTPHandler } from "@/hooks/auth/useResendOTPHandler";
import { useBirthDateHandler } from "@/hooks/auth/sign-up/useBirthDateHandler";
import styles from "./sign-up-form.module.css"

interface SignUpFormProps {
    userEmail: string;
}

export function SignUpForm({
    userEmail
}: SignUpFormProps) {

    const {
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
        signUpFormValidation,
        signUpFormInputFieldValidation
    } = useSignUpForm({ userEmail });

    const {
        monthInputRef,
        yearInputRef,
        handleDayChange,
        handleMonthChange,
        handleYearChange,
    } = useBirthDateHandler({
        setBirthDay,
        setBirthMonth,
        setBirthYear,
    });

    const { resendEmailLoading, handleResendOTPCode } = useResendOTPHandler();
    const isFormValid = signUpFormValidation(credentials);
    const formLoading = signUpFormLoading.loading || resendEmailLoading.loading;

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
                    errorMessage={signUpFormErrors.otp_code}
                    onBlur={() => signUpFormInputFieldValidation("otp_code")}
                    disabled={formLoading}
                />
                <AuthInputField
                    placeholder="Nome completo*"
                    value={credentials.name}
                    onChange={handleChange("name")}
                    errorMessage={signUpFormErrors.name}
                    onBlur={() => signUpFormInputFieldValidation("name")}
                    disabled={formLoading}
                />
                <AuthInputField
                    placeholder="Senha*"
                    value={credentials.password}
                    onChange={handleChange("password")}
                    type={showPassword ? "text" : "password"}
                    icon={
                        <ButtonIcon
                            icon={showPassword ? <FaEyeSlash color={"#999"} size={20} /> : <FaEye color={"#999"} size={20} />}
                            onClick={() => handleTogglePasswordVisibility()}
                            disabled={formLoading}
                        />
                    }
                    errorMessage={signUpFormErrors.password}
                    onBlur={() => signUpFormInputFieldValidation("password")}
                    disabled={formLoading}
                />
            </div>

            <div className={styles["auth-birth-user-container"]}>
                <label className={styles["auth-birth-title"]}>Data de nascimento</label>
                <div className={styles["auth-birth-inputs"]}>
                    <AuthInputField
                        placeholder="Dia*"
                        value={birthDay}
                        onChange={handleDayChange}
                        type="number"
                        disabled={formLoading}
                    />

                    <AuthInputField
                        placeholder="Mês*"
                        value={birthMonth}
                        onChange={handleMonthChange}
                        ref={monthInputRef}
                        type="number"
                        disabled={formLoading}
                    />

                    <AuthInputField
                        placeholder="Ano*"
                        value={birthYear}
                        onChange={handleYearChange}
                        ref={yearInputRef}
                        type="number"
                        disabled={formLoading}
                    />
                </div>
                {birthError && (
                    <span className={styles["auth-birth-error"]}>{birthError}</span>
                )}
            </div>

            <div className={styles["auth-consent-container"]}>
                <label className={styles["auth-checkbox-label"]}>
                    <input type="checkbox" disabled={formLoading} className={styles["auth-checkbox"]} required />
                    <span className="auth-form-terms">
                        {"Concordo com a "}
                        <a href="#">Política de privacidade</a>
                        {" e os "}
                        <a href="#">Termos de uso</a>
                        {" da Nike."}
                    </span>
                </label>
            </div>

            <div className="auth-form-footer">
                <div className="auth-form-button">
                    <DefaultButton
                        type={"submit"}
                        disabled={formLoading || !isFormValid}
                    >
                        {
                            signUpFormLoading.loading ?
                                <PuffLoader
                                    size={22}
                                    color={"#FFFFFF"}
                                /> :
                                "Criar uma conta"
                        }
                    </DefaultButton>
                </div>
            </div>
        </form>
    );
}