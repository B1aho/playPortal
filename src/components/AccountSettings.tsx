import { useAppSelector } from "@/app/hooks";
import { selectUsername } from "@/features/user/userSlice";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { ChangeUsername } from "./ChangeUsername";
import { ChangePassword } from "./ChangePassword";
import { DeleteAccount } from "./DeleteAccount";
import Lottie from "lottie-react";
import userAnim from "@/lottie/user.json";
export function AccountSettings() {
    const username = useAppSelector(selectUsername);
    return (
        <>
            <div className="p-1">
                <div className="flex-1">
                    <Tabs defaultValue="username" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 mb-3">
                            <TabsTrigger value="username" className="font-semibold">
                                Change my username
                            </TabsTrigger>
                            <TabsTrigger value="password" className="font-semibold">
                                Change my password
                            </TabsTrigger>
                            <TabsTrigger value="delete" className="font-semibold">
                                Delete account
                            </TabsTrigger>
                        </TabsList>
                        <div className="px-6 flex justify-evenly gap-10 items-center">
                            <div className="flex custom-hover-animation shadow-neutral-500 dark:shadow-slate-900 shadow-2xl rounded-lg items-center justify-center min-h-56 w-[60%] bg-black bg-opacity-20">
                                <div className="flex w-[80%] flex-col">
                                    <TabsContent value="username">
                                        <ChangeUsername />
                                    </TabsContent>
                                    <TabsContent value="password">
                                        <ChangePassword />
                                    </TabsContent>
                                    <TabsContent value="delete">
                                        <DeleteAccount />
                                    </TabsContent>
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div
                                    className="flex shadow-neutral-500 dark:shadow-slate-900 shadow-lg h-56 w-56 rounded-full justify-center items-center bg-black bg-opacity-30"
                                >
                                    <Lottie loop={true} className="w-48" animationData={userAnim} />
                                </div>
                                <span className="italic text-2xl">{username}</span>
                            </div>
                        </div>
                    </Tabs>
                </div>
            </div>
        </>
    )
}