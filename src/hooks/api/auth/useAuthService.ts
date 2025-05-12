import { AuthService } from '@/api/services/auth/authServices';
import { Request_CheckUserBeforeSignInArgs, Request_InitAuthArgs, 
    Request_ResendOtpArgs, Request_SignUpArgs, 
    Request_SingleSignOnArgs, Request_ValidateAuthToken } from '@/types/api/services/AuthServiceTypes';
import { SetLoading } from '@/types/loading/LoadingTypes';
import { createServiceRunner } from '@/utils/helpers/createServiceRunner';

export const UseAuthService = (setLoading: SetLoading) => {
    const run = createServiceRunner(setLoading);

    return {
        performInitAuth: (
            args: Request_InitAuthArgs,
            stopLoading?: boolean
        ) => run(AuthService.init_auth, [args], stopLoading),

        performSignUp: (
            args: Request_SignUpArgs,
            stopLoading?: boolean
        ) => run(AuthService.sign_up, [args], stopLoading),

        performCheckUserBeforeSignIn: (
            args: Request_CheckUserBeforeSignInArgs,
            stopLoading?: boolean
        ) => run(AuthService.check_user_before_sign_in, [args], stopLoading),
        
        performValidateAuthToken: (
            args: Request_ValidateAuthToken,
            stopLoading?: boolean
        ) => run(AuthService.validate_auth_token, [args], stopLoading),

        performResendOtp: (
            args: Request_ResendOtpArgs,
            stopLoading?: boolean
        ) => run(AuthService.resend_otp, [args], stopLoading),

        performSingleSignOn: (
            args: Request_SingleSignOnArgs,
            stopLoading?: boolean
        ) => run(AuthService.single_sign_on, [args], stopLoading),
    };
};