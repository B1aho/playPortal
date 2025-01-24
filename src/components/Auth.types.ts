import { AuthType } from "@/pages/AuthPage";

export interface AuthFormProps {
    authStatus: AuthType
    onChangeAuthType?: () => void
    onSubmit?: () => void
};