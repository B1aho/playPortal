import { KeyboardEvent, useCallback, useState } from "react";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
import { SelectSearch } from "./SearchSelect";
import { Eraser, Search } from "lucide-react";

export function SearchInput() {
    const [searchVal, setSearchVal] = useState("");
    const [selectVal, setSelectVal] = useState("movie");
    const navigate = useNavigate();

    const clearInput = useCallback(() => {
        setSearchVal("");
    }, [])

    const redirect = useCallback(() => {
        const encodedQuery = encodeURIComponent(searchVal.trim());
        navigate(`/search?query=${encodedQuery}`, { state: selectVal });
    }, [selectVal, searchVal, navigate])

    const handleKeyUp = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            redirect();
        }
    }, [redirect])

    return (
        <div className="relative flex h-10 w-full">
            {searchVal === ""
                ? <Search
                    size={20}
                    className="absolute cursor-pointer left-[6px] top-[14px]"
                />
                : <Eraser
                    color="red"
                    size={20}
                    className="absolute cursor-pointer left-[6px] top-[14px]"
                    onPointerUp={clearInput}
                />
            }
            <Input
                onKeyUp={handleKeyUp}
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                className="focus:outline-sky-500 px-7 rounded-full py-6"
                placeholder="Search here.."
                maxLength={120}
            />
            <SelectSearch value={selectVal} onChange={setSelectVal} />
        </div>
    )
}