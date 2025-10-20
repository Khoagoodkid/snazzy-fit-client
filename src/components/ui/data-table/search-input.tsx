"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  showClearButton?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  onClear?: () => void;

}

const SearchInput: React.FC<SearchInputProps> = ({
  value = "",
  onChange,
  placeholder = "",
  className = "",
  showClearButton = true,
  disabled = false,
  size = "md",
  onClear,

}) => {

  const handleClear = () => {
    onChange?.("");
    onClear?.();
  };

  const sizeClasses = {
    sm: "h-8 text-sm",
    md: "h-10",
    lg: "h-12 text-lg",
  };

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18,
  };

  return (
    <div className={cn("relative", className)}>

      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        prefix={<Search className="w-4 h-4 text-slate-400" />}
        className={cn(
          "pl-10 pr-4 text-slate-900 placeholder:text-slate-400 w-full border-2 border-slate-200 focus:border-cyan-500 focus:ring-cyan-500 bg-white rounded-lg shadow-sm transition-all",
          showClearButton && value ? "pr-10" : "",
          sizeClasses[size]
        )}
      />
      {showClearButton && value && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={cn(
            "absolute right-1 h-7 w-7 p-0 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-md transition-colors",
            size === "sm" ? "top-0.5" : size === "md" ? "top-1.5" : "top-2.5"
          )}
          onClick={handleClear}
          disabled={disabled}
        >
          <X size={iconSizes[size] - 2} />
        </Button>
      )}
    </div>
  );
};

export default SearchInput;
