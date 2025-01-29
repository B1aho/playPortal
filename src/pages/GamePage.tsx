import { useGetGameDetaileByIdQuery } from "@/services/rawgApi";
import { useParams } from "react-router-dom";

export function GamePage() {
    const { slug } = useParams();
    const { data, error, isSuccess } = useGetGameDetaileByIdQuery(slug);

    return (
        <>
            {!isSuccess
                ? <div>Loadind...</div>
                :
                <>
                    <div>{data.name}</div>
                    <div className="absolute w-full top-0 left-0 -z-10 opacity-40">
                        <img src={data.background_image} alt="game-image" className="w-full" />
                    </div>
                </>
            }
        </>
    );
}