import { ProductService } from '@/api/services/product/productServices';
import { SetLoading } from '@/types/loading/LoadingTypes';
import { createServiceRunner } from '@/utils/helpers/createServiceRunner';

export const UseProductService = (setLoading: SetLoading) => {
    const run = createServiceRunner(setLoading);

    return {
        performGetAllProducts: (stopLoading?: boolean) =>
            run(ProductService.get_all_products, [], stopLoading),

        performGetBestDiscounts: (stopLoading?: boolean) =>
            run(ProductService.get_best_discounts, [], stopLoading),

        performGetComboProducts: (combo: string, stopLoading?: boolean) =>
            run(ProductService.get_combo_products, [{ combo }], stopLoading),

        performGetProductById: (
            productId: string,
            stopLoading?: boolean
        ) => run(ProductService.get_product_by_id, [{ productId }], stopLoading),

        performGetProductsBySearch: (
            searchQuery: string,
            stopLoading?: boolean
        ) => run(ProductService.get_products_by_search, [{ searchQuery }], stopLoading),
    };
};