/**
 * Calcula o preço com desconto aplicado.
 * @param price Preço original do produto
 * @param discount Desconto em porcentagem (0 a 100)
 * @returns Preço com desconto
 */
export const getDiscountedPrice = (price: number, discount: number): number => {
    const discounted = discount > 0 ? price * (1 - discount / 100) : price;
    return parseFloat(discounted.toFixed(2));
};

/**
 * Gera texto formatado para parcelas (parcelamento).
 * @param price Preço total
 * @param installments Número de parcelas
 * @returns Texto no formato: "ou 3x de R$ xx,xx"
 */
export const getInstallmentText = (price: number, installments: number): string => {
    if (!installments || installments < 2) return '';
    const installmentValue = price / installments;
    return `ou ${installments}x de ${installmentValue.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })}`;
};