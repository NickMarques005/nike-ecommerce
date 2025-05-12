import React from "react";
import "./default-button.css";

interface DefaultButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

const DefaultButton: React.FC<DefaultButtonProps> = ({ className = "", ...props }) => {
    return (
        <button className={`custom-button ${className} ${props.disabled && "disabled"}`} {...props} />
    );
};

export default DefaultButton;