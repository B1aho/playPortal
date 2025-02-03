import { Content } from "@/components/Content";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useGetPopularMoviesQuery, useSearchMoviesQuery } from "@/services/traktApi";

export function MainPage() {
    // Более четко здесь определяем какой тип запроса: поиск или что-то другое и передаем в content уже все готовое
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchOption = location.state;
    const query = queryParams.get('query');

    let queryFn = null;
    let queryArg = null;
    let heading = 'Movies';
    if (query && query !== '') {
        queryFn = useSearchMoviesQuery;
        heading = `Search for ${query}`;
        queryArg = {
            query: query,
            option: searchOption,
        }
    } else {
        queryFn = useGetPopularMoviesQuery;
        heading = `Most popular movies`;
        queryArg = {};
    }

    /**
     * This effect trigger render: it helps when we search being already on this page
     */
    useEffect(() => {
    }, [location.search]);

    return (
        <div>
            <Content queryFn={queryFn} queryArg={queryArg} heading={heading} />
        </div>
    );
}