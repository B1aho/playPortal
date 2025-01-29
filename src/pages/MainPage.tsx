import { Content } from "@/components/Content";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


export function MainPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');
    let heading = 'Games';
    console.log(location)

    if (location.pathname === "/search") {
        heading = "Search for:";
    } else if (location.pathname === "/games") {
        heading = "All games:";
    } else {
        heading = "Top games:";
    }
    /**
     * This effect trigger render: it helps when we search being already on this page
     */
    useEffect(() => {
    }, [location.search]);

    return (
        <div>
            <Content search={query} heading={heading} />
        </div>
    );
}