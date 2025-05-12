import React from "react";
import "./brand-icons-grid-styles.css";

const nikeIcons = [
    {
        name: "Air Force",
        image: "https://imgnike-a.akamaihd.net/branding/home-sbf/touts/icone-air-force-1.png",
    },
    {
        name: "Dunk",
        image: "https://imgnike-a.akamaihd.net/branding/home-sbf/touts/icone-dunk.png",
    },
    {
        name: "Air Jordan",
        image: "https://imgnike-a.akamaihd.net/branding/home-sbf/touts/icone-air-jordan.png",
    },
    {
        name: "Air Max",
        image: "https://imgnike-a.akamaihd.net/branding/home-sbf/touts/icone-air-max.png",
    },
];

const BrandIconsGrid = () => {
    return (
        <div className="brand-icons-section">
            <div className="brand-icons-title">
                <h2>Ícones Nike</h2>
            </div>
            <div className="brand-icons-grid-container">
                {nikeIcons.map((icon) => (
                    <div className="brand-icon-card" key={icon.name}>
                        <img src={icon.image} alt={icon.name} className="brand-icon-image" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BrandIconsGrid;