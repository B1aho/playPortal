// Добавит виртуализацию!

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
        query: string | null,
        searchType?: string,
        page?: number | string;
        genre?: string;
        tmdbRatingMin?: number;
        tmdbRatingMax?: number;
    }
    heading: string;
}

export function Content({ queryFn, queryArg, heading }: ContentProps) {
    const [page, setPage] = useState(1);
    const [tmdbRatingMin, setTmdbRatingMin] = useState(0.0);
    const [tmdbRatingMax, setTmdbRatingMax] = useState(10.0);
    const args = { ...queryArg }
    args.page = page;
    args.tmdbRatingMin = tmdbRatingMin * 10;
    args.tmdbRatingMax = tmdbRatingMax * 10;
    console.log(args)
    const { data, error, isLoading, isFetching, isSuccess } = queryFn(args);
    const [traktResponse, setTraktResponse] = useState(data)

    /**
     * This effect help to to reset the page number and clear the previous search results whenever the search query 
     * changes
     * 
     * Without this, the page would continue to increment and add new results to the old ones instead of starting 
     * fresh with the new search query.
     * 
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
            <div className="select-none">
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
                <LoadMore isLoading={isFetching} onIntersection={incrementPage} />
            </div>
        </>
    )
}