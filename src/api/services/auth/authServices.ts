
import { Response } from '@/types/api/ResponseTypes';
import { MakeRequest } from '../makeRequest';
import { Request_CheckUserBeforeSignInArgs, Request_InitAuthArgs, 
    Request_ResendOtpArgs, Request_SignUpArgs, Request_SingleSignOnArgs, Request_ValidateAuthToken, 
    Response_InitAuthArgs, Response_ResendOtpArgs, Response_ValidateAuthToken } from '@/types/api/services/AuthServiceTypes';

export const AuthService = {
    // Envia o OTP para email do usuário (sign up ou sign in)
    init_auth: async (args: Request_InitAuthArgs): Promise<Response<Response_InitAuthArgs>> => {
        return MakeRequest<any>({
            endpoint: 'auth/init', 
            method: 'POST', 
            data: args
        });
    },

    // Cria o usuário com o código recebido por e-mail
    sign_up: async (args: Request_SignUpArgs): Promise<Response<any>> => {
        return MakeRequest<any>({
            endpoint: 'auth/signup',
            method: 'POST',
            data: args
        });
    },

    // Checa se o usuário pode fazer login (email + otp_code)
    check_user_before_sign_in: async (args: Request_CheckUserBeforeSignInArgs): Promise<Response<any>> => {
        return MakeRequest<any>({
            endpoint: 'auth/check-user-before-signin', 
            method: 'POST', 
            data: args
        });
    },

    // Valida token de autenticação para executar login ou cadastro
    validate_auth_token: async (args: Request_ValidateAuthToken): Promise<Response<Response_ValidateAuthToken>> => {
        return MakeRequest<Response_ValidateAuthToken>({
            endpoint: 'auth/validate',
            method: 'GET',
            queryParams: {
                token: args.token,
                context: args.context,
            }
        });
    },

    // Reenvia o OTP para o e-mail do usuário
    resend_otp: async (args: Request_ResendOtpArgs): Promise<Response<Response_ResendOtpArgs>> => {
        return MakeRequest<any>({
            endpoint: 'auth/resend-otp',
            method: 'POST',
            data: args
        });
    },

    // Executa a autenticação por Single Sign On
    single_sign_on: async (args: Request_SingleSignOnArgs): Promise<Response<any>> => {
        return MakeRequest<any>({
            endpoint: 'auth/single-sign-on',
            method: 'POST',
            data: args,
        });
    },
};