import { ComponentProps, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "px-5 rounded-lg flex items-center justify-center gap-2 shadow-shape",
  variants: {
    colorVariant: {
      primary: "bg-lime-400 text-lime-950  hover:bg-lime-500",
      secondary: "bg-zinc-800 text-zinc-200 hover:bg-zinc-700",
    },
    sizeVariant: {
      default: "py-2",
      full: "w-full h-11",
    },
  },
  defaultVariants: {
    colorVariant: "primary",
    sizeVariant: "default",
  },
});

interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

export function Button({
  children,
  colorVariant,
  sizeVariant,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={buttonVariants({ colorVariant, sizeVariant })}
    >
      {children}
    </button>
  );
}
