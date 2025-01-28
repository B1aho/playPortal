import { useEffect, useRef } from "react";

interface LoadMoreProps {
    isLoading: boolean;
    onIntersection: () => void;
    className?: string;
}

export function LoadMore({ isLoading, onIntersection, className }: LoadMoreProps) {
    const observerRef = useRef<HTMLDivElement | null>(null);
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        console.log("useEffect: Observer is being created.");
        observer.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                console.log(entry.isIntersecting ? "Element is intersecting" : "Element is not intersecting");
                if (entry.isIntersecting && !isLoading) {
                    console.log("Intersection observed. Calling onIntersection.");
                    onIntersection();
                }
            });
        }, { threshold: 0.5 });

        if (observerRef.current) {
            observer.current.observe(observerRef.current);
            console.log("Observer is observing the element.");
        } else {
            console.warn("observerRef.current is null.");
        }

        return () => {
            observer.current?.disconnect();
        };
    }, [isLoading, onIntersection])


    return (
        <div ref={observerRef} className={'bg-blue-500 ' + className}>Load More</div>
    )
}