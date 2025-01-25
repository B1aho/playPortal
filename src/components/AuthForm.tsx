import { AuthFormProps } from "./Auth.types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";

export function AuthForm({ authStatus, onChangeAuthType, onSubmt }: AuthFormProps) {
    return (
        <div className="max-w-md">
            <form>
                <Label htmlFor="login">Login: </Label>
                <Input id="login" />
                <Label htmlFor="password">Password: </Label>
                <Input id="password" />
                {authStatus === 'signup' && <><Label htmlFor="password">Confirm password: </Label>
                    <Input id="password" /></>}
                <Button onClick={onSubmt} type="submit">{authStatus === 'signup' ? 'SIGN UP' : 'LOG IN'}</Button>
            </form>
            <Button variant={"link"} onClick={onChangeAuthType}>
                If you {authStatus === "signup" ? "have an account, tap and log-ip" : "don't have account yet, tap and sign-up"}
            </Button>
        </div>
    );
}