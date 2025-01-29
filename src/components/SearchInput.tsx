import { KeyboardEvent, useCallback, useState } from "react";
import { Input } from "./ui/input";
import clearIcon from '@/assets/clear.svg';
import searchIcon from '@/assets/search.svg';
import { useNavigate } from "react-router-dom";

export function SearchInput() {
    const [searchVal, setSearchVal] = useState("");
    const navigate = useNavigate();



    const clearInput = useCallback(() => {
        setSearchVal("");
    }, [])

    const handleKeyUp = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            const encodedQuery = encodeURIComponent(searchVal.trim());
            navigate(`/search?query=${encodedQuery}`);
        }
    }, [searchVal])

    return (
        <div className="relative flex h-10 w-full">
            <img src={searchIcon} className="absolute left-[6px] top-[11px]" alt="search-icon" width="19" height="19" />
            <Input
                onKeyUp={handleKeyUp}
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                className="focus:outline-sky-500 px-7 rounded-full"
                placeholder="Search for games.."
                maxLength={120}
            />
            <img src={clearIcon} onClick={clearInput} className="cursor-pointer absolute right-1 top-[7px] red-svg" alt="clear-icon" width="24" height="24" />
        </div>
    )
}