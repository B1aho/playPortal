import { CategoryLinks } from "@/components/CategoryLinks";
import { MediaCarousel } from "@/components/MediaCarousel";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Gem } from "lucide-react";
import { useLocation, useParams } from "react-router-dom";
import { ScrollDesc } from "@/components/ScrollDesc";
import Ratings from "@/components/ui/rating";
import { useGetMovieInfoQuery, useGetMovieRelatedQuery, useGetShowInfoQuery, useGetShowRelatedQuery } from "@/services/traktApi";
import Lottie from "lottie-react";
import hand from "@/lottie/hand.json";
import { MovieBackdrop } from "@/components/MovieBackdrop";
import { RelatedCards } from "@/components/RelatedCards";

// Компонент рендериена вынести отдельно
// Большая кнопка добавить в избранно с анимацией и похожа кнопка - добавить в коллекцию
// Еще запросить и отобразить ачивки

function MoviePage() {
    const { slug } = useParams();
    const { pathname } = useLocation();
    const type = pathname.includes('tv') ? 'tv' : 'movie'
    const { data, isSuccess } = type === 'tv' ? useGetShowInfoQuery(slug) : useGetMovieInfoQuery(slug);
    const { data: relatedData, isSuccess: isRelatedSuccess } = type === 'tv' ? useGetShowRelatedQuery(slug) : useGetMovieRelatedQuery(slug);
    return (
        <>
            {!isSuccess
                ? <div className="flex justify-center items-center relative">
                    <Lottie animationData={hand} className="w-3/4 relative -top-10" />
                </div>
                :
                <>
                    <div className="absolute w-full top-0 left-0 -z-10 opacity-40">
                        <MovieBackdrop type={type} tmdbMovieId={data.ids.tmdb} quality="original" />
                    </div>
                    <div className="flex">
                        <div className="media-details flex-[2]">
                            <h1 className="text-3xl font-bold text-center">{data.title}</h1>
                            <h2 className="text-xl font-medium text-gray-800 text-center">{data.tagline}</h2>
                            <div className="flex justify-center align-middle relative ">
                                <MediaCarousel type={type} trailer={data.trailer} tmdb={data.ids.tmdb} />
                            </div>
                            <div>
                                <div className="flex justify-between items-center px-10">
                                    <h2 className="text-2xl font-bold">RATING:</h2>
                                    <div className="flex flex-col items-center">
                                        <Ratings size={35} value={data.rating} variant="green" />
                                        <h2 className="text-3xl font-bold text-green-600">/{data.rating.toFixed(2)}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex items-center justify-center mt-3">
                                <ScrollDesc desc={data.overview} />
                            </div>
                        </div>
                        <div className="main-details flex-1">
                            <div className="flex justify-between">
                                <div>{data.year}</div>
                                <div>{data.country && data.country.toUpperCase()}</div>
                            </div>
                            <div className="flex justify-between align-middle">
                                <Button size='icon' className="bg-white"><Gem color="green" /></Button>
                            </div>
                            <div className="flex justify-between">
                                <h2>Releas date:</h2>
                                <div className="flex">
                                    <div>{type === 'tv' ? format(data.first_aired, 'PP') : format(data.released, 'PP')}</div>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <h2>Original language:</h2>
                                <div className="flex">
                                    {data.language}
                                </div>
                            </div>
                            <div className="mt-3 flex justify-between">
                                <h2>Duration:</h2>
                                <div className="flex flex-wrap">
                                    {data.runtime + ' min'}
                                </div>
                            </div>
                            <div>
                                <div className="mt-3 flex justify-between items-center">
                                    <h2>Country:</h2>
                                    <div className="flex align-middle">
                                        {data.country && data.country.toUpperCase()}
                                    </div>
                                </div>
                                <div className="mt-3 flex justify-between">
                                    <h2>Age rating:</h2>
                                    <div className="text-red-700 font-bold ">{data.certification}</div>
                                </div>
                            </div>
                            <div>
                                <h2>Genres:</h2>
                                <div className="flex flex-wrap">
                                    <CategoryLinks redirect="genre" categories={data.genres} />
                                </div>
                            </div>
                            <div>
                                <h2>Avaliable translations:</h2>
                                <div className="flex flex-wrap">
                                    <CategoryLinks categories={data.available_translations} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <RelatedCards data={relatedData} isSuccess={isRelatedSuccess} />
                    </div>
                </>
            }
        </>
    );
}

export default MoviePage;
