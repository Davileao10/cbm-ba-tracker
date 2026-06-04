"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function Streak() {
  const [dias, setDias] = useState(0);

  useEffect(() => {
    const estudos = localStorage.getItem("estudos");

    if (!estudos) return;

    const registros = JSON.parse(estudos);

    const datasUnicas: string[] = [
      ...new Set<string>(
        registros.map(
          (e: { data: string }) => e.data
        )
      ),
    ];

    if (datasUnicas.length === 0) {
      setDias(0);
      return;
    }

    datasUnicas.sort();

    let streak = 1;

    for (
      let i = datasUnicas.length - 1;
      i > 0;
      i--
    ) {
      const atual = new Date(
        datasUnicas[i]
      );

      const anterior = new Date(
        datasUnicas[i - 1]
      );

      const diferenca =
        (
          atual.getTime() -
          anterior.getTime()
        ) /
        (1000 * 60 * 60 * 24);

      if (diferenca === 1) {
        streak++;
      } else {
        break;
      }
    }

    setDias(streak);
  }, []);

  let mensagem =
    "Começando a jornada 🚀";

  if (dias >= 30) {
    mensagem =
      "Lenda do CBM-BA 🔥";
  } else if (dias >= 15) {
    mensagem =
      "Consistência excelente 🚀";
  } else if (dias >= 7) {
    mensagem =
      "Você está criando hábito 💪";
  } else if (dias >= 3) {
    mensagem =
      "Bom começo 👏";
  }

  return (
    <div className="flex bg-zinc-950 text-white min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">
          🔥 Streak de Estudos
        </h1>

        <div className="bg-zinc-900 rounded-xl p-8">
          <p className="text-7xl font-bold mb-4">
            🔥 {dias}
          </p>

          <p className="text-2xl">
            dias consecutivos
          </p>

          <p className="mt-6 text-zinc-400">
            {mensagem}
          </p>
        </div>
      </main>
    </div>
  );
}