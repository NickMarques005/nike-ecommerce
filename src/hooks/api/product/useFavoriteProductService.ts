
import { FavoriteProductService } from '@/api/services/product/favoriteProductServices';
import { SetLoading } from '@/types/loading/LoadingTypes';
import { createServiceRunner } from '@/utils/helpers/createServiceRunner';
import { useGetToken } from '../auth/useGetToken';
import { Token } from '@/types/auth/SessionTypes';

export const useFavoriteProductService = (setLoading: SetLoading) => {
    const { getIdToken } = useGetToken();
    const run = createServiceRunner(setLoading);

    return {
        performGetAllFavorites: async (stopLoading?: boolean) => {
            const token: Token = await getIdToken();
            return run(FavoriteProductService.get_all_favorites, [{ token }], stopLoading);
        },

        performAddFavorite: async (productId: string, stopLoading?: boolean) => {
            const token = await getIdToken();
            return run(FavoriteProductService.add_favorite, [{ productId, token }], stopLoading);
        },

        performRemoveFavorite: async (productId: string, stopLoading?: boolean) => {
            const token = await getIdToken();
            return run(FavoriteProductService.remove_favorite, [{ productId, token }], stopLoading);
        }
    };
};