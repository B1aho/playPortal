// header и sidebar - не буду убирать с 404 - или уберу, если придумаю краисвую обработку по мимо
// Больших 404 и конпки вернуться на главную
// Может без sidebar 
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"

export function NotFoundPage() {
    const navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {
        if (!location.pathname.includes('404')) {
            navigate('/404');
        }
    }, [location, navigate]);

    return (
        <div>Not Found!</div>
    )
}