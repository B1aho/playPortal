import { Content } from "@/components/Content";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


export function MainPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');

    /**
     * This effect trigger render: it helps when we saerch being already on this page
     */
    useEffect(() => {
    }, [location.search]);

    return (
        <div>
            {/*h1 поменять на contentHeading, который от запроса менет название содержимого*/}
            <h1 className="text-2xl font-bold">{query ? 'Search for: ' + query : 'Top Games:'}</h1>
            {/* Потом убрать ?, сделать просто проеверку перед этим загрузилось или нет*/}
            <Content search={query} />
        </div>
    );
}