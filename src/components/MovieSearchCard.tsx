import { useNavigate } from "react-router-dom";
import { Movie } from "@/services/traktApiTypes";
import { MoviePoster } from "./MoviePoster";

interface MovieCardProps {
    data: Movie;
    direction?: 'col' | 'row';
    headingSize?: string;
    onSelect?: () => void;
}

export function MovieSearchCard({ data, onSelect, direction = 'row', headingSize = 'text-3xl' }: MovieCardProps) {
    const navigate = useNavigate();
    if (data === null)
        return null;
    return (
        <div className="w-full flex items-center justify-center cursor-pointer" onPointerUp={(e) => {
            e.stopPropagation();
            onSelect && onSelect();
            navigate(`/${data.type}/${data.ids.slug}`)
        }}
            style={direction === 'col' ? { flexDirection: 'column' } : { flexDirection: 'row' }}
        >
            <div className={"h-full overflow-hidden" + (direction === 'row' && 'flex-1 w-1/2')}>
                <MoviePoster type={data.type} tmdbMovieId={data.ids.tmdb} />
            </div>
            <div className="flex-1 flex flex-col justify-center items-center relative">
                <div>
                    <h2 className={'font-bold ' + headingSize}>{data.title}</h2>
                </div>
                <div className="flex gap-3">
                    {data.year && <h2 className="bg-black p-1 rounded-md text-white font-semibold">{data.year}</h2>}
                    <h2 className="text-base text-black">{data.type === 'movie' ? 'Movie' : 'Show'}</h2>
                </div>
            </div>
        </div>
    )
}