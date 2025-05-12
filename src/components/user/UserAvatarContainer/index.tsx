import { FaUser } from "react-icons/fa";
import styles from "./user-avatar-container.module.css";
import { UserData } from "@/types/user/UserTypes";
import { useUserOptionsModalHandler } from "@/hooks/modal/useUserOptionsModalHandler";
import MainUserOptionsModal from "@/components/modal/MainuserOptionsModal";

interface UserAvatarContainerProps{
    userData: UserData;
}

const UserAvatarContainer = ({
    userData
}: UserAvatarContainerProps) => {

    const { 
        isVisible, 
        toggleModal, 
        handleMainUserOptionClick,
        animationModalClass
    } = useUserOptionsModalHandler();

    if (!userData) return null;

    const firstName = userData.name?.split(" ")[0] || "Usuário";

    
    return (
        <div className={styles["user-avatar-container"]}>
            <button
                onClick={toggleModal}
                className={styles["avatar-wrapper"]}
                aria-label="Abrir opções do usuário"
            >
                {userData.avatar ? (
                    <img
                        src={userData.avatar}
                        alt={firstName}
                        className={styles["avatar-image"]}
                    />
                ) : (
                    <FaUser className={styles["default-avatar-icon"]} />
                )}
            </button>
            <span className={styles["user-greeting"]}>Olá, {firstName}</span>
            {isVisible && (
                <MainUserOptionsModal
                    animationModalClass={animationModalClass}
                    handleMainUserOptionClick={handleMainUserOptionClick}
                />
            )}
        </div>
    );
};

export default UserAvatarContainer;