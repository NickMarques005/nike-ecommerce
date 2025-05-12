import React from "react";
import "./playlist-item-styles.css";

interface PlaylistItemProps {
    title: string;
    subtitle: string;
    buttonText: string;
    imageSrc: string;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ title, subtitle, buttonText, imageSrc }) => {
    return (
        <a href="#" className="playlist-item">
            <div className="image-container">
                <img src={imageSrc} alt={title} className="playlist-image" />
                <div className="overlay">
                    <div className={"playlist-title-container"}>
                        <span>{subtitle}</span>
                        <h3 className="playlist-title">{title}</h3>
                    </div>
                    <div className={"playlist-item-link-container"}>
                        <div className="playlist-item-link">{buttonText}</div>
                    </div>

                </div>
            </div>
        </a>
    );
};

export default PlaylistItem;