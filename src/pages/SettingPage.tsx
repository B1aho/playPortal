import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { AccountSettings } from "@/components/AccountSettings";
import { selectErrorName, selectIsAuthenticated } from "@/features/user/userSlice";
import { useState } from "react";

export function SettingPage() {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const error = useAppSelector(selectErrorName);
    const dispatch = useAppDispatch();
    return (
        <>
            {isAuthenticated
                ? <AccountSettings />
                : <div>You should log in/sign up first!</div>
            }
        </>
    )
}