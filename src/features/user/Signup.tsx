import { FormEventHandler, PointerEventHandler, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { clearError, selectErrorName, selectIsAuthenticated, setError, signup } from "./userSlice";
import { useNavigate } from "react-router-dom";
import { Auth } from "@/components/Auth";
import { useRedirectIfAuth } from "@/hooks/useRedirectIfAuth";

export function SignupPage() {
    // Добавить логику чтобы вышел сначала из первой учетки чтобы можно было зарегать снова другой акк
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const error = useAppSelector(selectErrorName);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useRedirectIfAuth(isAuthenticated);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            dispatch(setError('Passwords do not match'));
            return;
        }
        dispatch(signup({
            username: login,
            password: password,
        }))
        if (isAuthenticated)
            navigate('/main');
    };

    const handleRedirect: PointerEventHandler = () => {
        dispatch(clearError());
        navigate('/login');
    }

    if (login === "" && password === "" && confirmPassword === "") {
        dispatch(clearError());
    }

    return (
        <>
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
        </>
    );
}