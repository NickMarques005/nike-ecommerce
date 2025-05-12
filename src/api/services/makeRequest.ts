import { Response } from '@/types/api/ResponseTypes';
import { Token } from '@/types/auth/SessionTypes';
import { fullApiServerUrl } from '@/constants/server/serverUrl';
import { MakeRequestOptions } from '@/types/api/RequestTypes';

const makeHeaders = (token?: Token): HeadersInit => {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

export const MakeRequest = async <T>({
    endpoint,
    method = 'GET',
    data,
    token,
    queryParams,
    pathParams,
}: MakeRequestOptions<T>): Promise<Response<T>> => {
    let url = pathParams
        ? `${fullApiServerUrl}/${endpoint}/${pathParams}`
        : `${fullApiServerUrl}/${endpoint}`;

    if (queryParams) {
        const query = new URLSearchParams();
        for (const key in queryParams) {
            const value = queryParams[key];
            if (value !== undefined) query.append(key, value.toString());
        }
        url += `?${query.toString()}`;
    }

    const headers = makeHeaders(token);

    const options: RequestInit = {
        method,
        headers,
        credentials: 'include',
        body: method !== 'GET' && data ? JSON.stringify(data) : undefined,
    };

    try {
        const res = await fetch(url, options);
        const resData = await res.json();

        if (!res.ok) {
            return {
                success: false,
                error: resData?.error || `(${res.status}) Houve um erro`
            };
        }

        return resData as Response<T>;
    } catch (err) {
        console.error('Erro na requisição:', err);
        return { success: false, error: (err as Error).message };
    }
};