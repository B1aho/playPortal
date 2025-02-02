const MAX_PAGE_LIMIT = 100;

import { ContentView } from "./ContentView";
import { FilterBar } from "./FilterBar";
import { useCallback, useEffect, useState } from "react";
import { LoadMore } from "./LoadMore";
import { useGetPopularMoviesQuery } from "@/services/traktApi";

interface ContentProps {
    search?: string | null;
    heading?: string;
    genre?: string;
    tag?: string;
    platform?: string;
    developer?: string;
}

// Обработать отсутствие данных - если человек ввел в url не существуюший tag, genre, или поиск = 0. Короче все кейсы
// где count === 0 или data.undefined - показывать картинку или анимацию с lottify
export function Content({ search, heading, genre, tag, platform, developer }: ContentProps) {
    const [page, setPage] = useState(1);
    const { data, error, isLoading, isSuccess } = useGetPopularMoviesQuery();
    const [traktResponse, setTraktResponse] = useState(data)

    /**
     * This effect help to to reset the page number and clear the previous search results whenever the search query 
     * changes
     * 
     * Without this, the page would continue to increment and add new results to the old ones instead of starting 
     * fresh with the new search query.
     */
    useEffect(() => {
        setPage(1);
        setTraktResponse(undefined);
    }, [search, genre, tag])

    const incrementPage = useCallback(() => {
        setPage(prevPage => prevPage + 1);
    }, [])

    // Обновляем rawgResponse, когда data меняется, добавляя игры со следующей страницы
    useEffect(() => {
        if (data) {
            setTraktResponse((prevResponse) => {
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
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold">{heading}</h1>
                {/*data && <h1 className="text-base font-medium">{`${data.count} games`}</h1>*/}
            </div>
            <FilterBar />
            <ContentView error={error} isSuccess={isSuccess} isLoading={isLoading} data={traktResponse} />
            <LoadMore isLoading={isLoading} onIntersection={incrementPage} className={isLoading ? 'hidden' : ''} />
        </>
    )
}