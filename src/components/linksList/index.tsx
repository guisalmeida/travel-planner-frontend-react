import { Link2, Plus } from "lucide-react";
import { Button } from "../button";

export type Link = {
  id: string;
  title: string;
  url: string;
  trip_id: string;
};

type LinksListProps = {
  links?: Link[];
};

export function LinksList({ links }: LinksListProps) {
  return (
    <div className="flex w-full flex-col space-y-6">
      <h2 className="text-xl text-zinc-50 font-semibold">Links importantes</h2>
      <div className="space-y-5">
        {links &&
          links.length > 0 &&
          links.map((link) => (
            <div className="flex items-center justify-between" key={link.id}>
              <div className="space-y-1.5">
                <p className="text-zinc-100 font-medium">{link.title}</p>
                <a
                  href="#"
                  className="text-zinc-400 hover:text-zinc-200 text-xs truncate block"
                >
                  {link.url}
                </a>
              </div>
              <Link2 className="size-5 text-zinc-400 hover:text-zinc-200 flex-shrink-0" />
            </div>
          ))}
      </div>

      <Button onClick={() => {}}>
        <Plus className="size-5 text-sky-950 font-bold" />
        Cadastrar novo link
      </Button>
    </div>
  );
}
