import { useAuthTokenValidation } from "@/hooks/auth/useAuthTokenValidation";
import { SignUpCard } from "./layout/SignUpCard";
import { PuffLoader } from "react-spinners";

const SignUpPage = () => {
    const { authTokenValidationLoading, error, email } = useAuthTokenValidation();

    if (error) {
        return (
            <div className="auth-page">
                <div className={"auth-page-error-box"}>
                    <div className={"auth-page-error-logo"}>
                        <img src={"https://ik.imagekit.io/ogsugi6fx/clone-nike/nike-logo-mail.png?updatedAt=1746482682223"} alt={"Logo Imagem"} />
                    </div>
                    <div className={"auth-page-error-content"}>
                        <p className={"auth-page-error-text"}>{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    if (authTokenValidationLoading.loading) {
        return (
            <div className={"auth-page"}>
                <PuffLoader size={48} color="#f2f2f2" />
            </div>
        );
    }

    return (
        <div className="auth-page">
            <SignUpCard userEmail={email} />
        </div>
    );
};

export default SignUpPage;