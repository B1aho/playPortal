import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { MouseEventHandler, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectErrorName, logIn } from "./userSlice";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const error = useAppSelector(selectErrorName);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit: MouseEventHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(logIn({
            username: login,
            password: password
        }))
    };

    return (
        <div className="max-w-md">
            <form>
                <Label htmlFor="login">Login: </Label>
                <Input id="login" value={login} onChange={(e) => setLogin(e.target.value)} />
                <Label htmlFor="password">Password: </Label>
                <Input id="password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={handleSubmit} type="submit">LOG IN</Button>
            </form>
            <Button onClick={() => navigate('/signup')} variant={"link"}>
                If you don't have account yet, tap and sign-up
            </Button>
            {error && <div className="text-red-500">{error}</div>}
        </div>
    );
}