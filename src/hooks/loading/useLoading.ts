import { LoadingStructure } from "@/types/loading/LoadingTypes";
import { useState } from "react";

export const useLoading = (value?: boolean): LoadingStructure => {
    const initialValue = value ? value : false;

    const [loading, setLoading] = useState(initialValue);

    return { loading, setLoading }
}