import { FormEvent, MutableRefObject, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { changeUsername, clearError, selectErrorName } from "@/features/user/userSlice";
import { LoginInput } from "./LoginInput";
import { Button } from "./ui/button";
import { SquareCheckBig } from "lucide-react";

export function ChangeUsername() {
    const [login, setLogin] = useState('');
    const formRef: MutableRefObject<HTMLFormElement | null> = useRef(null);
    const error = useAppSelector(selectErrorName);
    const dispatch = useAppDispatch();
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (formRef.current && formRef.current.checkValidity())
            dispatch(changeUsername(login))
    }

    if (login === "") {
        dispatch(clearError());
    }
    return (
        <>
            <form ref={formRef} onSubmit={handleSubmit}>
                <LoginInput onLoginChange={setLogin} value={login} />
                <Button onPointerUp={handleSubmit} type="submit">
                    <SquareCheckBig />
                    Confirm changes
                </Button>
                {error && <div className="text-red-500">{error}</div>}
            </form>
        </>
    );
}