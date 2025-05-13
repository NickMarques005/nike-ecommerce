import React from "react";
import "./default-header.css";

const DefaultHeader = () => {
    return (
        <div className="default-header-container">
            <div className="default-header-wrapper">
                <a href="/" className="default-logo-link">
                    <img
                        src="https://static.nike.com.br/v11-82-0/images/brands/logo.svg"
                        alt="Nike"
                        width="64"
                        height="23"
                    />
                </a>
            </div>
        </div>
    );
};

export default DefaultHeader;