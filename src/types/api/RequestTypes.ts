import { Token } from "../auth/SessionTypes";

export interface MakeRequestOptions<T> {
    endpoint: string;
    method?: RequestMethod;
    data?: object;
    token?: Token;
    queryParams?: Record<string, string | number>;
    pathParams?: string;
};

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'