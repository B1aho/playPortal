import { FormEvent, MutableRefObject, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { changePassword, checkOldPassword, clearError, selectConfirmPassword, selectErrorName, selectIsPasswordWasChanged, setError, setIsPasswordWasChanged, setOldPasswordCheckRes } from "@/features/user/userSlice";
import { Button } from "./ui/button";
import { KeyRound, SquareCheckBig } from "lucide-react";
import { PasswordInput } from "./PasswordInput";
import { useToast } from "@/hooks/use-toast";

// Разделить на два компонента 
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
        if (formRef.current && formRef.current.checkValidity()) {
            console.log('Dispatch Change password to the new one')
            dispatch(changePassword(password))
        }
    }

    const handleOldPasswordCheck = (e: FormEvent) => {
        e.preventDefault();
        console.log('Dispatch Start checking if old password rigth')
        dispatch(checkOldPassword(oldPassword))
    }

    useEffect(() => {
        if (oldPassword === "") {
            dispatch(clearError());
        }
    }, [oldPassword, dispatch]);

    useEffect(() => {
        if (password === "" && confirmPassword === "")
            dispatch(clearError())
    }, [password, confirmPassword, dispatch])

    useEffect(() => {
        if (isPasswordWasChanged) {
            console.log('Password was changed! Toast start! And then dispatch that password was changed false');
            setPassword("");
            setConfirmPassword("");
            toast({
                title: "Success!",
                description: "Your password has been successfully changed",
            });
            dispatch(setIsPasswordWasChanged(false));
        }
    }, [isPasswordWasChanged, dispatch, toast]);


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
            {!isConfirmOldPassword
                ?
                <form onSubmit={handleOldPasswordCheck}>
                    <PasswordInput value={oldPassword} labelText="Enter your old password" onPasswordChange={setOldPassword} />
                    <Button type="submit" className="w-full">
                        <KeyRound />
                        Enter password
                    </Button>
                </form>
                : <form ref={formRef} onSubmit={handleSubmit}>
                    <PasswordInput value={password} labelText="New password" onPasswordChange={setPassword} />
                    <PasswordInput value={confirmPassword} labelText="Confirm new password:" onPasswordChange={setConfirmPassword} />
                    <Button onPointerUp={handleSubmit} type="submit" className="w-full">
                        <SquareCheckBig />
                        Confirm changes
                    </Button>
                </form>
            }
            {error && <div className="text-red-500">{error}</div>}
        </>
    );
}