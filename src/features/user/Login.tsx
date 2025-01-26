import { FormEventHandler, PointerEventHandler, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectErrorName, logIn, clearError, selectIsAuthenticated } from "./userSlice";
import { useNavigate } from "react-router-dom";
import { Auth } from "@/components/Auth";

export function LoginForm() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const error = useAppSelector(selectErrorName);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    if (isAuthenticated)
        navigate('/main');

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        dispatch(logIn({
            username: login,
            password: password
        }))
    };

    const handleRedirect: PointerEventHandler = () => {
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
            error={error}
        />
    );
}