const MAX_PAGE_LIMIT = 100;

import { ContentView } from "./ContentView";
import { FilterBar } from "./FilterBar";
import { useGetGamesQuery } from "@/services/rawgApi";
import { useCallback, useEffect, useState } from "react";
import { LoadMore } from "./LoadMore";

interface ContentProps {
    search: string | null;
}

export function Content({ search }: ContentProps) {
    const [page, setPage] = useState(1);
    const { data, error, isLoading, isSuccess } = useGetGamesQuery({ page, search });
    const [rawgResponse, setRawgResponse] = useState(data)

    /**
     * This effect help to to reset the page number and clear the previous search results whenever the search query 
     * changes
     * 
     * Without this, the page would continue to increment and add new results to the old ones instead of starting 
     * fresh with the new search query.
     */
    useEffect(() => {
        setPage(1);
        setRawgResponse(undefined);
    }, [search])

    const incrementPage = useCallback(() => {
        setPage(prevPage => prevPage + 1);
    }, [])

    // Обновляем rawgResponse, когда data меняется, добавляя игры со следующей страницы
    useEffect(() => {
        if (data) {
            setRawgResponse((prevResponse) => {
                if (!prevResponse) {
                    return data;
                }

                return {
                    ...data,
                    gameCardData: [...prevResponse.gameCardData, ...data.gameCardData],
                    results: [...prevResponse.results, ...data.results],
                };
            });
        }
    }, [data]);

    return (
        <>
            <FilterBar />
            <ContentView error={error} isSuccess={isSuccess} isLoading={isLoading} data={rawgResponse?.gameCardData} />
            <LoadMore isLoading={isLoading} onIntersection={incrementPage} className={isLoading ? 'hidden' : ''} />
        </>
    )
}