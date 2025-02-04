import { ChangeEventHandler, useState } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface PasswordProps {
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    className?: string;
}

export function Password({ value, onChange, className }: PasswordProps) {
    const [showPassword, setShowPassword] = useState(false)
    const disabled = value === "" || value === undefined

    return (
        <div className="relative">
            <Input
                value={value}
                id="password"
                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$"
                type={showPassword ? "text" : "password"}
                className={cn("hide-password-toggle pr-10 mb-1", className)}
                onChange={onChange}
            />
            <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={disabled}
            >
                {showPassword && !disabled ? (
                    <EyeIcon
                        className="h-4 w-4"
                        aria-hidden="true"
                    />
                ) : (
                    <EyeOffIcon
                        className="h-4 w-4"
                        aria-hidden="true"
                    />
                )}
                <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                </span>
            </Button>

            {/* hides browsers password toggles */}
            <style>
                {
                    `
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}`
                }
            </style>
        </div>
    )
}