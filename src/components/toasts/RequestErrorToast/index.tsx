import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import "../toast-styles.css";
import { RequestToastProps } from "@/types/toast/RequestToastTypes";

const RequestErrorToast = ({ toastId, message, visible }: RequestToastProps) => {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => prev - 0.5);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className={`toast-container error-toast ${!visible ? "toast-exit" : ""}`}
            onClick={() => toast.dismiss(toastId)}
        >
            <div className="toast-content">
                <div className="toast-icon">
                    <img
                        src="https://ik.imagekit.io/ogsugi6fx/clone-nike/nike-logo-mail.png?updatedAt=1746482682223"
                        alt="Nike logo"
                        style={{ width: 24, height: 24 }}
                    />
                </div>
                <div className="toast-error-content">
                    <strong>Erro</strong>
                    <p>{message}</p>
                </div>
            </div>
            <div
                className="toast-progress-bar error-progress-bar"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

export default RequestErrorToast;