import { useAppSelector } from "@/app/hooks";
import { selectUsername } from "@/features/user/userSlice";
import { UserRoundPen } from "lucide-react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { ChangeUsername } from "./ChangeUsername";
import { ChangePassword } from "./ChangePassword";
export function AccountSettings() {
    const username = useAppSelector(selectUsername);
    return (
        <>
            <div>
                <div className="flex justify-between w-52 outline outline-black">
                    <UserRoundPen size={50} />
                    <div className="flex flex-col">Current user: <span>{username}</span></div>
                </div>
                <div>
                    <Tabs defaultValue="username" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="username">
                                Change my username
                            </TabsTrigger>
                            <TabsTrigger value="password">
                                Change my password
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="username">
                            <ChangeUsername />
                        </TabsContent>
                        <TabsContent value="password">
                            <ChangePassword />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    )
}