import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Heart, Undo2 } from "lucide-react";
import { Button } from "./ui/button";
import { selectIsAuthenticated } from "@/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { addFavorite, isGameInFavorites, removeFromFavs } from "@/features/library/librarySlice";

export function AddFavBtn({ slug }: { slug: string }) {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const isGameInFavs = useAppSelector((state) => isGameInFavorites(state, slug));
    const dispatch = useAppDispatch();

    const dispatchAdding = () => {
        dispatch(addFavorite(slug))
    }

    const dispatchRemoving = () => {
        dispatch(removeFromFavs(slug))
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
                <span>{isGameInFavs ? 'Remove game from favorites' : 'Add game to favorites'}</span>
            </HoverCardContent>
        </HoverCard>
    )
}