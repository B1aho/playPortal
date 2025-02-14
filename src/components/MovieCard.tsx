import { useNavigate } from "react-router-dom";
import { AddFavBtn } from "./AddFavBtn";
import { Movie } from "@/services/traktApiTypes";
import { MovieBackdrop } from "./MovieBackdrop";
import { Separator } from "./ui/separator";

interface MovieCardProps {
    data: (Movie | null);
}

export function MovieCard({ data }: MovieCardProps) {
    const navigate = useNavigate();
    if (data === null)
        return null;
    return (
        <div className="game-card w-full flex flex-col">
            <div className="w-full min-h-52 bg-black bg-opacity-30 dark:bg-white dark:bg-opacity-15 rounded-t-2xl  overflow-hidden">
                <MovieBackdrop type={data.type} tmdbMovieId={data.ids.tmdb} />
            </div>
            <Separator className="theme-blue:bg-blue-950 theme-red:bg-red-500" />
            <div className=" relative bg-black bg-opacity-30 dark:bg-white dark:bg-opacity-15 rounded-b-2xl p-3">
                <div onPointerUp={() => navigate(`/${data.type}/${data.ids.slug}`)} className="cursor-pointer flex justify-between items-center w-full">
                    <h2 className="text-2xl font-extrabold">{data.title}</h2>
                    {data.year && <h2 className="bg-black dark:bg-white dark:text-black p-1 rounded-md text-white font-semibold">{data.year}</h2>}
                </div>
                <div className="flex justify-between">
                    <div className="game-card-btns flex">
                        <AddFavBtn type={data.type} id={data.ids.trakt} />
                    </div>
                </div>
            </div>
        </div >
    )
}