import { ComponentProps, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "font-semibold px-5 rounded-lg flex items-center justify-center gap-2 shadow-shape disabled:bg-zinc-700 disabled:text-zinc-200 disabled:cursor-not-allowed",
  variants: {
    colorVariant: {
      primary: "bg-sky-500 text-sky-950  hover:bg-sky-600",
      secondary: "bg-zinc-700 text-zinc-200 hover:bg-zinc-800",
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
