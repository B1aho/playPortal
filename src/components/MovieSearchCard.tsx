import { useNavigate } from "react-router-dom";
import { Movie } from "@/services/traktApiTypes";
import { MoviePoster } from "./MoviePoster";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

interface MovieCardProps {
    data: Movie;
    direction?: 'col' | 'row';
    headingSize?: string;
    onSelect?: () => void;
    classList?: ClassValue;
}

export function MovieSearchCard({ data, onSelect, direction = 'row', headingSize = 'text-3xl', classList }: MovieCardProps) {
    const navigate = useNavigate();
    if (data === null)
        return null;
    return (
        <div
            style={direction === 'col' ? { flexDirection: 'column' } : { flexDirection: 'row' }}
            className={cn("w-full flex flex-row md:flex-col items-center justify-center cursor-pointer " + (direction === 'col' ? 'max-w-40' : ""), classList)}
            onPointerUp={(e) => {
                e.stopPropagation();
                onSelect && onSelect();
                navigate(`/${data.type}/${data.ids.slug}`)
            }}
        >
            <div className={"overflow-hidden " + (direction === 'row' && 'flex-1 w-1/2')}>
                <MoviePoster inSearch={direction === 'row'} type={data.type} tmdbMovieId={data.ids.tmdb} />
            </div>
            <div className="flex-1 flex flex-col justify-evenly items-center relative ">
                <div className="mb-3">
                    <h2 className={'font-bold ' + headingSize}>{data.title}</h2>
                </div>
                <div className="flex gap-3">
                    {data.year && <h2 className="bg-black dark:bg-white dark:text-black p-1 rounded-md text-white font-semibold">{data.year}</h2>}
                    <h2 className="text-base text-black dark:text-white">{data.type === 'movie' ? 'Movie' : 'Show'}</h2>
                </div>
            </div>
        </div>
    )
}