import { useAppSelector } from "@/app/hooks";
import { ContentView } from "@/components/ContentView";
import { LoadMore } from "@/components/LoadMore";
import { selectFavs } from "@/features/library/librarySlice";
import { GameCardInfo } from "@/services/rawgTypes";
import { useLazyGetGameShortDetaileByIdQuery } from "@/services/rawgApi";
import { useEffect, useReducer, useState } from "react";


interface State {
    games: GameCardInfo[];
    loadedCount: number;
    isLoading: boolean;
    isInitial: boolean;
}

type Action =
    | { type: "setLoading"; isLoading: boolean }
    | { type: "setGames"; newGames: GameCardInfo[] }
    | { type: "setLoadedCount"; newCount: number }
    | { type: "setInitial"; isInitial: boolean }
    | { type: "setRemoveGames"; newGames: GameCardInfo[] };

const initialState: State = {
    games: [],
    loadedCount: 0,
    isLoading: false,
    isInitial: true,
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "setLoading":
            return { ...state, isLoading: action.isLoading };
        case "setGames":
            return {
                ...state, games: [...state.games, ...action.newGames]
            };
        case "setLoadedCount":
            return { ...state, loadedCount: action.newCount };
        case "setInitial":
            return { ...state, isInitial: action.isInitial };
        case "setRemoveGames":
            return { ...state, games: action.newGames };
        default:
            return state;
    }
}

function LibraryPage() {
    const favsId = useAppSelector(selectFavs);
    const [query] = useLazyGetGameShortDetaileByIdQuery();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [next, setNext] = useState(0);
    const { games, loadedCount, isLoading } = state;

    // Load first chunk, when component mount
    useEffect(() => {
        let isActive = true;

        // Async load data divided by chunks (20 games max in one chunk)
        const loadNextChunk = async () => {
            if (isLoading) return;
            dispatch({ type: 'setLoading', isLoading: true })

            const chunk = favsId.slice(loadedCount, loadedCount + 20);
            try {
                const result = await Promise.all(
                    chunk.map(id => query(id, true).unwrap().catch(err => ({ err, id })))
                )
                if (!isActive) return; // Если компонент размонтировался, то не обновляем стейт

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
                if (successGames.length > 0) {
                    dispatch({ type: 'setGames', newGames: successGames })
                    dispatch({ type: 'setLoadedCount', newCount: loadedCount + chunk.length })
                }
            } catch (err) {
                console.error('Fatal error in game library loading', err)
            } finally {
                dispatch({ type: 'setLoading', isLoading: false })
            }
        };

        loadNextChunk();

        return () => {
            isActive = false;
        }
    }, [next])


    useEffect(() => {
        const newGames = games.filter(game => favsId.includes(game.slug))
        dispatch({ type: "setRemoveGames", newGames: newGames })
    }, [favsId])

    return (
        <>
            {(isLoading)
                ? <div>Loading...</div>
                : <>
                    <ContentView data={games} />
                    <LoadMore isLoading={isLoading} onIntersection={() => favsId.length === 0 ? null : setNext(prev => prev + 1)} className={isLoading ? 'hidden' : ''} />
                </>
            }
        </>
    )
}

export default LibraryPage;