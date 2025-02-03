import { KeyboardEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SelectSearch } from "./SearchSelect";

import { AutoComplete } from "./PopoverAutocomplete";
import { useSearchMoviesAutocompleteQuery } from "@/services/traktApi";
import { useDebounce } from "@/hooks/useDebounce";

export function SearchInput() {
    const [searchVal, setSearchVal] = useState("");
    const [selectVal, setSelectVal] = useState("movie");
    const [debounceQuery, setDebounceQuery] = useState({ query: "", option: selectVal });
    const navigate = useNavigate();

    useDebounce({ searchValue: searchVal, setDebouncQuery: setDebounceQuery })

    const clearInput = useCallback(() => {
        setSearchVal("");
    }, [])

    const redirect = useCallback(() => {
        const encodedQuery = encodeURIComponent(searchVal.trim());
        navigate(`/search?query=${encodedQuery}`, { state: selectVal });
    }, [selectVal, searchVal, navigate])

    const { data, isLoading } = useSearchMoviesAutocompleteQuery({ ...debounceQuery, option: selectVal }, { skip: !debounceQuery.query });

    return (
        <div className=" flex w-full">
            <AutoComplete
                onRedirect={redirect}
                onSelectedValueChange={(val) => console.log(val)}
                onSearchValueChange={setSearchVal}
                searchValue={searchVal}
                isLoading={isLoading}
                items={data}
            >
                <SelectSearch value={selectVal} onChange={setSelectVal} />
            </AutoComplete>
        </div>
    )
}