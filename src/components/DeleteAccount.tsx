import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { checkOldPassword, clearError, selectConfirmPassword, selectErrorName, setOldPasswordCheckRes } from "@/features/user/userSlice";
import { Button } from "./ui/button";
import { KeyRound } from "lucide-react";
import { PasswordInput } from "./PasswordInput";
import { useToast } from "@/hooks/use-toast";
import { PopupConfirm } from "./PopupConfirm";

// Разделить на два компонента 
export function DeleteAccount() {
    const [oldPassword, setOldPassword] = useState('');
    const isConfirmOldPassword = useAppSelector(selectConfirmPassword);
    const { toast } = useToast();
    const error = useAppSelector(selectErrorName);
    const dispatch = useAppDispatch();

    const handleOldPasswordCheck = (e: FormEvent) => {
        e.preventDefault();
        console.log('Dispatch Start checking if old password rigth')
        dispatch(checkOldPassword(oldPassword))
    }

    const handleDeleteAccount = () => {

    }

    useEffect(() => {
        if (oldPassword === "") {
            dispatch(clearError());
        }
    }, [oldPassword, dispatch]);

    useEffect(() => {
        setOldPassword("");
        console.log('Set old pass input to ""')
    }, [isConfirmOldPassword])

    useEffect(() => {
        return () => {
            dispatch(setOldPasswordCheckRes(false));
            console.log('Set old passwCheckRes false')
        }
    }, [])

    return (
        <>
            <form onSubmit={handleOldPasswordCheck}>
                <PasswordInput value={oldPassword} labelText="Enter your old password" onPasswordChange={setOldPassword} />
                <Button variant="destructive" type="submit">
                    <KeyRound />
                    Delete my account!
                </Button>
            </form>
            {isConfirmOldPassword &&
                <PopupConfirm
                    title="Are you absolutely sure?"
                    desc="This action cannot be undone. This will permanently delete your account."
                    onConfirm={handleDeleteAccount}
                />}
            {error && <div className="text-red-500">{error}</div>}
        </>
    );
}