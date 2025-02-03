import { KeyboardEvent, useCallback, useState } from "react";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
import { SelectSearch } from "./SearchSelect";

import { AutoComplete } from "./PopoverAutocomplete";

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
        <div className=" flex w-full">
            <AutoComplete onKeyUp={handleKeyUp} selectedValue="calendar" onSelectedValueChange={(val) => console.log(val)} onSearchValueChange={setSearchVal} searchValue={searchVal} items={[{ value: 'calendar', label: 'Calendar' }]} />
            <SelectSearch value={selectVal} onChange={setSelectVal} />
        </div>
    )
}