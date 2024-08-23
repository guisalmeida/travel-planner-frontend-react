import { Plus, SquareArrowOutUpRight } from "lucide-react";
import { Button } from "../button";

export type Link = {
  id: string;
  title: string;
  url: string;
  trip_id: string;
};

type LinksListProps = {
  links?: Link[];
  toogleCreateLinkModal: (value: boolean) => void;
};

export function LinksList({ links, toogleCreateLinkModal }: LinksListProps) {
  return (
    <div className="flex w-full flex-col space-y-6">
      <h2 className="text-xl text-zinc-50 font-semibold">Links importantes</h2>
      <div className="space-y-5">
        {links && links.length > 0 ? (
          links.map((link) => (
            <a href={link.url} key={link.id} target="_blank">
              <div className="flex items-center justify-between hover:bg-zinc-900 rounded py-1 px-2">
                <div className="space-y-1.5">
                  <p className="text-zinc-100 font-medium capitalize">
                    {link.title}
                  </p>
                  <p className="text-zinc-400 font-medium text-xs truncate block">
                    {link.url}
                  </p>
                </div>
                <SquareArrowOutUpRight className="size-5 text-zinc-400 flex-shrink-0" />
              </div>
            </a>
          ))
        ) : (
          <p className="text-zinc-400 font-medium text-xs truncate block">
            Nenhum link cadastrado.
          </p>
        )}
      </div>

      <Button onClick={() => toogleCreateLinkModal(true)}>
        <Plus className="size-5 text-sky-950 font-bold" />
        Cadastrar novo link
      </Button>
    </div>
  );
}
