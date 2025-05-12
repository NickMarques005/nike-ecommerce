import { useRef } from "react";

interface UseAutoFocusDateInputsProps {
    setBirthDay: (value: string) => void;
    setBirthMonth: (value: string) => void;
    setBirthYear: (value: string) => void;
}

export const useBirthDateHandler = ({
    setBirthDay,
    setBirthMonth,
    setBirthYear,
}: UseAutoFocusDateInputsProps) => {
    const monthInputRef = useRef<HTMLInputElement>(null);
    const yearInputRef = useRef<HTMLInputElement>(null);

    const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 2);
        setBirthDay(value);
        if (value.length === 2) monthInputRef.current?.focus();
    };

    const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 2);
        setBirthMonth(value);
        if (value.length === 2) yearInputRef.current?.focus();
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 4);
        setBirthYear(value);
    };

    return {
        monthInputRef,
        yearInputRef,
        handleDayChange,
        handleMonthChange,
        handleYearChange,
    };
}