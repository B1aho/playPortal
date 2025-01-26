import { useGetGameDetaileByIdQuery } from "@/services/rawgApi";

export function GameCard() {
    const { data, error, isLoading } = useGetGameDetaileByIdQuery(3498)

    return (
        <div></div>
    )
}