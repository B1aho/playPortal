import { useGetGameDetaileByIdQuery } from "@/services/rawgApi";
import { useLocation } from "react-router-dom";

export function GamePage() {
    const location = useLocation();
    const gameId = location.state;
    const { data, error, isSuccess } = useGetGameDetaileByIdQuery(gameId);

    return (
        <>
            {!isSuccess ? <div>Loadind...</div> : <div>{data.name}</div>}
        </>
    );
}