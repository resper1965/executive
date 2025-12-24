"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, onCheckedChange, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        <input
          type="checkbox"
          className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-primary/20 bg-background transition-all checked:border-primary checked:bg-primary"
          ref={ref}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          {...props}
        />
        <Check className="pointer-events-none absolute left-0.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100" />
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
