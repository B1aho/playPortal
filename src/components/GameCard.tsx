import { useNavigate } from "react-router-dom";
import { AddFavBtn } from "./AddFavBtn";
import { Movie } from "@/services/traktApiTypes";
import { MovieBackdrop } from "./MovieBackdrop";
import { Button } from "./ui/button";
import { MonitorX } from "lucide-react";

interface GameCardProps {
    data: Movie;
}

export function GameCard({ data }: GameCardProps) {
    const navigate = useNavigate();

    return (
        <div className="game-card w-full flex flex-col">
            <div className="w-full h-full flex-2 overflow-hidden">
                <MovieBackdrop tmdbMovieId={data.ids.tmdb} />
            </div>
            <div className="flex-1 relative">
                <div className="flex justify-between">
                    <div onPointerDown={() => navigate(`/movies/${data.ids.slug}`)} className="cursor-pointer">
                        <h2 className="text-lg font-bold">{data.title}</h2>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="game-card-btns flex">
                        <AddFavBtn slug={data.ids.slug} />
                        <Button><MonitorX /></Button>
                    </div>
                </div>
                <ul className="">
                    <li className="flex justify-between">
                        <span>Release year:</span>
                        <span>{data.year}</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}