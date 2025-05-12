import React from "react";
import "./skeleton-card.css"; // crie estilos animados aqui

const SkeletonCard = () => {
    return (
        <div className="skeleton-card">
            <div className="skeleton-image shimmer" />
            <div className="skeleton-text shimmer" />
            <div className="skeleton-text shimmer short" />
        </div>
    );
};

export default SkeletonCard;