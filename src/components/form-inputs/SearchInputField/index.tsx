import DefaultInput from "@/components/input/DefaultInput";
import React from "react";
import { FaSearch } from "react-icons/fa";
import "./search-input-field.css";

interface SearchInputFieldProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    className?: string;
}

const SearchInputField: React.FC<SearchInputFieldProps> = ({ onSubmit, inputProps = {}, className = "" }) => {
    return (
        <form className={`search-bar ${className}`} role="search" onSubmit={onSubmit}>
            <div className="search-bar-inner">
                <div className={"search-submit-button"}>
                    <button type="submit">
                        <FaSearch size={14} color={"#000000"} />
                    </button>
                </div>

                <DefaultInput
                    {...inputProps}
                    className={`search-input ${inputProps.className || ""}`}
                />
            </div>
        </form>
    );
};

export default SearchInputField;