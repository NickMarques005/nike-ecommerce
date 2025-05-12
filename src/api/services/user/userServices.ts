import { Response } from '@/types/api/ResponseTypes';
import { MakeRequest } from '../makeRequest';
import { Token } from '@/types/auth/SessionTypes';
import { Response_GetUserData } from '@/types/api/services/UserServiceTypes';

export const UserService = {
    get_user_data: async (token: Token): Promise<Response<Response_GetUserData>> => {
        return MakeRequest<Response_GetUserData>({
            endpoint: 'user/me',
            method: 'GET',
            token,
        });
    },
};