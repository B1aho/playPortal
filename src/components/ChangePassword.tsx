import { FormEvent, MutableRefObject, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { changePassword, checkOldPassword, clearError, selectConfirmPassword, selectErrorName, selectIsPasswordWasChanged, setError, setIsPasswordWasChanged, setOldPasswordCheckRes } from "@/features/user/userSlice";
import { Button } from "./ui/button";
import { KeyRound, SquareCheckBig } from "lucide-react";
import { PasswordInput } from "./PasswordInput";
import { useToast } from "@/hooks/use-toast";

// Разделить на два компонента 
// Че то он 20 раз перерендеривается и состояние  isPasswordWasChanged и isConfirmOldPassword - неправильно меняются
export function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const isConfirmOldPassword = useAppSelector(selectConfirmPassword);
    const isPasswordWasChanged = useAppSelector(selectIsPasswordWasChanged);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const formRef: MutableRefObject<HTMLFormElement | null> = useRef(null);
    const { toast } = useToast();
    const error = useAppSelector(selectErrorName);
    const dispatch = useAppDispatch();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            dispatch(setError('Passwords do not match'));
            return;
        }
        if (formRef.current && formRef.current.checkValidity())
            dispatch(changePassword(password))
    }

    const handleOldPasswordCheck = (e: FormEvent) => {
        e.preventDefault();
        dispatch(checkOldPassword(oldPassword))
    }

    if (oldPassword === "") {
        dispatch(clearError());
    }

    if (isPasswordWasChanged) {
        setPassword("");
        setConfirmPassword("");
        toast({
            title: "Success!",
            description: "Your password has been successfully changed",
        })
        dispatch(setIsPasswordWasChanged(false))
    }

    useEffect(() => {
        setOldPassword("");
    }, [isConfirmOldPassword])

    useEffect(() => {
        return () => {
            dispatch(setOldPasswordCheckRes(false));
        }
    }, [])

    return (
        <>
            {!isConfirmOldPassword
                ?
                <form onSubmit={handleOldPasswordCheck}>
                    <PasswordInput value={oldPassword} labelText="Enter your old password" onPasswordChange={setOldPassword} />
                    <Button type="submit">
                        <KeyRound />
                        Enter old password
                    </Button>
                </form>
                : <form ref={formRef} onSubmit={handleSubmit}>
                    <PasswordInput value={password} labelText="New password" onPasswordChange={setPassword} />
                    <PasswordInput value={confirmPassword} labelText="Confirm new password:" onPasswordChange={setConfirmPassword} />
                    <Button onPointerUp={handleSubmit} type="submit">
                        <SquareCheckBig />
                        Confirm changes
                    </Button>
                </form>
            }
            {error && <div className="text-red-500">{error}</div>}
        </>
    );
}