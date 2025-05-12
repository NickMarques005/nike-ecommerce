import { useCallback } from 'react';
import { SetLoading } from '@/types/loading/LoadingTypes';
import { Response } from '@/types/api/ResponseTypes';

export interface ServiceFunction<T, Params extends any[]> {
    (...args: Params): Promise<Response<T>>;
}

export interface RequestParams<T, Params extends any[]> {
    serviceFunction: ServiceFunction<T, Params>;
    setLoading: SetLoading;
    params?: Params;
    stopLoading?: boolean;
    onAfterSuccess?: (res: Response<T>) => Promise<void> | void;
    onError?: (errorMsg: string) => void;
}

export const useRequest = () => {
    const HandleRequest = useCallback(
        async <T, Params extends any[]>({
            serviceFunction,
            setLoading,
            params,
            stopLoading = true,
            onAfterSuccess,
            onError,
        }: RequestParams<T, Params>): Promise<Response<T>> => {
            setLoading(true);

            try {
                const response = await serviceFunction(...(params ?? ([] as unknown as Params)));

                if (response.success) {
                    if (onAfterSuccess) await onAfterSuccess(response);
                } else {
                    const errorMessage =
                        response.error === 'Failed to fetch'
                            ? 'Não foi possível conectar ao servidor. Verifique sua internet ou tente novamente mais tarde.'
                            : response.error ?? 'Erro inesperado.';

                    if (onError) onError(errorMessage);

                    return {
                        success: false,
                        error: errorMessage,
                    };
                }

                return response;
            } catch (error) {
                console.error('(HandleRequest) Erro ao fazer requisição:', error);

                let errorMessage = 'Erro inesperado.';

                if (error instanceof TypeError && error.message === 'Failed to fetch') {
                    errorMessage = 'Não foi possível conectar ao servidor. Verifique sua internet ou tente novamente mais tarde.';
                } else if (error instanceof Error) {
                    errorMessage = error.message;
                }

                if (onError) onError(errorMessage);

                return {
                    success: false,
                    error: errorMessage,
                };
            } finally {
                if (stopLoading) setLoading(false);
            }
        },
        []
    );

    return { HandleRequest };
};