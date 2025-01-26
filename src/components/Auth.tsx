import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { FormEventHandler, PointerEventHandler } from "react";

interface AuthProps {
    title: string;
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
        title,
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
    return (
        <div className="max-w-md">
            <form onSubmit={onSubmit}>
                <Label htmlFor="login">{title}</Label>
                <Input id="login" value={login} onChange={(e) => onLoginChange(e.target.value)} />
                <Label htmlFor="password">Password: </Label>
                <Input id="password" value={password} type="password"
                    onChange={(e) => onPasswordChange(e.target.value)} />
                {onConfirmPasswordChange &&
                    <>
                        <Label htmlFor="confirmPassword">Confirm password: </Label>
                        <Input id="confirmPassword" value={confirmPassword} type="password"
                            onChange={(e) => onConfirmPasswordChange(e.target.value)} />
                    </>
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