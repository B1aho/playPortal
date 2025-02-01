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
        if (e.target.value.length > 2 && !e.target.checkValidity())
            setIsLoginValid(false)
        else
            setIsLoginValid(true)
    }

    return (
        <div className="flex flex-col-reverse">
            <Input type="text" pattern="^\w{5,10}" required id="login" value={value} onChange={handleLoginChange} />
            <Label
                className={!isLoginValid ? "invalid-label" : undefined}
                data-help="Your username must be between 5 and 10 characters long, and can include Latin letters, numbers, and underscores"
                htmlFor="login"
            >
                Login:
            </Label>
        </div>
    )
}