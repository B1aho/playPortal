import Lottie from "lottie-react";
import attention from "@/lottie/attent.json";

export function AnimNotAuth() {
    return (<div className="w-full h-full flex justify-center items-center">
        <h2 className="text-5xl font-bold">You should auth first</h2>
        <Lottie className="w-[20%]" animationData={attention} />
    </div>)
}