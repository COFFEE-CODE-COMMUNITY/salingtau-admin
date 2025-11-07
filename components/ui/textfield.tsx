import React from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { FieldDescription } from "@/components/ui/field";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  error?: boolean
  id?: string
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, helperText, error, id, className, ...rest }, ref) => {
    const inputId = id

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
        <Input
          id={inputId}
          ref={ref}
          className={cn(
            "transition-colors",
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
TextField.displayName = "TextField"

