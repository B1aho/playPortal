import { Content } from "@/components/Content";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";


export function MainPage() {
    const location = useLocation();
    let { genre, tag } = useParams();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');
    let heading = 'Games';

    genre = genre ? genre : '';
    // Сделать heading более универсальным, еще же и по тегу может показывать
    if (location.pathname === "/search") {
        heading = `Search for: ${query}`;
    } else if (location.pathname.includes("/games")) {
        heading = `All ${genre} games:`;
    } else {
        heading = "Top games:";
    }
    /**
     * This effect trigger render: it helps when we search or change genre being already on this page
     */
    useEffect(() => {
    }, [location.search]);

    return (
        <div>
            <Content search={query} heading={heading} />
        </div>
    );
}