import AuthInputField from "@/components/form-inputs/AuthInputField";
import DefaultButton from "@/components/button/DefaultButton";
import SSOButton from "@/components/button/SSOButton";
import styles from "./start-auth-form.module.css";
import { useInitAuthForm } from "@/hooks/auth/useInitAuthForm";
import { PuffLoader } from "react-spinners";
import { useSSOProviderHandler } from "@/hooks/auth/useSSOProviderHandler";

export function StartAuthForm() {
    const {
        credentials,
        initAuthErrors,
        initAuthLoading,
        handleChange,
        handleSubmit,
        initAuthFormInputFieldValidation,
        initAuthFormValidation
    } = useInitAuthForm();

    const {
        handleGoogleLoginPopup,
        ssoProviderLoading
    } = useSSOProviderHandler();

    const isFormValid = initAuthFormValidation();

    const formLoading = ssoProviderLoading.loading || initAuthLoading.loading;

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-input-field-container">
                <AuthInputField
                    placeholder={"E-mail*"}
                    value={credentials.email}
                    errorMessage={initAuthErrors.email}
                    onChange={handleChange("email")}
                    onBlur={() => initAuthFormInputFieldValidation("email")}
                    disabled={formLoading}
                />
            </div>

            <div className="auth-form-footer">
                <div className="auth-form-terms">
                    {"Ao continuar, afirmo que concordo com a "}
                    <a href={"#"}>Política de privacidade</a>
                    {" e os "}
                    <a href={"#"}>Termos de uso</a>
                    {" da Nike."}
                </div>
                <div className="auth-form-button">
                    <DefaultButton
                        disabled={formLoading || !isFormValid}
                        type={"submit"}
                    >
                        {
                            initAuthLoading.loading ?
                                <PuffLoader
                                    size={22}
                                    color={"#FFFFFF"}
                                />
                                :
                                "Continuar"
                        }
                    </DefaultButton>
                    <div className={styles["auth-divider-container"]}>
                        <span className={styles["auth-divider-line"]}></span>
                        <span className={styles["auth-divider-text"]}>ou continue com</span>
                        <span className={styles["auth-divider-line"]}></span>
                    </div>
                    <SSOButton
                        disabled={formLoading}
                        provider={"google"}
                        onClick={handleGoogleLoginPopup}
                    />
                </div>
            </div>
        </form>
    );
}