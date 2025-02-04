import { Movie } from "@/services/traktApiTypes";
import { MovieSearchCard } from "./MovieSearchCard";

interface RelatedCardsProps {
    data: Movie[] | undefined;
}

export function RelatedCards({ data }: RelatedCardsProps) {
    return (
        <div className="flex gap-4">
            {data && data.map(movie => {
                return <MovieSearchCard headingSize="text-2xl" direction="col" data={movie} key={movie.ids.trakt} />
            })}
        </div>
    )
}