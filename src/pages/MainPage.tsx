import { Content } from "@/components/Content";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


export function MainPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');

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