import { Password } from "./Password";
import { Label } from "./ui/label";

interface PasswordInputProps {
    onPasswordChange: (value: string) => void;
    value: string;
    labelText?: string;
}
export function PasswordInput({ onPasswordChange, value, labelText = "Password: " }: PasswordInputProps) {
    return (
        <div className="flex flex-col-reverse">
            <Password onChange={(e) => onPasswordChange(e.target.value)} value={value} />
            <Label htmlFor="password">{labelText}</Label>
        </div>
    )
}