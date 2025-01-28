import { FormEventHandler, PointerEventHandler, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { clearError, selectErrorName, selectIsAuthenticated, signup } from "./userSlice";
import { useNavigate } from "react-router-dom";
import { Auth } from "@/components/Auth";
import { useRedirectIfAuth } from "@/hooks/useRedirectIfAuth";

export function SignupPage() {
    // Добавить логику чтобы вышел сначала из первой учетки чтобы можно было зарегать снова другой акк
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const error = useAppSelector(selectErrorName);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useRedirectIfAuth(isAuthenticated);

    const handleSubmit: FormEventHandler = (e) => {
        // check password the same
        e.preventDefault();
        dispatch(signup({
            username: login,
            password: password,
        }))
    };

    const handleRedirect: PointerEventHandler = () => {
        dispatch(clearError());
        navigate('/login');
        ;
    }
    return (
        <Auth
            login={login}
            onLoginChange={setLogin}
            password={password}
            onPasswordChange={setPassword}
            confirmPassword={confirmPassword}
            onConfirmPasswordChange={setConfirmPassword}
            onRedirect={handleRedirect}
            onSubmit={handleSubmit}
            redirectText="If you have an account, tap and log in!"
            submitText="SIGN UP"
            error={error}
        />
    );
}