import "./auth-prompt-styles.css";

interface AuthPromptProps {
    promptText?: string;
    linkText: string;
    onClick?: () => void;
}

const AuthPrompt: React.FC<AuthPromptProps> = ({ promptText, linkText, onClick }) => {
    return (
        <div className="auth-prompt-container">
            {promptText && <span>{promptText} </span>}
            <a onClick={onClick}>{linkText}</a>
        </div>
    );
};

export default AuthPrompt;