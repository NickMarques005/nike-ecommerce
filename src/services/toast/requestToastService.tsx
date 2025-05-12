import RequestErrorToast from "@/components/toasts/RequestErrorToast";
import RequestSuccessToast from "@/components/toasts/RequestSuccessToast";
import { toast } from "react-hot-toast";

export const requestToastService = {
    success(message: string) {
        toast.custom((t) => (
            <RequestSuccessToast
                toastId= { t.id }
                message = { message }
                visible = { t.visible }
            />
    ), { duration: 10000 });
    },

    error(message: string) {
        toast.custom((t) => (
            <RequestErrorToast
                toastId= { t.id }
                message = { message }
                visible = { t.visible }
            />
    ), { duration: 20000 });
    },
};