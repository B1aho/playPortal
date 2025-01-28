import { GameCardInfo } from "@/rawgTypes";
import { GameCard } from "./GameCard";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { ContentSkeleton } from "./ContentSkeleton";
import { useState } from "react";

interface ContentProps {
    data: GameCardInfo[] | undefined;
    isLoading: boolean,
    error: FetchBaseQueryError | SerializedError | undefined,
    isSuccess: boolean,
}

// Скелетон показывается только в начале, поскольку мы каждый раз рендерим массив <GameCard> заново
// а не добавляем к существующему!
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
    return <div className="grid grid-cards gap-3">
        {content}
    </div>;
}