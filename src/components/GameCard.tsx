import { GameCardInfo } from "@/rawgTypes"
import { format } from "date-fns";

interface GameCardProps {
    data: GameCardInfo;
}

export function GameCard({ data }: GameCardProps) {
    return (
        <div className="game-card w-full flex flex-col">
            <div className="w-full h-full flex-1 overflow-hidden">
                <img className="w-full h-full object-cover object-top" src={data.background_image} alt="game preview image" loading="lazy" />
            </div>
            <div className="flex-1">
                <div className="platform-icons">Пока none</div>
                <div className="game-card-heading">
                    <h2>{data.name}</h2>
                </div>
                <div className="game-card-btns">
                    <div>+</div>
                    <div>Tooltip - hide this game</div>
                </div>
                <ul>
                    <li><span>Rating:</span><span>{data.rating}</span></li>
                    <hr />
                    <li><span>Release date:</span><span>{format(data.released, 'PP')}</span></li>
                    <hr />
                </ul>
            </div>
        </div>
    )
}