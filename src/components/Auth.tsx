import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { FormEventHandler, PointerEventHandler, useState } from "react";
import { LoginInput } from "./LoginInput";

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
    const [isLoginValid, setIsLoginValid] = useState(true);

    return (
        <div className="max-w-md">
            <form onSubmit={onSubmit}>
                <LoginInput isLoginValid={isLoginValid} onLoginChange={onLoginChange} value={login} updateIsLoginValid={setIsLoginValid} />
                <div className="flex flex-col-reverse">
                    <Input required id="password" value={password} type="password"
                        onChange={(e) => onPasswordChange(e.target.value)} />
                    <Label htmlFor="password">Password: </Label>
                </div>
                {onConfirmPasswordChange &&
                    <div className="flex flex-col-reverse">
                        <Input required id="confirmPassword" value={confirmPassword} type="password"
                            onChange={(e) => onConfirmPasswordChange(e.target.value)} />
                        <Label htmlFor="confirmPassword">Confirm password: </Label>
                    </div>
                }
                <Button type="submit">{submitText}</Button>
            </form>
            <Button onPointerDown={onRedirect} variant={"link"}>
                {redirectText}
            </Button>
            {error && <div className="text-red-500">{error}</div>}
        </div>
    );
}