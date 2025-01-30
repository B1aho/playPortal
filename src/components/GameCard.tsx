import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectIsAuthenticated } from "@/features/user/userSlice";
import { addFavorite } from "@/features/library/librarySlice";
import { GameCardInfo } from "@/rawgTypes"
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { omitGameInfo } from "@/app/middleware/utility";

interface GameCardProps {
    data: GameCardInfo;
}

export function GameCard({ data }: GameCardProps) {
    const navigate = useNavigate();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const dispatch = useAppDispatch();

    return (
        <div onPointerDown={() => navigate(`/games/${data.slug}`)} className="game-card w-full flex flex-col cursor-pointer">
            <div className="w-full h-full flex-2 overflow-hidden">
                <img className="w-full h-full object-cover object-top rounded-t-2xl" src={data.background_image} alt="game preview image" loading="lazy" />
            </div>
            <div className="flex-1 relative">
                <div className="flex justify-between">
                    <div className="game-card-heading">
                        <h2>{data.name}</h2>
                    </div>
                    <div className="rounded-lg text-green-500">
                        {data.metacritic}
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="game-card-btns flex">
                        <Button onPointerDown={() => dispatch(addFavorite(omitGameInfo(data)))} disabled={isAuthenticated ? undefined : true} ><Heart /></Button>
                        <div>hide game</div>
                    </div>
                </div>
                <ul className="">
                    <li className="flex justify-between">
                        <span>Rating:</span>
                        <span>{data.rating}</span>
                    </li>
                    <hr />
                    <li className="flex justify-between">
                        <span>Release date:</span>
                        <span>{format(data.released, 'PP')}</span>
                    </li>
                    <hr />
                    <div className="platform-icons">Пока none</div>
                </ul>
            </div>
        </div>
    )
}