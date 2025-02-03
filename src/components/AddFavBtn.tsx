import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Heart, Undo2 } from "lucide-react";
import { Button } from "./ui/button";
import { selectIsAuthenticated } from "@/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { addFavorite, isMovieInFavorites, removeFromFavs } from "@/features/library/librarySlice";

export function AddFavBtn({ id, type }: { id: number, type?: string }) {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const movieId = id + '-' + type;
    const isGameInFavs = useAppSelector((state) => isMovieInFavorites(state, movieId));
    const dispatch = useAppDispatch();

    const dispatchAdding = () => {
        dispatch(addFavorite(movieId))
    }

    const dispatchRemoving = () => {
        dispatch(removeFromFavs(movieId))
    }

    let hoverContent = isGameInFavs ? 'Remove game from favorites' : 'Add game to favorites';
    if (!isAuthenticated) {
        hoverContent = 'Log in and you will be able to add the game to your library';
    }
    return (
        <HoverCard>
            <HoverCardTrigger>
                <Button
                    onPointerDown={isGameInFavs ? dispatchRemoving : dispatchAdding}
                    disabled={isAuthenticated ? false : true}>
                    {isGameInFavs ? <Undo2 /> : <Heart />}
                </Button>
            </HoverCardTrigger>
            <HoverCardContent>
                <span>{hoverContent}</span>
            </HoverCardContent>
        </HoverCard>
    )
}