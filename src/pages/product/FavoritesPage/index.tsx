
import "./styles/favorites-page.css";
import "./styles/favorites-header.css";
import "./styles/no-favorites-results.css";
import "./styles/favorite-product-list.css";
import { useFavoriteProducts } from '@/contexts/product/FavoriteProductsContext';
import NoFavoriteProducts from "./layout/NoFavoriteProducts";
import FavoritesHeader from "./layout/FavoritesHeader";
import FavoritesProductList from "./layout/FavoriteProductList";
import SkeletonCard from "@/components/card/SkeletonCard";

const FavoritesPage = () => {
    const { favoriteProducts, fetchFavoriteProductsLoading } = useFavoriteProducts();

    return (
        <div className="favorites-container">
            <div className={"favorites-wrapper"}>
                {
                    fetchFavoriteProductsLoading.loading ? (
                        <div className="favorites-results-placeholder">
                            <div className={"favorites-product-list"}>
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <SkeletonCard key={index} />
                                ))}
                            </div>
                        </div>
                    ) : (
                        favoriteProducts.length === 0 ?
                            <NoFavoriteProducts />
                            :
                            <>
                                <FavoritesHeader totalFavorites={favoriteProducts.length} />
                                <div className="favorites-results-placeholder">
                                    <FavoritesProductList favoriteProductList={favoriteProducts} />
                                </div>
                            </>
                    )
                }
            </div>
        </div>
    );
};

export default FavoritesPage;
