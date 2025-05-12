import { Request_ResendOtpArgs } from "@/types/api/services/AuthServiceTypes";
import { UseAuthService } from "../api/auth/useAuthService"
import { useLoading } from "../loading/useLoading";
import { useRequestToast } from "../toast/useRequestToast";

export const useResendOTPHandler = () => {
    const resendEmailLoading = useLoading();
    const { performResendOtp } = UseAuthService(resendEmailLoading.setLoading);
    const toast = useRequestToast();

    const handleResendOTPCode = async (email: string) => {
        try {
            const requestResendOTPCodeArgs: Request_ResendOtpArgs = {
                email
            }

            const response = await performResendOtp(requestResendOTPCodeArgs);
            if (response.success) {
                toast.success("Código reenviado com sucesso! Verifique seu e-mail.");
                
                if (response.data && response.data.redirectUrl) {
                    const newUrl = new URL(response.data.redirectUrl, window.location.origin);
                    window.history.replaceState({}, '', `${location.pathname}?${newUrl.searchParams.toString()}`);
                }
            }
            else {
                toast.error("Erro ao reenviar o código. Tente novamente.");
                console.error("Houve um erro ao reenviar OTP Code: ", response.error);
            }
        }
        catch (err) {
            toast.error("Erro inesperado ao reenviar o código.");
            console.error("Houve um erro ao reenviar OTP Code: ", err);
        }
        finally{
            if(resendEmailLoading.loading)
            {
                resendEmailLoading.setLoading(false);
            }
        }
    }

    return {
        resendEmailLoading,
        handleResendOTPCode
    }
}