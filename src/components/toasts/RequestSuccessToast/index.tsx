import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import "../toast-styles.css";
import { RequestToastProps } from "@/types/toast/RequestToastTypes";

const RequestSuccessToast = ({ toastId, message, visible }: RequestToastProps) => {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => prev - 1);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className={`toast-container ${!visible ? "toast-exit" : ""}`}
            onClick={() => toast.dismiss(toastId)}
        >
            <div className="toast-content">
                <div className="toast-icon">
                    <img
                        src="https://ik.imagekit.io/ogsugi6fx/clone-nike/nike-logo-origin.png?updatedAt=1746702889237"
                        alt="Logo Imagem"
                        className="toast-logo"
                    />
                </div>
                <div className="toast-message-area">
                    <strong>Sucesso</strong>
                    <p>{message}</p>
                </div>
            </div>
            <div className="toast-progress-bar" style={{ width: `${progress}%` }} />
        </div>
    );
};

export default RequestSuccessToast;