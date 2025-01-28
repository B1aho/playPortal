import { GameCardInfo } from "@/rawgTypes";
import { GameCard } from "./GameCard";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { ContentSkeleton } from "./ContentSkeleton";

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
    if (isLoading || (isSuccess && !data)) {
        content = <ContentSkeleton />;
    } else if (data) {
        content = (
            data.map(gameInfo => {
                return <GameCard key={gameInfo.id} data={gameInfo} />
            })
        )
    }
    return <div className="grid grid-cols-3 gap-3">
        {content}
    </div>;
}