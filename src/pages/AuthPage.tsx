import { AuthForm } from '@/components/AuthForm';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

enum AuthStatus {
    login = 'login',
    signup = 'signup',
    none = 'none',
}

export type AuthType = keyof typeof AuthStatus;

export function AuthPage() {
    const location = useLocation();
    const [authType, setAuthType] = useState<AuthType>();

    const changeAuthType = (): void => {
        authType === AuthStatus.login
            ? setAuthType(AuthStatus.signup)
            : setAuthType(AuthStatus.login);
    };

    const submitAuthData = () => {

    }

    return (
        <>
            <AuthForm onSubmt={submitAuthData} authStatus={authType} onChangeAuthType={changeAuthType} />
        </>
    );
}
