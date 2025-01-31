// Для отображения используем контент, также с lazy loadin infinite scroll.

import { useAppSelector } from "@/app/hooks";
import { ContentView } from "@/components/ContentView";
import { LoadMore } from "@/components/LoadMore";
import { selectFavs } from "@/features/library/librarySlice";
import { GameCardInfo } from "@/rawgTypes";
import { useLazyGetGameShortDetaileByIdQuery } from "@/services/rawgApi";
import { useEffect, useState } from "react";

// Проверить нужно ли доп параметры для content, чтобы нужный query работал 
export function LibraryPage() {
    // чем отличаться будет
    const favsId = useAppSelector(selectFavs);
    const [games, setGames] = useState<GameCardInfo[]>([]);
    const [query] = useLazyGetGameShortDetaileByIdQuery();
    const [loadedCount, setLoadedCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    // Async load data divided by chunks (20 games max in one chunk)
    const loadNextChunk = async () => {
        if (isLoading) return;
        setIsLoading(true);

        const chunk = favsId.slice(loadedCount, loadedCount + 20);
        try {
            const result = await Promise.all(
                chunk.map(id => query(id, true).unwrap().catch(err => ({ err, id })))
            )

            result.forEach(game => {
                if ('err' in game)
                    console.error(`Error with ${game.id} loading: ${game.err}`, game.err);
            })

            const successGames: GameCardInfo[] = result
                .map(game => {
                    if ('gameCardData' in game) {
                        return game.gameCardData;
                    }
                })
                .filter((game): game is GameCardInfo => game !== undefined)

            setGames(successGames);
            setLoadedCount(loadedCount + chunk.length);

        } catch (err) {
            console.error('Fatal error in game library loading', err)
        } finally {
            setIsLoading(false);
        }
    }

    // Load first chunk, when component mount
    useEffect(() => {
        loadNextChunk();
    }, [])

    return (
        <>
            {isLoading
                ? <div>Loading...</div>
                : <ContentView data={games} />
            }
            <LoadMore isLoading={isLoading} onIntersection={loadNextChunk} className={isLoading ? 'hidden' : ''} />
        </>
    )
}