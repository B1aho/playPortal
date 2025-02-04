import { useGetTmdbMovieImagesQuery } from '@/services/tmdbApi';
import Lottie from "lottie-react";
import imageLoader from "@/lottie/image.json";
import noDataAnimation from "@/lottie/no-data.json";

type ImageQaulity = "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original";

interface MovieBackdropProps {
    tmdbMovieId: number;
    quality?: ImageQaulity;
    type?: string;
    isBackground?: boolean;
}

export const MovieBackdrop = ({ tmdbMovieId, isBackground = false, quality = "w780", type = "movie" }: MovieBackdropProps) => {
    const { data: tmdbData, error, isLoading } = useGetTmdbMovieImagesQuery({ type, tmdbMovieId });

    if (isLoading && !tmdbData) {
        return (
            <div className='w-full flex justify-center items-center'>
                <Lottie className='w-32 h-auto object-cover rounded-t-2xl' animationData={imageLoader} loop={true} />
            </div>
        )
    }

    // Поменять механизм - см
    const backdropUrl = tmdbData?.backdrops?.[0]?.file_path
        ? `https://image.tmdb.org/t/p/${quality}${tmdbData?.backdrops[0].file_path}`
        : tmdbData?.backdrops?.[0]?.file_path
            ? `https://image.tmdb.org/t/p/${quality}${tmdbData?.posters[0].file_path}`
            : null;

    if (!backdropUrl || error) {
        return (<div className='w-full flex justify-center items-center'>
            <Lottie className='w-44 h-auto object-cover rounded-t-2xl' animationData={noDataAnimation} loop={true} />
        </div>)
    }


    return (
        <>
            {backdropUrl && (
                <img
                    src={backdropUrl}
                    alt="Movie Backdrop"
                    className={'w-full h-full object-cover ' + (!isBackground ? 'rounded-t-2xl' : 'mask')}
                />
            )}
        </>
    );
};
