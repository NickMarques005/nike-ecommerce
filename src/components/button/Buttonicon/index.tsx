import React from "react";
import "./button-icon.css";

interface ButtonIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: React.ReactNode;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({ icon, className = "", ...props }) => {
    return (
        <button
            type="button"
            className={`button-icon ${className}`}
            {...props}
        >
            {icon}
        </button>
    );
};

export default ButtonIcon;