import { SignInForm } from "../SignInForm";
import appImages from "@/utils/ui/appImages";
import AuthPrompt from "@/components/prompt/AuthPrompt";
import { useAuthNavigation } from "@/hooks/navigation/auth/useAuthNavigation";

interface SignInCardProps {
    userEmail: string | null;
}

export function SignInCard({
    userEmail
}: SignInCardProps) {

    const { goToInitAuth } = useAuthNavigation();

    return (
        <div className="auth-card">
            <header className="auth-card-header">
                <div className={"auth-logo-container"}>
                    <img src={appImages.generic_images.logo.nike_logo} alt="Nike logo" className="auth-logo nike" />
                    <img src={appImages.generic_images.logo.jordan_logo} alt="Jordan logo" className="auth-logo jordan" />
                </div>
                <div className={"auth-title-container"}>
                    <h1>
                        {"Qual é a sua senha?"}
                    </h1>
                    <div className={"auth-email-container"}>
                        {
                            userEmail ?
                                <>
                                    <p>Enviamos um código para</p>
                                    <div className={"auth-change-email"}>
                                        <strong>{userEmail}</strong>
                                        <AuthPrompt
                                            linkText={"Editar"}
                                            onClick={() => goToInitAuth()}
                                        />
                                    </div>
                                </>
                                : <div className={"auth-no-email-box"} />
                        }
                    </div>
                </div>
            </header>
            {
                userEmail && <SignInForm userEmail={userEmail} />
            }
        </div>
    );
}