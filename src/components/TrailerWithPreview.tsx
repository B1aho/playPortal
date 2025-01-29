import { useCallback, useRef, useState } from "react";

export interface TrailerWithPreviewProps {
    src: string;
    preview: string;
}

export function TrailerWithPreview({ src, preview }: TrailerWithPreviewProps) {
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const handleHover = useCallback(() => {
        setIsHovered(true)
    }, [])

    const handleUnHover = useCallback(() => {
        if (videoRef.current && !videoRef.current.paused)
            return;
        setIsHovered(false)
    }, [])
    return (
        <div
            className="relative w-full rounded-xl cursor-pointer shadow-black shadow-inner"
            onMouseEnter={handleHover}
            onMouseLeave={handleUnHover}
        >
            {isHovered
                ? <video ref={videoRef} controls className="w-full rounded-xl" src={src}>
                    <source type="video/mp4" />
                </video>
                : <img className="w-full rounded-xl  shadow-black shadow-inner" src={preview} alt="trailer-preview" />
            }
        </div>
    )
}