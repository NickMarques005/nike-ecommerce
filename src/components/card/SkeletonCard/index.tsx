import React from "react";
import "./skeleton-card.css"; // crie estilos animados aqui

interface SkeletonCardProps{
    width?: string;
    height?: string;
}

const SkeletonCard = ({
    width = "100%",
    height = "450px"
}: SkeletonCardProps) => {
    return (
        <div style={{
            width,
            height
        }} className="skeleton-card">
            <div className="skeleton-image shimmer" />
            <div className="skeleton-text shimmer" />
            <div className="skeleton-text shimmer short" />
        </div>
    );
};

export default SkeletonCard;