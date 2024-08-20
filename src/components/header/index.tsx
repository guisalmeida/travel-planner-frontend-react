import { ReactNode } from "react";
import { Link } from "react-router-dom";

type HeaderProps = {
  children?: ReactNode;
};

export function Header({ children }: HeaderProps) {
  return (
    <header className="flex flex-col align items-center justify-center max-w-6xl py-10 mx-auto gap-3">
      <div className="flex flex-col align items-center justify-center gap-2">
        <Link to="/">
          <img src="/images/logo.svg" alt="Planner logo" />
        </Link>

        <p className="text-sm text-zinc-300">
          Convide seus amigos e planeje sua próxima viagem!
        </p>
      </div>

      {children}
    </header>
  );
}
