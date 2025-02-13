import { Content } from "@/components/Content";
import { useContext, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useGetMediaQuery, useGetPopularMoviesQuery, useSearchMoviesQuery } from "@/services/traktApi";
import { SearchTypeContext } from "@/app/searchTypeContext";

export function MainPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');
    const { genre } = useParams();

    const context = useContext(SearchTypeContext);
    if (!context) {
        throw new Error("useSearchType must be used within a SearchTypeProvider");
    }
    const { searchType } = context;

    let queryFn = null;
    let queryArg = null;
    let heading = 'Movies';

    if (genre) {
        queryFn = useGetMediaQuery;
        heading = `Movies in ${genre} genre`;
        queryArg = {
            query: query,
            searchType: searchType,
            genre: genre,
        }
    } else if (query && query !== '') {
        queryFn = useSearchMoviesQuery;
        heading = `Search for [${query}]`;
        queryArg = {
            query: query,
            searchType: searchType,
        }
        console.log(searchType);
    } else {
        queryFn = useGetPopularMoviesQuery;
        heading = `Most popular movies`;
        queryArg = {
            query: null,
        };
    }

    /**
     * This effect trigger render: it helps when we search being already on this page
     */
    useEffect(() => {
    }, [location.search]);

    return (
        <>
            <div className="p-3">
                <Content queryFn={queryFn} queryArg={queryArg} heading={heading} />
            </div>
        </>
    );
}