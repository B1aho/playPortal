import { useGetGameDetaileByIdQuery } from "@/services/rawgApi";
import { useParams } from "react-router-dom";

export function GamePage() {
    const { slug } = useParams();
    const { data, error, isSuccess } = useGetGameDetaileByIdQuery(slug);

    return (
        <>
            {!isSuccess ? <div>Loadind...</div> : <div>{data.name}</div>}
        </>
    );
}