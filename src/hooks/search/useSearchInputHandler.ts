import MainPaths from "@/constants/paths/appPaths/mainPaths";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useSearchInputHandler = () => {
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchValue.trim()) return;
        navigate(`${MainPaths.BasicPaths.SEARCH}?termo=${encodeURIComponent(searchValue.trim())}`);
    };

    return {
        searchValue,
        setSearchValue,
        handleInputChange,
        handleSubmit,
    };
};