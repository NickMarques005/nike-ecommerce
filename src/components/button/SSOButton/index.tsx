import React from "react";
import appImages from "@/utils/ui/appImages";
import "./sso-button.css";
import { SSOProviderType } from "@/types/auth/SSOTypes";

interface SSOButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    provider: SSOProviderType;
}

const SSOButton: React.FC<SSOButtonProps> = ({ provider, ...props }) => {
    const getProviderIcon = () => {
        switch (provider) {
            case "google":
                return appImages.authentication_images.google_logo;
            default:
                return "";
        }
    };

    return (
        <button className="sso-button" {...props}>
            <img src={getProviderIcon()} alt={`${provider} logo`} className="sso-icon" />
        </button>
    );
};

export default SSOButton;