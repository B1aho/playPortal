import { SearchType } from "@/app/searchTypeContext";
import { Dispatch, SetStateAction, useEffect } from "react";

interface DebounceProps {
    setDebouncQuery: Dispatch<SetStateAction<{ query: string; option: SearchType; }>>;
    searchValue: string;
}

export function useDebounce({ setDebouncQuery, searchValue }: DebounceProps) {
    useEffect(() => {
        const debounce = setTimeout(() => {
            setDebouncQuery((prevState) => ({ ...prevState, query: searchValue }))
        }, 800)
        return () => clearTimeout(debounce);
    }, [searchValue])
}