import React from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { FieldDescription } from "@/components/ui/field"
import { Eye, EyeOff } from "lucide-react"

interface PasswordFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  helperText?: string
  error?: boolean
  id?: string
}

export const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ label, helperText, error, id, className, ...rest }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const inputId = id

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }

    return (
      <div className="flex flex-col gap-1 w-full mb-3">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium",
              error ? "text-red-600 dark:text-red-500" : "text-slate-700 dark:text-slate-200"
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <Input
            id={inputId}
            ref={ref}
            type={showPassword ? "text" : "password"}
            className={cn(
              "transition-colors pr-10",
              " h-11 " ,
              error
                ? "border-red-600 focus-visible:ring-red-600 text-red-600 placeholder:text-red-400"
                : "border-slate-300 focus-visible:ring-slate-700",
              className
            )}
            aria-invalid={error || undefined}
            aria-describedby={helperText ? `${inputId}-helper-text` : undefined}
            {...rest}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 rounded",
              error && "text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            )}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>
        {helperText && (
          <FieldDescription
            id={`${inputId}-helper-text`}
            className={cn(
              "text-xs text-left",
              error ? "text-red-600 dark:text-red-500" : "text-slate-500 dark:text-slate-400"
            )}
          >
            {helperText}
          </FieldDescription>
        )}
      </div>
    )
  }
)
PasswordField.displayName = "PasswordField"
