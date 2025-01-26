// Добавить также как с логином паттерен для пароля  и проверку того же пароли совпадают
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { ChangeEvent, FormEventHandler, PointerEventHandler, useState } from "react";

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
    const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
        onLoginChange(e.target.value)
        if (e.target.value.length > 2 && !e.target.checkValidity())
            setIsLoginValid(false)
        else
            setIsLoginValid(true)
    }
    return (
        <div className="max-w-md">
            <form onSubmit={onSubmit}>
                <div className="flex flex-col-reverse">
                    <Input type="text" pattern="^\w{5,10}" required id="login" value={login} onChange={handleLoginChange} />
                    <Label
                        className={!isLoginValid ? "invalid-label" : undefined}
                        data-help="Your username must be between 5 and 10 characters long, and can include Latin letters, numbers, and underscores"
                        htmlFor="login"
                    >
                        Login:
                    </Label>
                </div>
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