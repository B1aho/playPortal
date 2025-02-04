import { Movie } from "@/services/traktApiTypes";
import { MovieSearchCard } from "./MovieSearchCard";

interface RelatedCardsProps {
    data: Movie[] | undefined;
}

export function RelatedCards({ data }: RelatedCardsProps) {
    return (
        <div className="flex  justify-evenly gap-4">
            {data && data.map(movie => {
                return <MovieSearchCard
                    classList="related-hover-animation"
                    headingSize="text-2xl"
                    direction="col"
                    data={movie}
                    key={movie.ids.trakt}
                />
            })}
        </div>
    )
}