import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Heart, Undo2 } from "lucide-react";
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

                {isGameInFavs
                    ? <Undo2
                        size={30}
                        className="cursor-pointer hover:animate-shake"
                        onPointerUp={() => dispatchRemoving()}
                    />
                    : <Heart
                        size={30}
                        className="text-red-700 hover:animate-heart-beat cursor-pointer"
                        onPointerUp={() => dispatchAdding()}
                    />
                }
            </HoverCardTrigger>
            <HoverCardContent>
                <span>{hoverContent}</span>
            </HoverCardContent>
        </HoverCard>
    )
}