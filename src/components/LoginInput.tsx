import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { ChangeEvent, useState } from "react";

interface LoginInputProps {
    value: string;
    onLoginChange: (value: string) => void;
}

export function LoginInput({ onLoginChange, value }: LoginInputProps) {
    const [isLoginValid, setIsLoginValid] = useState(true);
    const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
        onLoginChange(e.target.value)
        if (e.target.value.length > 5 && !e.target.checkValidity())
            setIsLoginValid(false)
        else
            setIsLoginValid(true)
    }

    return (
        <div className="flex gap-1 flex-col-reverse">
            <Input className="mb-1 " type="text" pattern="^\w{6,20}" required id="login" value={value} onChange={handleLoginChange} />
            <Label
                className={'text-base ' + (!isLoginValid ? "invalid-label" : undefined)}
                data-help="6–20 characters (Latin letters, numbers, underscores only)"
                htmlFor="login"
            >
                Login:
            </Label>
        </div>
    )
}