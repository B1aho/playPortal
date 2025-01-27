import { useEffect, useRef } from "react";

interface LoadMoreProps {
    isLoading: boolean;
    onIntersection: () => void
}

export function LoadMore({ isLoading, onIntersection }: LoadMoreProps) {
    const observerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Логирование для дебага
        console.log("useEffect: Observer is being created.");

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Логирование для дебага
                console.log(entry.isIntersecting ? "Element is intersecting" : "Element is not intersecting");

                if (entry.isIntersecting && !isLoading) {
                    console.log("Intersection observed. Calling onIntersection.");
                    onIntersection();
                }
            });
        }, { threshold: 1.0 });

        if (observerRef.current) {
            observer.observe(observerRef.current);
            console.log("Observer is observing the element.");
        }

        // Очистка наблюдателя при размонтировании компонента или изменении наблюдаемого элемента
        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
                console.log("Observer is no longer observing the element.");
            }
        };
    }, [])


    return (
        <div ref={observerRef} className="bg-blue-500">Load More</div>
    )
}