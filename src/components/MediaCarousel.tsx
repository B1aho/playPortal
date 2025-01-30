import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Skeleton } from "./ui/skeleton";
import { useGetMediaByIdQuery, useGetMoviesByIdQuery } from "@/services/rawgApi";
import { TrailerWithPreview } from "./TrailerWithPreview";

interface MediaProps {
    slug: string | undefined;
}

export function MediaCarousel({ slug }: MediaProps) {
    const { data: screenshotsData } = useGetMediaByIdQuery(slug);
    const { data: moviesData } = useGetMoviesByIdQuery(slug);
    let content = Array.from({ length: 4 }).map((_, idx) => <Skeleton key={idx} className="w-full h-full" />)

    if (screenshotsData) {
        content = screenshotsData.screenshots.map((item) => (
            <CarouselItem className="rounded-xl" key={item.id}>
                <img className="w-full rounded-xl  shadow-black shadow-inner" src={item.image} alt="game-screenshot" />
            </CarouselItem>
        ))
    }

    if (moviesData?.movie[0]) {
        content.unshift(
            <CarouselItem className="rounded-xl" key={moviesData.movie[0].id}>
                <TrailerWithPreview src={moviesData.movie[0].max} preview={moviesData.movie[0].preview} />
            </CarouselItem>
        )
    }
    return (
        <Carousel opts={{ loop: true, dragFree: false }} className="w-full max-w-[80%] rounded-xl ">
            <CarouselContent className="rounded-xl">
                {content}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
