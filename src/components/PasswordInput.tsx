import { ChangeEvent, useState } from "react";
import { Password } from "./Password";
import { Label } from "./ui/label";

interface PasswordInputProps {
    onPasswordChange: (value: string) => void;
    value: string;
    labelText?: string;
}
export function PasswordInput({ onPasswordChange, value, labelText = "Password: " }: PasswordInputProps) {
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const handlePassChange = (e: ChangeEvent<HTMLInputElement>) => {
        onPasswordChange(e.target.value)
        if (e.target.value.length > 5 && !e.target.checkValidity())
            setIsPasswordValid(false)
        else
            setIsPasswordValid(true)
    }
    return (
        <div className="flex flex-col-reverse">
            <Password className="mb-3" onChange={(e) => handlePassChange(e)} value={value} />
            <Label
                data-help="At least 8 characters long and include at least one letter, one number and one special character (!@#$%^&*)"
                htmlFor="password" className={"text-base " + (!isPasswordValid ? "invalid-label" : undefined)}>{labelText}</Label>
        </div>
    )
}