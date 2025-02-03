//const MAX_PAGE_LIMIT = 100;

import { ContentView } from "./ContentView";
import { FilterBar } from "./FilterBar";
import { useCallback, useEffect, useState } from "react";
import { LoadMore } from "./LoadMore";
import { Movie, QueryHook } from "@/services/traktApiTypes";

interface ContentProps {
    queryFn: QueryHook;
    queryArg: {
        query?: string,
        option?: string,
        page?: number | string;
    }
    heading: string;
}

// Обработать отсутствие данных - если человек ввел в url не существуюший tag, genre, или поиск = 0. Короче все кейсы
// где count === 0 или data.undefined - показывать картинку или анимацию с lottify
export function Content({ queryFn, queryArg, heading }: ContentProps) {
    const [page, setPage] = useState(1);
    const args = { ...queryArg }
    args.page = page;
    const { data, error, isLoading, isSuccess } = queryFn(args);
    const [traktResponse, setTraktResponse] = useState(data)

    /**
     * This effect help to to reset the page number and clear the previous search results whenever the search query 
     * changes
     * 
     * Without this, the page would continue to increment and add new results to the old ones instead of starting 
     * fresh with the new search query.
     * 
     * В КАСТОМНЫЙ ХУК
     */
    useEffect(() => {
        setPage(1);
        setTraktResponse(undefined);
    }, [queryArg.query, queryArg.option])

    const incrementPage = useCallback(() => {
        setPage(prevPage => prevPage + 1);
    }, [])

    // Обновляем rawgResponse, когда data меняется, добавляя игры со следующей страницы
    useEffect(() => {
        if (data) {
            setTraktResponse((prevResponse: (Movie | null)[] | undefined) => {
                if (!prevResponse) {
                    return data;
                }

                return [
                    ...prevResponse,
                    ...data,
                ];
            });
        }
    }, [data]);

    return (
        <>
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">{heading}</h1>
            </div>
            <FilterBar />
            <ContentView error={error} isSuccess={isSuccess} isLoading={isLoading} data={traktResponse} />
            <LoadMore isLoading={isLoading} onIntersection={incrementPage} className={isLoading ? 'hidden' : ''} />
        </>
    )
}