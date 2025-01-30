import { CategoryLinks } from "@/components/CategoryLinks";
import { MediaCarousel } from "@/components/MediaCarousel";
import { Button } from "@/components/ui/button";
import { useGetGameDetaileByIdQuery } from "@/services/rawgApi";
import { format } from "date-fns";
import { Gem } from "lucide-react";
import { useParams } from "react-router-dom";

export function GamePage() {
    const { slug } = useParams();
    const { data, isError, isSuccess } = useGetGameDetaileByIdQuery(slug);
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
                            <div className="flex justify-between">
                                <div>{format(data.released, 'PP')}</div>
                                <div>PLATFORMS</div>
                            </div>
                            <div className="flex justify-between align-middle">
                                <div className="flex align-middle justify-center rounded-md text-green-500 bg-white font-bold min-w-9 min-h-9 outline-2 outline-green-400">{data.metacritic}</div>
                                <Button size='icon' className="bg-white"><Gem color="green" /></Button>
                            </div>
                            <div>
                                <h2>Tags:</h2>
                                <div className="flex flex-wrap">
                                    <CategoryLinks categories={data.tags} redirect="tag" />
                                </div>
                            </div>
                            <div>
                                <h2>Genres:</h2>
                                <div className="flex flex-wrap">
                                    <CategoryLinks categories={data.genres} redirect="genre" />
                                </div>
                            </div>
                            {/* Сюда же жанры и тех характеристики */}
                        </div>
                    </div>
                </>
            }
        </>
    );
}