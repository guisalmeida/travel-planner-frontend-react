import { Link, Tag } from "lucide-react";
import { Button } from "../button";
import { Modal } from "../modal";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { FormEvent } from "react";

type CreateLinkModalProps = {
  toogleCreateLinkModal: (value: boolean) => void;
};

export function CreateLinkModal({
  toogleCreateLinkModal,
}: CreateLinkModalProps) {
  const { tripId } = useParams();

  async function createLink(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const linkTitle = data.get("link-title");
    const linkUrl = data.get("link-url");

    const options = {
      title: linkTitle,
      url: linkUrl,
    };

    await api.post(`/trips/${tripId}/links`, options);
    toogleCreateLinkModal(false);
  }

  return (
    <Modal toogleFn={toogleCreateLinkModal}>
      <div className="shadow-shape bg-zinc-900 py-5 px-6 rounded-xl space-y-5 w-[640px] relative">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Cadastrar link</h3>
          <p className="text-zinc-400 text-sm">
            Todos convidados podem visualizar os links importantes.
          </p>
        </div>

        <form className="flex flex-col gap-2" onSubmit={createLink}>
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg flex items-center p-4 gap-2 w-full">
            <Tag className="size-5 text-zinc-400" />
            <input
              type="text"
              name="link-title"
              className="bg-transparent text-lg placeholder-zinc-400 flex-1 text-zinc-400"
              placeholder="Título do link"
              />
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-lg flex items-center p-4 gap-2 w-full">
            <Link className="size-5 text-zinc-400" />
            <input
              type="url"
              name="link-url"
              className="bg-transparent text-lg placeholder-zinc-400 flex-1 text-zinc-400"
              placeholder="Insira URL"
            />
          </div>

          <Button sizeVariant="full">Salvar link</Button>
        </form>
      </div>
    </Modal>
  );
}
