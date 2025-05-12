import React, { forwardRef } from "react";
import "./default-input.css";

interface DefaultInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const DefaultInput = forwardRef<HTMLInputElement, DefaultInputProps>(({ className = "", ...props }, ref) => {
    return (
        <input
            type="text"
            className={`custom-input ${className}`}
            autoComplete="off"
            ref={ref}
            {...props}
        />
    );
});

export default DefaultInput;