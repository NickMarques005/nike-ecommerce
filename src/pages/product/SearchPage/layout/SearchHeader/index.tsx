import { FaShare, FaFilter, FaSortDown } from 'react-icons/fa6';

interface SearchHeaderProps {
    productSearch: string;
    totalSearchProducts: number;
}

const SearchHeader = ({
    productSearch,
    totalSearchProducts
}: SearchHeaderProps) => {

    return (
        <div className="search-header">
            <section className="search-header__title-section">
                <div className="search-header__title-wrapper">
                    <div className={"search-header__title-content"}>
                        <h1 className="search-header__title">{`${productSearch}`}</h1>
                        <span className="search-header__count">{`(${totalSearchProducts})`}</span>
                    </div>

                    <div className="search-header__actions">
                        <button className="search-header__button" onClick={() => console.log("Compartilhar")}>
                            Compartilhar <FaShare />
                        </button>
                        <button className="search-header__button" onClick={() => console.log("Filtrar")}>
                            Filtros <FaFilter />
                        </button>
                        <div className="search-header__order">
                            <button className="search-header__button" onClick={() => console.log("Ordenar")}>
                                Ordenar por <FaSortDown />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SearchHeader;