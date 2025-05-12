const BasicPaths = {
    ROOT: "/auth",
    INITIATE: "iniciar",
    SIGN_IN: "entrar",
    SIGN_UP: "criar-conta",
    FORGOT_PASSWORD: "esqueceu-a-senha"
};

const CompleteAuthPaths = {
    INITIATE: `${BasicPaths.ROOT}/${BasicPaths.INITIATE}`,
    SIGN_IN: `${BasicPaths.ROOT}/${BasicPaths.SIGN_IN}`,
    SIGN_UP: `${BasicPaths.ROOT}/${BasicPaths.SIGN_UP}`,
    FORGOT_PASSWORD: `${BasicPaths.ROOT}/${BasicPaths.FORGOT_PASSWORD}`,
}

export default { BasicPaths, CompleteAuthPaths };