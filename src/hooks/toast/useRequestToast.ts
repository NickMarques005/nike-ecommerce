import { requestToastService } from "@/services/toast/requestToastService";

export const useRequestToast = () => {
    const success = (message: string) => requestToastService.success(message);
    const error = (message: string) => requestToastService.error(message);
    return { success, error };
};