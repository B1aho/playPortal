// Общую логику форм вынести + onClick поменять onPointerDown
// в хранилилще два отдельных свойства для ошибок login и signup + при routing, ошибки очищаться должны
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { MouseEventHandler, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectErrorName, signup } from "./userSlice";
import { useNavigate } from "react-router-dom";

export function SignupForm() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const error = useAppSelector(selectErrorName);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit: MouseEventHandler = (e: React.MouseEvent) => {
        // check password the same
        e.preventDefault();
        dispatch(signup({
            username: login,
            password: password,
        }))
    };

    return (
        <div className="max-w-md">
            <form>
                <Label htmlFor="login">Login: </Label>
                <Input id="login" value={login} onChange={(e) => setLogin(e.target.value)} />
                <Label htmlFor="password">Password: </Label>
                <Input id="password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
                <Label htmlFor="confirmPassword">Confirm password: </Label>
                <Input id="confirmPassword" value={confirmPassword} type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
                <Button onClick={handleSubmit} type="submit">SIGN UP</Button>
            </form>
            <Button onClick={() => navigate('/login')} variant={"link"}>
                If you have account, tap and log in"
            </Button>
            {error && <div className="text-red-500">{error}</div>}
        </div>
    );
}