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
    let content = null;
    if (error) {
        content = <div>Error occured! {JSON.stringify(error)}</div>;
    }
    if (isLoading) {
        content = <div>...Loading</div>;
    }
    if (isSuccess) {
        content = (
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
    return content;
}