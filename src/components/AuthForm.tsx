import { Link } from "react-router-dom";
import { AuthFormProps } from "./Auth.types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";

export function AuthForm({ authStatus, onSubmit }: AuthFormProps) {
    return (
        <div className="max-w-md">
            <form>
                <Label htmlFor="login">Login: </Label>
                <Input id="login" />
                <Label htmlFor="password">Password: </Label>
                <Input id="password" />
                {authStatus === 'signup' && <><Label htmlFor="conf-password">Confirm password: </Label>
                    <Input id="conf-password" /></>}
                <Button onClick={onSubmit} type="submit">{authStatus === 'signup' ? 'SIGN UP' : 'LOG IN'}</Button>
            </form>
            <Link to={(authStatus === 'signup' ? '/auth/login' : '/auth/signup')}>
                <Button variant={"link"} onClick={onSubmit}>
                    If you {authStatus === "signup" ? "have an account, tap and log-ip" : "don't have account yet, tap and sign-up"}
                </Button>
            </Link>
        </div>
    );
}