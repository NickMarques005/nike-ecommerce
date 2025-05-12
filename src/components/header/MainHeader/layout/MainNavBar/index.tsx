import React from "react";
import SearchBarContainer from "../SearchBarContainer";
import "./main-nav-bar.css"

const MainNavBar = () => {
    return (
        <div className="sub-header-container">
            <div className="wrapper">
                <div className="main-header">
                    <div className="logo-wrapper">
                        <a href="/" className="logo">
                            <img
                                src="https://static.nike.com.br/v11-82-0/images/brands/logo.svg"
                                alt="Nike"
                                width="64"
                                height="23"
                            />
                        </a>
                    </div>
                    <nav className="nav-links">
                        <a href="/">Lançamentos</a>
                        <a href="/">Ofertas</a>
                        <a href="/">Masculino</a>
                        <a href="/">Feminino</a>
                        <a href="/">Infantil</a>
                        <a href="/">SNKRS</a>
                    </nav>
                    <SearchBarContainer />
                </div>
            </div>
        </div>
    );
};

export default MainNavBar;