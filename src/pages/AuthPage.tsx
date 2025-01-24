import { useState } from 'react';

enum AuthType {
  login = 'login',
  signup = 'signup',
}

/**
 * Логика примерно следущая:
 * Человека всегда редиректит на страницу log-in
 * AuthPage решает, что показать - login или signup
 * Каждому передается callback, onChangeAuthType, который меняет состояние AuthPage показывая другую форму
 */
export function AuthPage() {
  const [authType, setAuthType] = useState<keyof typeof AuthType>(
    AuthType.login,
  );
  return <></>;
}
