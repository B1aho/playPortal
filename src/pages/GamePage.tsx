import { CategoryLinks } from "@/components/CategoryLinks";
import { HoverLink } from "@/components/HoverLink";
import { MediaCarousel } from "@/components/MediaCarousel";
import { Button } from "@/components/ui/button";
import { PlatformElement } from "@/rawgTypes";
import { useGetGameDetaileByIdQuery } from "@/services/rawgApi";
import { format } from "date-fns";
import { Gem } from "lucide-react";
import { useParams } from "react-router-dom";
import WebSvg from "@/assets/game.svg";
import RedditSvg from "@/assets/reddit.svg";
import { ScrollDesc } from "@/components/ScrollDesc";
import Ratings from "@/components/ui/rating";

// Компонент рендериена вынести отдельно
// Большая кнопка добавить в избранно с анимацией и похожа кнопка - добавить в коллекцию
// Еще запросить и отобразить ачивки

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
                            <div>
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-bold">RATING:</h2>
                                    <div className="flex items-center">
                                        <Ratings size={45} value={data.rating} variant="green" />
                                        <h2 className="text-3xl font-bold text-green-600">/{data.rating}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex items-center justify-center mt-3">
                                <ScrollDesc desc={data.description_raw} />
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
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <h2>Genres:</h2>
                                    <div className="flex flex-wrap">
                                        <CategoryLinks categories={data.genres} redirect="genre" />
                                    </div>
                                </div>
                                <div>
                                    <h2>Releas date:</h2>
                                    <div className="flex">
                                        <div>{format(data.released, 'PP')}</div>
                                    </div>
                                </div>
                                <div>
                                    <h2>Platforms:</h2>
                                    <div className="flex flex-wrap">
                                        <CategoryLinks categories={getPlatforms(data.platforms)} redirect="platform" />
                                    </div>
                                </div>
                                <div>
                                    <h2>Developers:</h2>
                                    <div className="flex flex-wrap">
                                        <CategoryLinks categories={data.developers} redirect="developer" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3">
                                <h2>Tags:</h2>
                                <div className="flex flex-wrap">
                                    <CategoryLinks categories={data.tags} redirect="tag" />
                                </div>
                            </div>
                            <div>
                                <div className="mt-3 flex justify-between items-center">
                                    <h2>Links:</h2>
                                    <div className="flex gap-2 align-middle">
                                        {data.website && <HoverLink desc="game's website!" content={WebSvg} domen={data.website} top={7} />}
                                        {data.reddit_url && <HoverLink desc="game's channel on reddit" content={RedditSvg} domen={data.reddit_url} />}
                                    </div>
                                </div>
                                <div className="mt-3 flex justify-between">
                                    <h2>Age rating:</h2>
                                    <div className="text-red-700 font-bold ">{data.esrb_rating && data.esrb_rating.name}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    );
}

function getPlatforms(platforms: PlatformElement[]) {
    return platforms.map(item => {
        return {
            id: item.platform.id,
            name: item.platform.name,
            slug: item.platform.slug,
            games_count: item.platform.games_count,
            image_background: item.platform.image_background,
        }
    })
}