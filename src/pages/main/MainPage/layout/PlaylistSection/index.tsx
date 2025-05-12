import React from "react";
import "./playlist-section-styles.css";
import PlaylistItem from "@/components/main/PlaylistItem";
import appImages from "@/utils/ui/appImages";


const PlaylistSection = () => {

    return (
        <section className="playlist-section">
            {/* Primeira linha de containers (Amortecimento Máximo, Air Jordan) */}
            <div className="playlist-row">
                <PlaylistItem
                    title="Amortecimento Máximo"
                    subtitle="A experiência de um amortecimento imbatível"
                    buttonText="Ver Lançamento"
                    imageSrc={appImages.main_images.playlist_section.playlist_section_vomero_18}
                />
                <PlaylistItem
                    title="Air Jordan"
                    subtitle="A coleção que define estilo e performance"
                    buttonText="Ver Coleção"
                    imageSrc={appImages.main_images.playlist_section.playlist_section_air_jordan}
                />
            </div>

            {/* Segunda linha de containers (Para ter conforto o dia todo) */}
            <div className="playlist-row full-width">
                <PlaylistItem
                    title="Para ter conforto o dia todo"
                    subtitle="Conforto e estilo o dia todo"
                    buttonText="Saiba Mais"
                    imageSrc={appImages.main_images.playlist_section.playlist_section_confort}
                />
            </div>
        </section>
    );
};

export default PlaylistSection;