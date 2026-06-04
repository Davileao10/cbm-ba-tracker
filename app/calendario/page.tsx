"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

interface Estudo {
  data: string;
  materia: string;
  horas: number;
  questoes: number;
  observacao: string;
}

export default function Calendario() {
  const [diasEstudados, setDiasEstudados] =
    useState<string[]>([]);

  useEffect(() => {
    const estudos =
      localStorage.getItem("estudos");

    if (!estudos) return;

    const registros: Estudo[] =
      JSON.parse(estudos);

    const datasUnicas = [
      ...new Set(
        registros.map(
          (e) => e.data
        )
      ),
    ];

    setDiasEstudados(
      datasUnicas
    );
  }, []);

  const hoje = new Date();

  const ano =
    hoje.getFullYear();

  const mes =
    hoje.getMonth();

  const diasNoMes =
    new Date(
      ano,
      mes + 1,
      0
    ).getDate();

  const dias = [];

  for (
    let dia = 1;
    dia <= diasNoMes;
    dia++
  ) {
    const data =
      `${ano}-${String(
        mes + 1
      ).padStart(2, "0")}-${String(
        dia
      ).padStart(2, "0")}`;

    const estudou =
      diasEstudados.includes(
        data
      );

    dias.push(
      <div
        key={data}
        className={`
          w-10
          h-10
          rounded
          flex
          items-center
          justify-center
          text-sm
          ${
            estudou
              ? "bg-green-500"
              : "bg-zinc-800"
          }
        `}
      >
        {dia}
      </div>
    );
  }

  return (
    <div className="flex bg-zinc-950 text-white min-h-screen">

      <Sidebar />

      <main className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-8">
          📅 Calendário de Estudos
        </h1>

        <div className="bg-zinc-900 p-6 rounded-xl">

          <h2 className="text-xl mb-6">
            Dias estudados neste mês
          </h2>

          <div className="grid grid-cols-7 gap-3">

            {dias}

          </div>

        </div>

      </main>

    </div>
  );
}