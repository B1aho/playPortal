import { MovieCard } from "./MovieCard";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { Movie } from "@/services/traktApiTypes";
import Lottie from "lottie-react";
import loadingData from '@/lottie/send.json';

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
        console.error('Error ocurred: ', error);
    }
    let loading = null;
    if (isLoading || (isSuccess && !data)) {
        loading = <div className="min-w-full min-h-full flex justify-center items-start">
            <Lottie className="min-w-[400px]" animationData={loadingData} />
        </div>;
    } else if (data) {
        console.log(data)
        content = (
            data.map(item => {
                return <MovieCard key={item?.ids.trakt} data={item} />
            })
        )
    }
    return (
        <>
            {loading}
            <ResponsiveMasonry
                columnsCountBreakPoints={{ 0: 1, 600: 2, 1000: 3 }}
            >
                <Masonry>{content}</Masonry>
            </ResponsiveMasonry>
        </>
    );
}