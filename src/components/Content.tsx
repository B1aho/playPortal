import { ContentView } from "./ContentView";
import { FilterBar } from "./FilterBar";
import { useGetGamesPageQuery } from "@/services/rawgApi";
import { useState } from "react";


export function Content() {
    const [page, setPage] = useState(1);
    const { data, error, isLoading, isSuccess } = useGetGamesPageQuery({ page: page });

    return (
        <>
            <FilterBar />
            <ContentView error={error} isSuccess={isSuccess} isLoading={isLoading} data={data?.gameCardData} /* Ошибку тоже передать если есть, в самом компоненте разозбрать уже */ />
        </>
    )
}