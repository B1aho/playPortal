import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SelectSearch } from "./SearchSelect";

import { AutoComplete } from "./PopoverAutocomplete";
import { useSearchMoviesAutocompleteQuery } from "@/services/traktApi";
import { useDebounce } from "@/hooks/useDebounce";
import { SearchTypeContext } from "@/app/searchTypeContext";

export function SearchInput() {
    const [searchVal, setSearchVal] = useState("");
    const navigate = useNavigate();

    const context = useContext(SearchTypeContext);
    if (!context) {
        throw new Error("useSearchType must be used within a SearchTypeProvider");
    }
    const { searchType, setSearchType } = context;
    const [debounceQuery, setDebounceQuery] = useState({ query: "", option: searchType });


    useDebounce({ searchValue: searchVal, setDebouncQuery: setDebounceQuery })

    const clearInput = useCallback(() => {
        setSearchVal("");
    }, [])

    const redirect = useCallback(() => {
        const encodedQuery = encodeURIComponent(searchVal.trim());
        // Относительный путь если есть жанр, там где сейчас находимся - в других кейсах асболютныый путь
        navigate(`?query=${encodedQuery}`, { state: searchType });
        // navigate(`/search?query=${encodedQuery}`, { state: searchType });
    }, [searchType, searchVal, navigate])

    const { data, isLoading } = useSearchMoviesAutocompleteQuery({ ...debounceQuery, option: searchType }, { skip: !debounceQuery.query });

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
                <SelectSearch value={searchType} setSearchType={setSearchType} />
            </AutoComplete>
        </div>
    )
}