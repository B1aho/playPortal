import { SkeletonCard } from "./SkeletonCard";

export function ContentSkeleton() {
    return (
        <>
            {
                Array.from({ length: 10 }).map((_, index) => (
                    <SkeletonCard key={index} />
                ))
            }
        </>
    )
}