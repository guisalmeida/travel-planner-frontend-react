import { X } from "lucide-react";
import { ComponentProps } from "react";

export function CloseButton({ ...props }: ComponentProps<"button">) {
  return (
    <button {...props} className="absolute right-6 top-5 z-10">
      <X className="text-zinc-300 size-5 rounded-sm hover:bg-zinc-700 flex items-center justify-center" />
    </button>
  );
}
