import { MovieCard } from "./MovieCard";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { ContentSkeleton } from "./ContentSkeleton";
import { Movie } from "@/services/traktApiTypes";

interface ContentProps {
    data: Movie[] | undefined;
    isLoading?: boolean,
    error?: FetchBaseQueryError | SerializedError | undefined,
    isSuccess?: boolean,
}

// Скелетон показывается только в начале, поскольку мы каждый раз рендерим массив <GameCard> заново
// а не добавляем к существующему!
export function ContentView({ data, isLoading, isSuccess, error }: ContentProps) {
    let content = null;
    if (error) {
        content = <div>Error occured! {JSON.stringify(error)}</div>;
    }
    // Уйти от skeleton, оставить loader
    if (isLoading || (isSuccess && !data)) {
        content = <ContentSkeleton />;
    } else if (data) {
        content = (
            data.map(item => {
                return <MovieCard key={item.ids.trakt} data={item} />
            })
        )
    }
    return <div className="grid grid-cards gap-3">
        {content}
    </div>;
}