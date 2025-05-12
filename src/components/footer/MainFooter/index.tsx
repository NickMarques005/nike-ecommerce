import React from 'react';
import { FaFacebookSquare, FaInstagramSquare, FaYoutubeSquare } from 'react-icons/fa';
import "./main-footer.css";

const mainFooterLinks = [
    { label: 'Encontre uma loja Nike', href: '/#' },
    { label: 'Cadastre-se para receber novidades', href: '/#' },
    { label: 'Cartão presente', href: '/#' },
    { label: 'Mapa do site', href: '/#' },
    { label: 'Nike Journal', href: '/#' },
    { label: 'Corinthians', href: '/#' },
    { label: 'Black friday', href: '/#' },
    { label: 'Acompanhe seu pedido', href: '/#' },
];

const helpCategories = [
    { title: 'Dúvidas Gerais', href: '/#' },
    { title: 'Encontre seu tamanho', href: '/#' },
    { title: 'Entregas', href: '/#' },
    { title: 'Pedidos', href: '/#' },
    { title: 'Devoluções', href: '/#' },
    { title: 'Pagamentos', href: '/#' },
    { title: 'Produtos', href: '/#' },
    { title: 'Corporativo', href: '/#' },
    { title: 'Fale Conosco', href: '/#' },
];

const aboutCategories = [
    { title: 'Propósito', href: '/#' },
    { title: 'Sustentabilidade', href: '/#' },
    { title: 'Sobre a Nike, Inc.', href: '/#' },
    { title: 'Sobre o Grupo SBF', href: '/#' }
];

export const MainFooter = () => {
    return (
        <footer className="footer">
            <div className="top-main-footer">
                <div className="footer-links">
                    {mainFooterLinks.map(({ label, href }) => (
                        <a key={label} href={href} className="footer-main-link">
                            {label}
                        </a>
                    ))}
                </div>

                <div className="help-links">
                    <div className={"footer-link-title"}>
                        <p className="section-title">
                            Ajuda
                        </p>
                    </div>
                    <div className={"footer-links-box"}>
                        {helpCategories.map(({ title, href }) => (
                            <a key={title} href={href} className="footer-link">
                                {title}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="about-links">
                    <div className={"footer-link-title"}>
                        <p className="section-title">
                            Sobre a Nike
                        </p>
                    </div>
                    <div className={"footer-links-box"}>
                        {aboutCategories.map(({ title, href }) => (
                            <a key={title} href={href} className="footer-link">
                                {title}
                            </a>
                        ))}
                    </div>

                </div>

                <div className="footer-info-container">
                    {/* Redes Sociais */}
                    <div className="footer-section" data-testid="footer-social">
                        <p className="section-title">Redes sociais</p>
                        <div className="social-icons">
                            <a href="https://www.facebook.com/nike" target="_blank" rel="noopener noreferrer" title="Facebook">
                                <FaFacebookSquare color={"#c2c2c2"} size={22} />
                            </a>
                            <a href="https://www.instagram.com/nike/" target="_blank" rel="noopener noreferrer" title="Instagram">
                                <FaInstagramSquare color={"#c2c2c2"} size={22} />
                            </a>
                            <a href="https://www.instagram.com/nike/" target="_blank" rel="noopener noreferrer" title="Instagram">
                                <FaYoutubeSquare color={"#c2c2c2"} size={22} />
                            </a>
                        </div>
                    </div>

                    {/* Formas de Pagamento */}
                    <div className="footer-section" data-testid="footer-payments">
                        <p className="section-title">Formas de pagamento</p>
                        <div className="payment-icons">
                            <div className={"payment-icon-box"}>
                                <img src="https://static.nike.com.br/v11-82-0/images/paymentMethods/visa.svg" alt="Visa" />
                            </div>
                            <div className={"payment-icon-box"}>
                                <img src="https://static.nike.com.br/v11-82-0/images/paymentMethods/mastercard.svg" alt="Mastercard" />
                            </div>
                            <div className={"payment-icon-box"}>
                                <img src="https://static.nike.com.br/v11-82-0/images/paymentMethods/pix.svg" alt="Pix" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="footer-divider" />
            
            <div className="bottom-footer-container">
                <div className="bottom-footer-links">
                    <a href="#" target="_self">Brasil</a>
                    <a href="/#" target="_self">Política de privacidade</a>
                    <a href="/#" target="_self">Política de cookies</a>
                    <a href="/#" target="_self">Termos de uso</a>
                </div>
                <p className="footer-copyright">
                    © 2025 Nike. Este site é um clone da Nike desenvolvido por Nicolas Marques com fins educacionais e demonstrativos. Todos os direitos sobre a marca, logotipo e identidade visual pertencem à Nike, Inc. Nenhuma intenção de uso comercial. Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
};