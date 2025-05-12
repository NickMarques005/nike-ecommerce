const BasicPaths = {
    ROOT: "/carrinho",
    CART_PRODUCTS: "produtos",
    IDENTIFICATION: "identificação",
    PURCHASE: "comprar"
};

const CartCompletePaths = {
    CART_PRODUCTS: `${BasicPaths.ROOT}/${BasicPaths.CART_PRODUCTS}`,
    IDENTIFICATION: `${BasicPaths.ROOT}/${BasicPaths.IDENTIFICATION}`,
    PURCHASE: `${BasicPaths.ROOT}/${BasicPaths.PURCHASE}`,
}

export default { BasicPaths, CartCompletePaths };