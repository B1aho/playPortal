import { Movie } from "@/services/traktApiTypes";
import { MovieSearchCard } from "./MovieSearchCard";
import { useIsMobile } from "@/hooks/use-mobile";

interface RelatedCardsProps {
    data: Movie[] | undefined;
}

export function RelatedCards({ data }: RelatedCardsProps) {
    const isMobile = useIsMobile();
    return (
        <div className="flex flex-col items-center md:flex-row md:justify-evenly gap-4">
            {data && data.map(movie => {
                return <MovieSearchCard
                    classList="related-hover-animation"
                    headingSize="text-2xl"
                    direction={isMobile ? 'row' : 'col'}
                    data={movie}
                    key={movie.ids.trakt}
                />
            })}
        </div>
    )
}