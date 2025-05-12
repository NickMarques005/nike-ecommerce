import { MainUserOptionKey } from "@/constants/options/mainUserOptions";
import { useAuth } from "@/contexts/auth/AuthContext";
import { useEffect, useState } from "react";

export const useUserOptionsModalHandler = () => {

    const { signOut } = useAuth();

    const [isVisible, setIsVisible] = useState(false);
    const [animationModalClass, setAnimationModalClass] = useState("");

    const openModal = () => {
        setIsVisible(true);
        setAnimationModalClass("open-swipeUp");
    };

    const closeModal = () => {
        setAnimationModalClass("close-fadeOut");
        setTimeout(() => {
            setIsVisible(false);
        }, 300); // tempo igual à duração da animação
    };

    const toggleModal = () => {
        if (isVisible) {
            closeModal();
        } else {
            openModal();
        }
    };

    const handleMainUserOptionClick = (key: MainUserOptionKey) => {
        closeModal();
        switch (key) {
            case "logout":
                signOut();
                break;
            default:
                break;
        }
    };

    // Fecha ao clicar fora do modal
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const modal = document.querySelector(".default-modal-container");
            if (modal && !modal.contains(e.target as Node)) {
                closeModal();
            }
        };

        if (isVisible) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isVisible]);


    return {
        isVisible,
        toggleModal,
        handleMainUserOptionClick,
        animationModalClass
    };
};