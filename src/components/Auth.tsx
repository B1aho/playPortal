import { Button } from "@/components/ui/button";
import { FormEventHandler, PointerEventHandler } from "react";
import { LoginInput } from "./LoginInput";
import { PasswordInput } from "./PasswordInput";

interface AuthProps {
    login: string;
    password: string;
    confirmPassword?: string;
    onLoginChange: (value: string) => void;
    onPasswordChange: (value: string) => void;
    onConfirmPasswordChange?: (value: string) => void;
    onSubmit: FormEventHandler;
    submitText: string;
    redirectText: string;
    onRedirect: PointerEventHandler;
    error?: string | null;
}

export function Auth(
    {
        login,
        onLoginChange,
        password,
        onPasswordChange,
        confirmPassword,
        onConfirmPasswordChange,
        onSubmit,
        submitText,
        redirectText,
        onRedirect,
        error,
    }: AuthProps) {
    const needConfirmPassword = (confirmPassword || confirmPassword === "") && onConfirmPasswordChange;
    return (
        <div className="w-96 flex flex-col">
            <form onSubmit={onSubmit} className="w-full flex flex-col">
                <LoginInput onLoginChange={onLoginChange} value={login} />
                <PasswordInput onPasswordChange={onPasswordChange} value={password} />
                {needConfirmPassword &&
                    <PasswordInput labelText="Confirm password: " onPasswordChange={onConfirmPasswordChange} value={confirmPassword} />
                }
                <Button className="align-middle" type="submit">{submitText}</Button>
            </form>
            <Button className="" onPointerDown={onRedirect} variant={"link"}>
                {redirectText}
            </Button>
            {error && <div className="text-red-500">{error}</div>}
        </div>
    );
}