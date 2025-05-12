import { SetLoading } from '@/types/loading/LoadingTypes';
import { Response } from '@/types/api/ResponseTypes';
import { ServiceFunction, useRequest } from '@/hooks/api/useRequest';

export const createServiceRunner = (setLoading: SetLoading) => {
    const { HandleRequest } = useRequest();

    return function run<T, Params extends any[]>(
        serviceFunction: ServiceFunction<T, Params>,
        params: Params,
        stopLoading?: boolean,
        onAfterSuccess?: (res: Response<T>) => Promise<void> | void,
        onError?: (errorMsg: string) => void
    ): Promise<Response<T>> {
        return HandleRequest({
            serviceFunction,
            setLoading,
            params,
            stopLoading,
            onAfterSuccess,
            onError
        });
    };
};