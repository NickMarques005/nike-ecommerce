import { AuthContextType } from "@/types/auth/ContextTypes";
import { SSOCredentials } from "@/types/auth/SSOTypes";

export interface Request_InitAuthArgs {
    email: string;
}
export interface Request_SignUpArgs {
    email: string;
    name: string;
    birth: string;
    password: string;
    otp_code: string;
}
export interface Request_CheckUserBeforeSignInArgs {
    email: string;
    otp_code: string;
}

export interface Request_ValidateAuthToken{
    token: string;
    context: AuthContextType;
}

export interface Request_ResendOtpArgs{
    email: string;
}

export interface Request_SingleSignOnArgs{
    idToken: string;
    credentials: SSOCredentials;
}

export interface Response_ValidateAuthToken{
    email: string;
}

export interface Response_InitAuthArgs{
    redirectUrl: string;
}

export interface Response_ResendOtpArgs{
    redirectUrl: string;
}