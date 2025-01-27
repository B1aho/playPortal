import { GameCardInfo } from "@/rawgTypes";
import { GameCard } from "./GameCard";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

interface ContentProps {
    data: GameCardInfo[] | undefined;
    isLoading: boolean,
    error: FetchBaseQueryError | SerializedError | undefined,
    isSuccess: boolean,
}

export function ContentView({ data, isLoading, isSuccess, error }: ContentProps) {
    if (error) {
        return <div>Error occured!</div>;
    }
    if (isLoading) {
        return <div>...Loading</div>;
    }
    if (isSuccess) {
        return (
            <div className="grid grid-cols-3">
                {data
                    ? data.map(gameInfo => {
                        return <GameCard key={gameInfo.id} data={gameInfo} />
                    })
                    : <div>No games!</div>
                }
            </div>
        )
    }
}