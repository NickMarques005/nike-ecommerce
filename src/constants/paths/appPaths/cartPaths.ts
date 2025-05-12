const BasicPaths = {
    ROOT: "/carrinho",
    CHECKOUT: "checkout"
};

const CartCompletePaths = {
    CHECKOUT: `${BasicPaths.ROOT}/${BasicPaths.CHECKOUT}`,
}

export default { BasicPaths, CartCompletePaths };