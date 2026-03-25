import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative isolate inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-[background-color,border-color,color,box-shadow,transform,filter] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:absolute before:inset-[-0.28rem] before:-z-10 before:rounded-full before:opacity-0 before:scale-[0.92] before:blur-[18px] before:transition-[opacity,transform] before:duration-250 before:ease-[cubic-bezier(0.22,1,0.36,1)] before:content-[''] hover:scale-[1.02] hover:before:opacity-100 hover:before:scale-100 active:scale-[0.97] active:before:opacity-70 active:before:scale-[0.96] disabled:pointer-events-none disabled:scale-100 disabled:opacity-50 disabled:shadow-none disabled:drop-shadow-none disabled:before:opacity-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:hover:before:opacity-0 motion-reduce:active:scale-100",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--brand)] text-white shadow-[0_14px_30px_rgba(239,125,87,0.24)] before:bg-[radial-gradient(circle,rgba(239,125,87,0.44)_0%,rgba(239,125,87,0.32)_42%,rgba(216,95,54,0.18)_68%,transparent_82%)] hover:bg-[var(--brand)] hover:shadow-[0_18px_34px_rgba(239,125,87,0.3)] active:shadow-[0_10px_22px_rgba(239,125,87,0.22)]",
        secondary:
          "bg-white/84 text-foreground shadow-[0_10px_24px_rgba(31,41,55,0.05)] before:bg-[radial-gradient(circle,rgba(255,255,255,0.96)_0%,rgba(255,217,191,0.38)_58%,transparent_80%)] hover:bg-white/84 hover:shadow-[0_16px_30px_rgba(31,41,55,0.08)] active:shadow-[0_8px_18px_rgba(31,41,55,0.06)]",
        ghost:
          "text-foreground shadow-none before:bg-[radial-gradient(circle,rgba(31,111,120,0.22)_0%,rgba(31,111,120,0.1)_56%,transparent_80%)] hover:bg-transparent hover:text-[var(--text)] hover:drop-shadow-[0_0_10px_rgba(31,111,120,0.14)] active:drop-shadow-none",
      },
      size: {
        default: "h-12 px-5 py-2",
        sm: "h-10 px-4",
        icon: "size-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
