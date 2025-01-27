import { ContentView } from "./ContentView";
import { FilterBar } from "./FilterBar";
import { useGetGamesPageQuery } from "@/services/rawgApi";
import { useCallback, useEffect, useState } from "react";
import { LoadMore } from "./LoadMore";


export function Content() {
    const [page, setPage] = useState(1);
    const { data, error, isLoading, isSuccess } = useGetGamesPageQuery({ page: page });
    const [rawgResponse, setRawgResponse] = useState(data)

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
            <ContentView error={error} isSuccess={isSuccess} isLoading={isLoading} data={rawgResponse?.gameCardData} /* Ошибку тоже передать если есть, в самом компоненте разозбрать уже */ />
            <LoadMore isLoading={isLoading} onIntersection={incrementPage} />
        </>
    )
}