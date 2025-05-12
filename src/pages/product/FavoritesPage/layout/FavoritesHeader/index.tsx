import { FaShare, FaFilter, FaSortDown } from 'react-icons/fa6';

interface FavoritesHeaderProps {
    totalFavorites: number;
}

const FavoritesHeader = ({ totalFavorites }: FavoritesHeaderProps) => {
    return (
        <div className="favorites-header">
            <section className="favorites-header__title-section">
                <div className="favorites-header__title-wrapper">
                    <div className={"favorites-header__title-content"}>
                        <h1 className="favorites-header__title">Favoritos</h1>
                        <span className="favorites-header__count">{`(${totalFavorites})`}</span>
                    </div>

                    <div className="favorites-header__actions">
                        <button className="favorites-header__button" onClick={() => console.log("Compartilhar")}>
                            Compartilhar <FaShare />
                        </button>
                        <button className="favorites-header__button" onClick={() => console.log("Filtrar")}>
                            Filtros <FaFilter />
                        </button>
                        <div className="favorites-header__order">
                            <button className="favorites-header__button" onClick={() => console.log("Ordenar")}>
                                Ordenar por <FaSortDown />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FavoritesHeader;