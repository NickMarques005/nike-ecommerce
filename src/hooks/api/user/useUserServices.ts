import { UserService } from '@/api/services/user/userServices';
import { Token } from '@/types/auth/SessionTypes';
import { SetLoading } from '@/types/loading/LoadingTypes';
import { createServiceRunner } from '@/utils/helpers/createServiceRunner';

export const UseUserService = (setLoading: SetLoading) => {
    const run = createServiceRunner(setLoading);

    return {
        performGetUserData: (
            token: Token,
            stopLoading?: boolean
        ) => run(UserService.get_user_data, [token], stopLoading),
    };
};