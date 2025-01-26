import { FormEventHandler, PointerEventHandler, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { clearError, selectErrorName, signup } from "./userSlice";
import { useNavigate } from "react-router-dom";
import { Auth } from "@/components/Auth";

export function SignupForm() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const error = useAppSelector(selectErrorName);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

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