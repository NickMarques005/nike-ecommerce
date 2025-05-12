export interface RegisterCredentials {
    name: string;
    email: string;
    birth: string;
    password: string;
    otp_code: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
    otp_code: string;
}

export interface StartAuthCredentials {
    email: string;
}

// Errors

export type SignUpFormErrors = Partial<Record<keyof RegisterCredentials, string>>;
export type SignInFormErrors = Partial<Record<keyof LoginCredentials, string>>;
export type StartAuthErrors = Partial<Record<keyof StartAuthCredentials, string>>;