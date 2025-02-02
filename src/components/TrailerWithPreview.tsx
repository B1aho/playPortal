import { useCallback, useRef, useState } from "react";

export interface TrailerWithPreviewProps {
    src: string;
}

export function TrailerWithPreview({ src }: TrailerWithPreviewProps) {
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef<HTMLIFrameElement | null>(null);
    const embedUrl = convertYouTubeLink(src);
    const handleHover = useCallback(() => {
        setIsHovered(true)
    }, [])

    const handleUnHover = useCallback(() => {
        if (videoRef.current && !videoRef.current.onpause)
            return;
        setIsHovered(false)
    }, [])
    return (
        <div
            className="relative w-full h-full rounded-xl cursor-pointer shadow-black shadow-inner"
            onMouseEnter={handleHover}
            onMouseLeave={handleUnHover}
        >
            {embedUrl ?
                <iframe
                    ref={videoRef}
                    className="w-full h-full"
                    src={embedUrl}
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
                : null
                // <video ref={videoRef} controls className="w-full rounded-xl" src={src}>
                //     <source type="video/mp4" />
                // </video>
                /* : preview && <img className="w-full rounded-xl  shadow-black shadow-inner" src={preview} alt="trailer-preview" />*/
            }
        </div>
    )
}

function convertYouTubeLink(url: string) {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([\w-]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}