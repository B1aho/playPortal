import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { TrailerWithPreview } from "./TrailerWithPreview";
import { useGetTmdbMovieImagesQuery } from "@/services/tmdbApi";
import Lottie from "lottie-react";
import imageLoader from "@/lottie/image.json";


interface MediaProps {
    tmdb: number | undefined;
    trailer?: string;
}

export function MediaCarousel({ tmdb, trailer }: MediaProps) {
    const { data: tmdbData } = useGetTmdbMovieImagesQuery(tmdb);

    const content = [];

    if (trailer) {
        content.push(
            <CarouselItem className="rounded-xl" key={0}>
                <TrailerWithPreview src={trailer} />
            </CarouselItem>
        )
    }

    if (tmdbData) {
        const length = tmdbData.length < 10 ? tmdbData.length : 10;
        Array.from({ length: length }).map((_, idx) => {
            const backdropUrl = tmdbData?.backdrops?.[idx]?.file_path
                ? `https://image.tmdb.org/t/p/original${tmdbData?.backdrops[idx].file_path}`
                : null;
            content.push(
                backdropUrl ?
                    <CarouselItem className="rounded-xl" key={idx + 1}>
                        <img className="w-full rounded-xl shadow-black shadow-inner" src={backdropUrl} alt="Movie Backdrop" />
                    </CarouselItem>
                    : null /* Вставлять постер в итоге от trakt как fallback если пустая карусель*/
            )
        })
    }

    return (
        <Carousel opts={{ loop: true, dragFree: false }} className="relative w-full max-w-[80%] rounded-xl ">
            <CarouselContent className="rounded-xl">
                {!tmdbData ? (
                    <div className='w-full flex justify-center items-center'>
                        <Lottie className='w-32 h-auto object-cover rounded-t-2xl' animationData={imageLoader} loop={true} />
                    </div>
                )
                    : content
                }
            </CarouselContent>
            <CarouselPrevious className="-left-9 " />
            <CarouselNext className="-right-9" />
        </Carousel>
    )
}
