import { useAppSelector } from "@/app/hooks";
import { ContentView } from "@/components/ContentView";
import { LoadMore } from "@/components/LoadMore";
import { selectFavs } from "@/features/library/librarySlice";
import { useLazyGetMovieInfoShortQuery, useLazyGetShowInfoShortQuery } from "@/services/traktApi";
import { Movie } from "@/services/traktApiTypes";
import { useEffect, useReducer, useState } from "react";
import { selectIsAuthenticated } from "@/features/user/userSlice";
import { AnimNotAuth } from "@/components/AnimNotAuth";

// draggable добавить
interface State {
    movies: Movie[];
    loadedCount: number;
    isLoading: boolean;
    isInitial: boolean;
}

type Action =
    | { type: "setLoading"; isLoading: boolean }
    | { type: "setMovies"; newMovies: Movie[] }
    | { type: "setLoadedCount"; newCount: number }
    | { type: "setInitial"; isInitial: boolean }
    | { type: "setRemoveMovies"; newMovies: Movie[] };

const initialState: State = {
    movies: [],
    loadedCount: 0,
    isLoading: false,
    isInitial: true,
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "setLoading":
            return { ...state, isLoading: action.isLoading };
        case "setMovies":
            return {
                ...state, movies: [...state.movies, ...action.newMovies]
            };
        case "setLoadedCount":
            return { ...state, loadedCount: action.newCount };
        case "setInitial":
            return { ...state, isInitial: action.isInitial };
        case "setRemoveMovies":
            return { ...state, movies: action.newMovies };
        default:
            return state;
    }
}

function LibraryPage() {
    const favsId = useAppSelector(selectFavs);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const [queryMovie] = useLazyGetMovieInfoShortQuery();
    const [queryShow] = useLazyGetShowInfoShortQuery();

    const [state, dispatch] = useReducer(reducer, initialState);
    const [next, setNext] = useState(0);
    const { movies, loadedCount, isLoading } = state;

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
                    chunk.map(id => {
                        const parsedId = parseId(id);
                        if (!parsedId)
                            return null;
                        if (parsedId.type === 'movie')
                            return queryMovie(parsedId.id.toString(), true).unwrap().catch(err => ({ err, id }))
                        return queryShow(parsedId.id.toString(), true).unwrap().catch(err => ({ err, id }))
                    })
                )
                if (!isActive) return; // Если компонент размонтировался, то не обновляем стейт

                result.forEach(movie => {
                    if (movie && 'err' in movie)
                        console.error(`Error with ${movie.id} loading: ${movie.err}`, movie.err);
                })

                const successMovies: Movie[] = result
                    .map(movie => {
                        if (movie && 'ids' in movie) {
                            return movie;
                        }
                    })
                    .filter((movie): movie is Movie => !!movie)
                if (successMovies.length > 0) {
                    dispatch({ type: 'setMovies', newMovies: successMovies })
                    dispatch({ type: 'setLoadedCount', newCount: loadedCount + chunk.length })
                }
            } catch (err) {
                console.error('Fatal error in movie library loading', err)
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
        const newMovies = movies.filter(movie => favsId.includes(movie.ids.trakt + '-' + movie.type))
        dispatch({ type: "setRemoveMovies", newMovies: newMovies })
    }, [favsId])

    return (
        <>
            {isAuthenticated
                ?
                <div className="p-4">
                    <ContentView isLoading={isLoading} data={movies} />
                    <LoadMore isLoading={isLoading} onIntersection={() => (favsId.length === 0 || loadedCount >= favsId.length) ? null : setNext(prev => prev + 1)} className={isLoading ? 'hidden' : ''} />
                </div>
                : <AnimNotAuth />
            }
        </>
    )
}

export default LibraryPage;

function parseId(input: string): { id: number; type: string } | null {
    const match = input.match(/^(\d+)-([a-zA-Z]+)$/);

    if (!match) return null;

    return {
        id: Number(match[1]),
        type: match[2],
    };
}