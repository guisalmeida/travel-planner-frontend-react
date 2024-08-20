import { CircleCheck, Plus } from "lucide-react";
import { Button } from "../button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type Activity = {
  date: string;
  activities: {
    id: string;
    title: string;
    occurs_at: string;
    trip_id: string;
  }[];
};

type ActivitiesListProps = {
  toogleCreateActivityModal: (value: boolean) => void;
};

export function ActivitiesList({
  toogleCreateActivityModal,
}: ActivitiesListProps) {
  const { tripId } = useParams();
  const [activities, setActivities] = useState<Activity[] | undefined>();

  useEffect(() => {
    api
      .get(`/trips/${tripId}/activities`)
      .then((response) => setActivities(response.data.activities));
  }, [tripId]);

  return (
    <section className="flex-1 space-y-6">
      <div className="flex justify-between">
        <h1 className="font-semibold text-3xl text-zinc-50">Atividades</h1>
        <Button onClick={() => toogleCreateActivityModal(true)}>
          <Plus className="size-5" />
          Cadastrar atividade
        </Button>
      </div>

      <div className="space-y-8">
        {activities?.map((category, index) => (
          <div key={index} className="w-full space-y-2.5">
            <div className="flex gap-2 items-baseline">
              <h3 className="text-xl font-semibold text-zinc-300">
                Dia {format(category.date, "dd")}
              </h3>
              <span className="text-xs text-zinc-500">
                {format(category.date, "EEEE", { locale: ptBR })}
              </span>
            </div>

            {category.activities.length > 0 ? (
              <div className="flex flex-col gap-3">
                {category.activities.map((activity, index) => {
                  return (
                    <div key={index} className="bg-zinc-900 flex gap-3 py-2 px-4 rounded-xl shadow-shape items-center">
                      <CircleCheck className="size-5 text-lime-300" />
                      <p className="text-zinc-100">{activity.title}</p>
                      <p className="ml-auto text-zinc-400 text-sm">
                        {format(activity.occurs_at, "HH:mm")}h
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>
                <p className="text-zinc-500 text-sm">
                  Nenhuma atividade cadastrada nessa data.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
