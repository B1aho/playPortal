import { MovieCard } from "./MovieCard";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { ContentSkeleton } from "./ContentSkeleton";
import { Movie } from "@/services/traktApiTypes";

interface ContentProps {
    data: (Movie | null)[] | undefined;
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
        console.log(data)
        content = (
            data.map(item => {
                return <MovieCard key={item?.ids.trakt} data={item} />
            })
        )
    }
    return (
        <ResponsiveMasonry
            columnsCountBreakPoints={{ 0: 1, 600: 2, 1000: 3 }}
        >
            <Masonry>{content}</Masonry>
        </ResponsiveMasonry>

    );
}