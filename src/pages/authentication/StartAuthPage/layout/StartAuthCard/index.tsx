import { StartAuthForm } from "../StartAuthForm";
import appImages from "@/utils/ui/appImages";

export function StartAuthCard() {
    return (
        <div className="auth-card">
            <header className="auth-card-header">
                <div className={"auth-logo-container"}>
                    <img src={appImages.generic_images.logo.nike_logo} alt="Nike logo" className="auth-logo nike" />
                    <img src={appImages.generic_images.logo.jordan_logo} alt="Jordan logo" className="auth-logo jordan" />
                </div>
                <div className={"auth-title-container"}>
                    <h1>
                        {"Insira seu e-mail para entrar."}
                    </h1>
                </div>
            </header>
            <StartAuthForm />
        </div>
    );
}