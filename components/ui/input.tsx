import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  classNameDiv?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, classNameDiv, type, icon, endIcon, ...props }, ref) => {
    return (
      <div className={cn("relative flex items-center", classNameDiv)}>
        {icon && <div className="absolute left-5 text-muted-foreground">{icon}</div>}
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-lg border border-input dark:border-[#324e58] bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className,
            icon ? "pl-12" : "px-3"
          )}
          ref={ref}
          {...props}
        />
        {endIcon && <div className="absolute right-0 text-muted-foreground">{endIcon}</div>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
