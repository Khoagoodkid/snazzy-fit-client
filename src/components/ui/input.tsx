import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  className?: string;
  type: "text" | "email" | "password";
}

function Input({ className, type, prefix, suffix, ...props }: InputProps) {
  return (
    <div className="relative w-full">
      {prefix && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 z-10">
          {prefix}
        </div>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "border border-white/20 bg-white/5 text-[var(--text-primary)] placeholder:text-gray-400 rounded-md",
          "flex h-10 w-full min-w-0 rounded-md px-3 py-2 text-base shadow-xs transition-all outline-none",
          "focus:border-blue-400 focus:ring-2 focus:ring-blue-500/50",

          prefix && "pl-10",
          className
        )}
        {...props}
      />
      {suffix && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 z-10">
          {suffix}
        </div>
      )}
    </div>
  );
}

export { Input };
