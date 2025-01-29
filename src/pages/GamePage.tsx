import { MediaCarousel } from "@/components/MediaCarousel";
import { Button } from "@/components/ui/button";
import { useGetGameDetaileByIdQuery } from "@/services/rawgApi";
import { format } from "date-fns";
import { Gem } from "lucide-react";
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
                    <div className="absolute w-full top-0 left-0 -z-10 opacity-40">
                        <img src={data.background_image} alt="game-image" className="w-full" />
                    </div>
                    <div className="flex">
                        <div className="media-details flex-[2]">
                            <h1 className="text-3xl font-bold text-center">{data.name}</h1>
                            <div className="flex justify-center align-middle relative ">
                                <MediaCarousel slug={slug} />
                            </div>
                        </div>
                        <div className="main-details flex-1">
                            <div className="flex">
                                <div>{format(data.released, 'PP')}</div>
                                <div>PLATFORMS</div>
                            </div>
                            <Button size='icon'><Gem color="green" /></Button>
                        </div>
                    </div>
                </>
            }
        </>
    );
}