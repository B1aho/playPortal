import { Content } from "@/components/Content";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


export function MainPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    console.log(queryParams);
    const searchOption = location.state;
    console.log(searchOption)
    const query = queryParams.get('query') || "";
    let heading = 'Movies';

    /**
     * This effect trigger render: it helps when we search or change genre being already on this page
     */
    useEffect(() => {
    }, [location.search]);

    return (
        <div>
            <Content search={query ? { query: query, option: searchOption } : undefined} heading={heading} />
        </div>
    );
}