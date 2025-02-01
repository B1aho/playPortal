import { useAppSelector } from "@/app/hooks";
import { AccountSettings } from "@/components/AccountSettings";
import { selectIsAuthenticated } from "@/features/user/userSlice";

export function SettingPage() {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    return (
        <>
            {isAuthenticated
                ? <AccountSettings />
                : <div>You should log in/sign up first!</div>
            }
        </>
    )
}