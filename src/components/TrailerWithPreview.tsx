import { useRef } from "react";

export interface TrailerWithPreviewProps {
    src: string;
}

export function TrailerWithPreview({ src }: TrailerWithPreviewProps) {
    const videoRef = useRef<HTMLIFrameElement | null>(null);
    const embedUrl = convertYouTubeLink(src);

    return (
        <div
            className="relative w-full h-full rounded-xl cursor-pointer shadow-black shadow-inner"
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
            }
        </div>
    )
}

function convertYouTubeLink(url: string) {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([\w-]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}