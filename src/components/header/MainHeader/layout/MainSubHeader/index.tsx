import React from "react";
import "./main-sub-header.css";
import { useSubHeaderActions } from "@/hooks/header/useSubHeaderActions";
import { useAuth } from "@/contexts/auth/AuthContext";
import { useUser } from "@/contexts/user/UserContext";
import UserAvatarContainer from "@/components/user/UserAvatarContainer";
import { PuffLoader } from "react-spinners";

const MainSubHeader = () => {

    const { subHeaderActions } = useSubHeaderActions();
    const { user, authLoadingState } = useAuth();
    const { userData, userDataLoadingState } = useUser();

    const userAuthLoading = authLoadingState.loading || userDataLoadingState.loading;

    return (
        <div className="sub-header-bg">
            <div className="sub-header-container">
                <div className="wrapper">
                    <div className="sub-header">
                        <div className="brand-box">
                            <a href="/nav/marca/jordan" title="Ir para página do Jordan">
                                <img
                                    src="https://static.nike.com.br/v11-82-0/images/brands/jordan.svg"
                                    alt="Jordan"
                                    width="19"
                                    height="18"
                                />
                            </a>
                            <a href="/snkrs" title="Ir para página do Sneakers">
                                <img
                                    src="https://static.nike.com.br/v11-82-0/images/brands/snkrs.svg"
                                    alt="Sneakers"
                                    width="46"
                                    height="15"
                                />
                            </a>
                        </div>
                        <div className="links-box">
                            <button>Acessibilidade</button>
                            <span className="divider" />
                            <a href="/journal">Nike Journal</a>
                            <span className="divider" />
                            <a href="/acompanhar-pedido">Acompanhe seu pedido</a>
                            <span className="divider" />
                            <a href="https://atendimento.nike.com.br/hc/pt-br">Ajuda</a>
                            <span className="divider" />
                            <a href="https://bit.ly/3QBF14o">Junte-se a nós</a>
                            <span className="divider" />
                            {
                                userAuthLoading ? 
                                <PuffLoader
                                    color={"#ccc"}
                                    size={20}
                                /> :
                                    user && userData ? (
                                        <UserAvatarContainer userData={userData} />
                                    ) : (
                                        <button onClick={subHeaderActions.handleLogin}>Entrar</button>
                                    )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainSubHeader;