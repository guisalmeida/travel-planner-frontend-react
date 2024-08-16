import { ReactNode } from "react";
import { CloseButton } from "../closeButton";

interface ModalProps {
  children: ReactNode;
  toogleFn: (value: boolean) => void;
}

export function Modal({ children, toogleFn }: ModalProps) {
  return (
    <div className="bg-black/50 fixed inset-0 backdrop-blur-sm flex items-center justify-center">
      <div className="relative">
        <CloseButton onClick={() => toogleFn(false)} />
        {children}
      </div>
    </div>
  );
}
