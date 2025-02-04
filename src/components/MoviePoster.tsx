import { useGetTmdbMovieImagesQuery } from '@/services/tmdbApi';
import Lottie from "lottie-react";
import imageLoader from "@/lottie/image.json";

type ImageQaulity = "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original";

interface MoviePosterProps {
    tmdbMovieId: number;
    quality?: ImageQaulity;
    type?: string;
    inSearch?: boolean;
}

export const MoviePoster = ({ tmdbMovieId, quality = "w780", type = "movie", inSearch = true }: MoviePosterProps) => {
    const { data: tmdbData, error, isLoading } = useGetTmdbMovieImagesQuery({ type, tmdbMovieId });
    if (error) return (
        <div className='w-full h-36'>
            <p>Error occured!</p>
        </div>
    );

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

    if (!posterUrl) {
        return (<div className='w-full'>
            Ниче не загрузилось
        </div>)
    }


    return (
        <>
            {posterUrl && (
                <img
                    src={posterUrl}
                    alt="Movie Poster"
                    className={'h-auto rounded-md ' + (inSearch ? 'w-32' : 'w-40')}
                />
            )}
        </>
    );
};
