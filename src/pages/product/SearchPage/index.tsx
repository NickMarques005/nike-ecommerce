import SearchHeader from './layout/SearchHeader';
import "./styles/search-page.css";
import "./styles/search-header.css";
import "./styles/no-search-results.css";
import "./styles/search-product-list.css";
import SearchProductList from './layout/SearchProductList';
import NoSearchProducts from './layout/NoSearchProducts';
import { useSearchProducts } from '@/contexts/product/SearchProductsContext';
import { useFetchSearchProducts } from '@/hooks/search/useFetchSearchProducts';
import { useSearchParams } from 'react-router-dom';
import SkeletonCard from '@/components/card/SkeletonCard';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const termo = searchParams.get("termo") || "";

    const { searchProducts, searchQuery } = useSearchProducts();
    const { searchGlobalLoading } = useFetchSearchProducts({ query: termo });

    return (
        <div className="search-container">
            <div className={"search-wrapper"}>
                <>
                    {
                        searchGlobalLoading.loading ? (
                            <div className="search-results-placeholder">
                                <div className={"search-product-list"}>
                                    {Array.from({ length: 6 }).map((_, index) => (
                                        <SkeletonCard key={index} />
                                    ))}
                                </div>

                            </div>
                        ) : (
                            searchProducts.length === 0 ? (
                                <NoSearchProducts searchInput={searchQuery} />
                            ) : (
                                <>
                                    <SearchHeader productSearch={searchQuery} totalSearchProducts={searchProducts.length} />
                                    <div className="search-results-placeholder">
                                        <SearchProductList searchProductList={searchProducts} />
                                    </div>
                                </>
                            )
                        )
                    }
                </>

            </div>
        </div>
    );
};

export default SearchPage;