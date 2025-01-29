import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Skeleton } from "./ui/skeleton";
import { useGetMediaByIdQuery } from "@/services/rawgApi";

interface MediaProps {
    slug: string | undefined;
}

export function MediaCarousel({ slug }: MediaProps) {
    const { data } = useGetMediaByIdQuery(slug);
    return (
        <Carousel opts={{ loop: true, dragFree: false }} className="w-full max-w-2xl rounded-xl ">
            <CarouselContent className="rounded-xl">
                {data?.screenshots.map((item) => (
                    <CarouselItem className="rounded-xl" key={item.id}>
                        <img className="w-full rounded-xl  shadow-black shadow-inner" src={item.image} alt="game-screenshot" />
                    </CarouselItem>
                ))}
                {
                    (!data || !slug) && <Skeleton className="w-full h-full" />
                }
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
