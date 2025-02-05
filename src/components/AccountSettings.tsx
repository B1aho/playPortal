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
            <div className="flex p-6 gap-2">
                <div className="flex flex-1 justify-evenly items-start">
                    <div className="flex flex-col text-4xl font-bold">Current user: <span className="italic">{username}</span></div>
                    <Lottie className="w-48" animationData={userAnim} />
                </div>
                <div className="flex-1">
                    <Tabs defaultValue="username" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
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
                        <TabsContent value="username">
                            <ChangeUsername />
                        </TabsContent>
                        <TabsContent value="password">
                            <ChangePassword />
                        </TabsContent>
                        <TabsContent value="delete">
                            <DeleteAccount />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    )
}