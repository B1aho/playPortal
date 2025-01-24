import { useState } from 'react';
import { AuthForm } from '@/components/AuthForm';
import { Outlet } from 'react-router-dom';

enum AuthStatus {
    login = 'login',
    signup = 'signup',
    none = 'none',
}

interface AuthPageProps {
    authT: AuthType
}
export type AuthType = keyof typeof AuthStatus;

export function AuthPage({ authT }: AuthPageProps) {
    const [authType, setAuthType] = useState<AuthType>(authT);

    const changeAuthType = (): void => {
        authType === AuthStatus.login
            ? setAuthType(AuthStatus.signup)
            : setAuthType(AuthStatus.login);
    };

    const submitAuthData = () => {

    }

    return (
        <>
            <Outlet context={{ onSubmit: submitAuthData }} />
            {/* <AuthForm onSubmt={submitAuthData} authStatus={authType} onChangeAuthType={changeAuthType} /> */}
        </>
    );
}
