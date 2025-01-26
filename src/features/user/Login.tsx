import { MouseEventHandler, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectErrorName, logIn, clearError } from "./userSlice";
import { useNavigate } from "react-router-dom";
import { Auth } from "@/components/Auth";

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

    const handleRedirect: MouseEventHandler = (e: React.MouseEvent) => {
        dispatch(clearError());
        navigate('/signup');
    };

    return (
        <Auth
            login={login}
            onLoginChange={setLogin}
            password={password}
            onPasswordChange={setPassword}
            onRedirect={handleRedirect}
            onSubmit={handleSubmit}
            redirectText="If you haven't account yet, tap and sign up!"
            submitText="LOG IN"
            title="Login: "
            error={error}
        />
    );
}