import { Content } from "@/components/Content";
import { useGetGamesPageQuery } from "@/services/rawgApi";

export function MainPage() {
    const { data, error, isLoading } = useGetGamesPageQuery({ page: 1 });
    console.log("Data:", data);
    console.log("isLoading:", isLoading);
    return (
        <div>
            {/*h1 поменять на contentHeading, который от запроса менет название содержимого*/}
            <h1></h1>
            <Content />
        </div>
    );
}