import { Content } from "@/components/Content";


export function MainPage() {
    return (
        <div>
            {/*h1 поменять на contentHeading, который от запроса менет название содержимого*/}
            <h1>Top Games: </h1>
            {/* Потом убрать ?, сделать просто проеверку перед этим загрузилось или нет*/}
            <Content />
        </div>
    );
}