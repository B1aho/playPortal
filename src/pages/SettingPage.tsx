import { useAppSelector } from "@/app/hooks";
import { AccountSettings } from "@/components/AccountSettings";
import { AnimNotAuth } from "@/components/AnimNotAuth";
import { selectIsAuthenticated } from "@/features/user/userSlice";

export function SettingPage() {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    return (
        <>
            {isAuthenticated
                ? <AccountSettings />
                : <AnimNotAuth />
            }
        </>
    )
}