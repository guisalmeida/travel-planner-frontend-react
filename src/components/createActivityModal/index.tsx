import { Calendar, Tag } from "lucide-react";
import { Button } from "../button";
import { Modal } from "../modal";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { FormEvent } from "react";

type CreateActivityModalProps = {
  toogleCreateActivityModal: (value: boolean) => void;
};

export function CreateActivityModal({
  toogleCreateActivityModal,
}: CreateActivityModalProps) {
  const { tripId } = useParams();

  async function createActivity(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const activity = data.get("activity");
    const activityTime = data.get("acitivity-time");

    const options = {
      title: activity,
      occurs_at: activityTime,
    };

    await api.post(`/trips/${tripId}/activities`, options);
    toogleCreateActivityModal(false);
  }

  return (
    <Modal toogleFn={toogleCreateActivityModal}>
      <div className="shadow-shape bg-zinc-900 py-5 px-6 rounded-xl space-y-5 w-[640px] relative">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Cadastrar atividade</h3>
          <p className="text-zinc-400 text-sm">
            Todos convidados podem visualizar as atividades.
          </p>
        </div>

        <form className="flex flex-col gap-2" onSubmit={createActivity}>
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg flex items-center p-4 gap-2 w-full">
            <Tag className="size-5 text-zinc-400" />
            <input
              type="text"
              name="activity"
              className="bg-transparent text-lg placeholder-zinc-400 flex-1 text-zinc-400"
              placeholder="Qual a atividade?"
            />
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-lg flex items-center p-4 gap-2 w-full">
            <Calendar className="size-5 text-zinc-400" />
            <input
              type="datetime-local"
              name="acitivity-time"
              className="bg-transparent text-lg placeholder-zinc-400 flex-1 text-zinc-400"
            />
          </div>

          <Button sizeVariant="full">Salvar atividade</Button>
        </form>
      </div>
    </Modal>
  );
}
