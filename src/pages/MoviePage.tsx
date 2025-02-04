import { CategoryLinks } from "@/components/CategoryLinks";
import { MediaCarousel } from "@/components/MediaCarousel";
import { format } from "date-fns";
import { useLocation, useParams } from "react-router-dom";
import { ScrollDesc } from "@/components/ScrollDesc";
import { useGetMovieInfoQuery, useGetMovieRelatedQuery, useGetShowInfoQuery, useGetShowRelatedQuery } from "@/services/traktApi";
import Lottie from "lottie-react";
import hand from "@/lottie/hand.json";
import { MovieBackdrop } from "@/components/MovieBackdrop";
import { RelatedCards } from "@/components/RelatedCards";
import { AnimatedCircularProgressBar } from "@/components/ui/circularProgressBar";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Globe } from "lucide-react";

// Компонент рендериена вынести отдельно
// Большая кнопка добавить в избранно с анимацией и похожа кнопка - добавить в коллекцию
// Еще запросить и отобразить ачивки

function MoviePage() {
    const { slug } = useParams();
    const { pathname } = useLocation();
    const type = pathname.includes('tv') ? 'tv' : 'movie'
    const { data, isSuccess } = type === 'tv' ? useGetShowInfoQuery(slug) : useGetMovieInfoQuery(slug);
    const { data: relatedData } = type === 'tv' ? useGetShowRelatedQuery(slug) : useGetMovieRelatedQuery(slug);
    return (
        <>
            {!isSuccess
                ? <div className="flex justify-center items-center relative">
                    <Lottie animationData={hand} className="w-3/4 relative -top-10" />
                </div>
                :
                <>
                    <div className="absolute w-full top-0 left-0 -z-10 opacity-40">
                        <MovieBackdrop isBackground={true} type={type} tmdbMovieId={data.ids.tmdb} quality="original" />
                    </div>
                    <div className="flex p-3 mb-5">
                        <div className="media-details select-none flex-[2]">
                            <h1 className="text-3xl text-shadow-bl dark:text-shadow-wh font-bold text-center">
                                {data.title}
                            </h1>
                            <h2 className="text-lg font-medium text-gray-800 dark:text-white text-center mb-2">
                                {data.tagline}
                            </h2>
                            <div className="flex justify-center align-middle relative ">
                                <MediaCarousel type={type} trailer={data.trailer} tmdb={data.ids.tmdb} />
                            </div>
                            <div>

                            </div>
                            <div className="w-full flex items-center justify-around mt-4">
                                <ScrollDesc desc={data.overview} />
                            </div>
                        </div>
                        <div className="main-details text-lg font-semibold select-none flex-1 px-4 py-6 bg-black bg-opacity-40 rounded-md">
                            <div className="flex justify-between custom-hover-animation">
                                <h2>Releas date:</h2>
                                <div className="flex">
                                    <div>{'first_aired' in data ? format((data.first_aired || 0), 'PP') : format(data.released, 'PP')}</div>
                                </div>
                            </div>
                            <div className="flex mt-3 justify-between custom-hover-animation">
                                <h2>Original language:</h2>
                                <div className="flex">
                                    {data.language}
                                </div>
                            </div>
                            <div className="mt-3 flex justify-between custom-hover-animation">
                                <h2>Duration:</h2>
                                <div className="flex flex-wrap">
                                    {data.runtime + ' min'}
                                </div>
                            </div>
                            <div>
                                <div className="mt-3 flex justify-between items-center custom-hover-animation">
                                    <h2>Country:</h2>
                                    <div className="flex align-middle">
                                        {data.country && data.country.toUpperCase()}
                                    </div>
                                </div>
                                <div className="mt-3 flex justify-between custom-hover-animation">
                                    <h2>Age rating:</h2>
                                    <div className="text-red-700 border-1 outline-red-700 rounded-md font-bold ">{data.certification}</div>
                                </div>
                                <div className="flex mt-3 justify-between items-center custom-hover-animation">
                                    {data.homepage && <>
                                        <div>Web page:</div>
                                        <a about="Show's web page" target="_blank" href={data.homepage} rel="noopener noreferrer">
                                            <Globe />
                                        </a>
                                    </>
                                    }
                                </div>
                                <div className="flex items-center justify-between">
                                    <div><h2 className="text-3xl font-bold">Rating</h2></div>
                                    <HoverCard >
                                        <HoverCardTrigger >
                                            <AnimatedCircularProgressBar
                                                className="select-none cursor-default"
                                                gaugePrimaryColor="yellow"
                                                gaugeSecondaryColor="brown"
                                                max={10}
                                                min={0}
                                                value={data.rating}
                                            />
                                        </HoverCardTrigger>
                                        <HoverCardContent className="text-lg font-semibold">Trakt users rating</HoverCardContent>
                                    </HoverCard>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="flex-[2]">Genres:</h2>
                                <div className="flex flex-1 flex-wrap mt-3">
                                    <CategoryLinks redirect="genre" categories={data.genres} />
                                </div>
                            </div>
                            <div>
                                <h2>Avaliable translations:</h2>
                                <div className="flex flex-wrap cursor-default">
                                    <CategoryLinks categories={data.available_translations} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-5">
                        <RelatedCards data={relatedData} />
                    </div>
                </>
            }
        </>
    );
}

export default MoviePage;
