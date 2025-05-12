import React, { useState, forwardRef } from "react";
import DefaultInput from "../../input/DefaultInput";
import "./auth-input-field.css";

interface AuthInputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    errorMessage?: string;
    icon?: React.ReactNode;
}

const AuthInputField = forwardRef<HTMLInputElement, AuthInputFieldProps>(
    ({ errorMessage, className = "", icon, ...props }, ref) => {
        const [isFocused, setIsFocused] = useState(false);
        const hasContent = Boolean(props.value);

        return (
            <div className="auth-input-container">
                <div className={`auth-input-wrapper ${errorMessage ? "error" : ""} 
                                ${isFocused || hasContent ? "focused" : ""}`}>
                    {props.placeholder && (
                        <label className="auth-input-placeholder-label">
                            {props.placeholder}
                        </label>
                    )}
                    <DefaultInput
                        className={`auth-input ${errorMessage && "error"} ${className}`}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        ref={ref}
                        {...props}
                    />
                    {icon && <span className="auth-input-icon">{icon}</span>}
                </div>
                <div className="auth-error-message">{errorMessage}</div>
            </div>
        );
    }
);

export default AuthInputField;