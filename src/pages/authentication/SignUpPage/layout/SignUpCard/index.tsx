import AuthPrompt from "@/components/prompt/AuthPrompt";
import { SignUpForm } from "../SignUpForm";
import appImages from "@/utils/ui/appImages";
import { useAuthNavigation } from "@/hooks/navigation/auth/useAuthNavigation";

interface SignUpCardProps {
    userEmail: string | null;
}

export const SignUpCard = ({
    userEmail
}: SignUpCardProps) => {

    const { goToInitAuth } = useAuthNavigation();

    return (
        <div className="auth-card">
            <header className="auth-card-header">
                <div className="auth-logo-container">
                    <img
                        src={appImages.generic_images.logo.nike_logo}
                        alt="Nike logo"
                        className="auth-logo nike"
                    />
                    <img
                        src={appImages.generic_images.logo.jordan_logo}
                        alt="Jordan logo"
                        className="auth-logo jordan"
                    />
                </div>
                <div className="auth-title-container">
                    <h1>{"Crie sua conta Nike."}</h1>
                </div>
                <div className="auth-email-container">
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
            </header>
            {
                userEmail && <SignUpForm userEmail={userEmail} />
            }
        </div>
    );
}