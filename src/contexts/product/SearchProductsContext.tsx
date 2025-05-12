import { useSearchProductBehavior } from "@/hooks/search/useSearchProductBehavior";
import { LoadingStructure } from "@/types/loading/LoadingTypes";
import { ProductData } from "@/types/product/productTypes";
import { createContext, useContext, ReactNode } from "react";

type SearchProductsContextType = {
  searchProducts: ProductData[];
  searchQuery: string;
  clearProducts: () => void;
  searchGlobalLoading: LoadingStructure;
  handleSearchQuery:  (query: string) => void
  handleSearchProducts: (products: ProductData[]) => void;
};

const SearchProductsContext = createContext<SearchProductsContextType | undefined>(undefined);

export const SearchProductsProvider = ({ children }: { children: ReactNode }) => {
  const fetchSearchProducts = useSearchProductBehavior();

  return (
    <SearchProductsContext.Provider value={fetchSearchProducts}>
      {children}
    </SearchProductsContext.Provider>
  );
};

export const useSearchProducts = () => {
  const context = useContext(SearchProductsContext);
  if (!context) {
    throw new Error("Contexto precisa ser acionado dentro do provider: SearchProductsProvider");
  }
  return context;
};