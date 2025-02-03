import { useNavigate } from "react-router-dom";
import { Movie } from "@/services/traktApiTypes";
import { MoviePoster } from "./MoviePoster";

interface MovieCardProps {
    data: Movie;
    onSelect: () => void;
}

export function MovieSearchCard({ data, onSelect }: MovieCardProps) {
    const navigate = useNavigate();
    if (data === null)
        return null;
    return (
        <div className="w-full flex cursor-pointer" onPointerUp={(e) => {
            e.stopPropagation();
            onSelect();
            navigate(`/${data.type}/${data.ids.slug}`)
        }}>
            <div className="w-1/2 h-full flex-1 overflow-hidden">
                <MoviePoster type={data.type} tmdbMovieId={data.ids.tmdb} />
            </div>
            <div className="flex-1 flex flex-col justify-center items-center relative">
                <div>
                    <h2 className="text-3xl font-bold">{data.title}</h2>
                </div>
                <div className="flex gap-3">
                    <h2 className="bg-black p-1 rounded-md text-white font-semibold">{data.year}</h2>
                    <h2 className="text-base text-black">{data.type === 'movie' ? 'Movie' : 'Show'}</h2>
                </div>
            </div>
        </div>
    )
}