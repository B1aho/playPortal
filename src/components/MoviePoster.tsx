import { useGetTmdbMovieImagesQuery } from '@/services/tmdbApi';
import Lottie from "lottie-react";
import imageLoader from "@/lottie/image.json";
import noDataAnimation from "@/lottie/no-data.json";

type ImageQaulity = "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original";

interface MoviePosterProps {
    tmdbMovieId: number;
    quality?: ImageQaulity;
    type?: string;
    inSearch?: boolean;
    isBackgroung?: boolean;
}

export const MoviePoster = ({ tmdbMovieId, quality = "w780", type = "movie", inSearch = true, isBackgroung = false }: MoviePosterProps) => {
    const { data: tmdbData, error, isLoading } = useGetTmdbMovieImagesQuery({ type, tmdbMovieId });
    console.log('In search = ', inSearch)
    console.log('is back = ', isBackgroung)
    if (isLoading && !tmdbData) {
        return (
            <div className='w-full flex justify-center items-center'>
                <Lottie className={'h-auto object-cover rounded-t-2xl ' + inSearch ? 'w-28' : 'w-40'} animationData={imageLoader} loop={true} />
            </div>
        )
    }

    const posterUrl = tmdbData?.posters?.[0]?.file_path
        ? `https://image.tmdb.org/t/p/${quality}${tmdbData?.posters[0].file_path}`
        : tmdbData?.backdrops?.[0]?.file_path
            ? `https://image.tmdb.org/t/p/${quality}${tmdbData?.backdrops[0].file_path}`
            : null;

    if (!posterUrl || error) {
        return (
            <div className={'flex justify-center h-48 items-center' + (isBackgroung ? ' w-full' : ' w-[40%]')} >
                <Lottie className=' h-auto object-cover rounded-t-2xl' animationData={noDataAnimation} loop={true} />
            </div>
        )
    }


    return (
        <>
            {posterUrl && (
                <img
                    src={posterUrl}
                    alt="Movie Poster"
                    className={'h-auto rounded-md ' + (inSearch ? ' w-32' : isBackgroung ? ' w-full mask' : ' w-40')}
                />
            )}
        </>
    );
};
