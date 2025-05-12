
import { MainUserOptionKey, mainUserOptions } from "@/constants/options/mainUserOptions";
import styles from "./main-user-options-modal.module.css";
import "../modal-styles.css";

interface MainUserOptionsModalProps {
    animationModalClass: string;
    handleMainUserOptionClick: (optionKey: MainUserOptionKey) => void;
}

const MainUserOptionsModal = ({
    animationModalClass,
    handleMainUserOptionClick
}: MainUserOptionsModalProps) => {

    return (
        <div className={styles["main-user-modal-wrapper"]}>
            <div className={`default-modal-container ${animationModalClass}`} onClick={(e) => e.stopPropagation()}>
                {mainUserOptions.map((option, index) => (
                    <div key={option.key}>
                        {/* Exibindo as opções */}
                        <button
                            onClick={() => handleMainUserOptionClick(option.key)}
                            className={styles["user-option-button"]}
                        >
                            <div className={styles["option-content"]}>
                                {option.icon}
                                <span>{option.label}</span>
                            </div>
                        </button>

                        {/* Divisor: só exibe se não for a última opção */}
                        {index < mainUserOptions.length - 1 && <div className={styles["divider"]}></div>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainUserOptionsModal;