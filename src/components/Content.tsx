//const MAX_PAGE_LIMIT = 100;

import { ContentView } from "./ContentView";
import { FilterBar } from "./FilterBar";
import { useCallback, useEffect, useState } from "react";
import { LoadMore } from "./LoadMore";
import { Movie, QueryHook } from "@/services/traktApiTypes";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ChevronDown } from "lucide-react";

interface ContentProps {
    queryFn: QueryHook;
    queryArg: {
        query?: string,
        searchType?: string,
        page?: number | string;
        genre?: string;
        tmdbRatingMin?: number;
        tmdbRatingMax?: number;
    }
    heading: string;
}

// Обработать отсутствие данных - если человек ввел в url не существуюший tag, genre, или поиск = 0. Короче все кейсы
// где count === 0 или data.undefined - показывать картинку или анимацию с lottify
export function Content({ queryFn, queryArg, heading }: ContentProps) {
    const [page, setPage] = useState(1);
    const [tmdbRatingMin, setTmdbRatingMin] = useState(0.0);
    const [tmdbRatingMax, setTmdbRatingMax] = useState(10.0);
    const args = { ...queryArg }
    args.page = page;
    args.tmdbRatingMin = tmdbRatingMin * 10;
    args.tmdbRatingMax = tmdbRatingMax * 10;
    console.log(args)
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
    }, [queryArg.query, queryArg.searchType, queryArg.genre, tmdbRatingMin, tmdbRatingMax])

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
                <h1 className="text-3xl text-shadow-bl dark:text-shadow-wh font-bold">{heading}</h1>
            </div>
            <Collapsible defaultOpen={false} className="group/collapsible">
                <CollapsibleTrigger>
                    <div
                        className="flex items-center rounded-md gap-5 p-3 my-1 transition-all duration-150 ease-in-out hover:bg-black hover:bg-opacity-25">
                        <span className="font-bold">Select Rating Range</span>
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <FilterBar tmdbMin={tmdbRatingMin} tmdbMax={tmdbRatingMax} setMin={setTmdbRatingMin} setMax={setTmdbRatingMax} />
                </CollapsibleContent>
            </Collapsible>
            <ContentView error={error} isSuccess={isSuccess} isLoading={isLoading} data={traktResponse} />
            <LoadMore isLoading={isLoading} onIntersection={incrementPage} className={isLoading ? 'hidden' : ''} />
        </>
    )
}