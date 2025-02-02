import { useState } from 'react';
import { useGetTmdbMovieImagesQuery } from '@/services/tmdbApi';
import Lottie from "lottie-react";
import imageLoader from "@/lottie/image.json";

interface MovieBackdropProps {
    tmdbMovieId: number;
}

export const MovieBackdrop = ({ tmdbMovieId }: MovieBackdropProps) => {
    const { data: tmdbData, error } = useGetTmdbMovieImagesQuery(tmdbMovieId);
    const [isImageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    if (error) return <p>Error occured!</p>;

    const backdropUrl = tmdbData?.backdrops?.[0]?.file_path
        ? `https://image.tmdb.org/t/p/w780${tmdbData?.backdrops[0].file_path}`
        : null;

    return (
        <>
            {!isImageLoaded && (
                <div className='w-full flex justify-center items-center'>
                    <Lottie className='w-32 h-auto object-cover rounded-t-2xl' animationData={imageLoader} loop={true} />
                </div>
            )}

            {backdropUrl && (
                <img
                    src={backdropUrl}
                    alt="Movie Poster"
                    onLoad={handleImageLoad} // Срабатывает, когда картинка полностью загружена
                    className='w-full h-auto rounded-t-2xl'
                    style={{
                        display: isImageLoaded ? 'block' : 'none', // Показываем картинку только после загрузки
                    }}
                />
            )}
        </>
    );
};
