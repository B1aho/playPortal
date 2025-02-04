import { useAppSelector } from "@/app/hooks";
import { AccountSettings } from "@/components/AccountSettings";
import { selectIsAuthenticated } from "@/features/user/userSlice";
import attention from "@/lottie/attent.json";
import Lottie from "lottie-react";

export function SettingPage() {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    return (
        <>
            {isAuthenticated
                ? <AccountSettings />
                : <div className="w-full h-full flex justify-center items-center">
                    <h2 className="text-5xl font-bold">You should auth first</h2>
                    <Lottie className="w-[20%]" animationData={attention} />
                </div>
            }
        </>
    )
}