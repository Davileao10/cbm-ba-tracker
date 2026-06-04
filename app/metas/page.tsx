"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function Metas() {

  const META_QUESTOES = 400;
  const META_HORAS = 15;

  const [questoes, setQuestoes] =
    useState(0);

  const [horas, setHoras] =
    useState(0);

  useEffect(() => {

    const questoesSalvas =
      localStorage.getItem("questoes");

    if (questoesSalvas) {

      const registros =
        JSON.parse(questoesSalvas);

      const total =
        registros.reduce(
          (acc: number, item: any) =>
            acc + item.questoes,
          0
        );

      setQuestoes(total);

    }

    const estudosSalvos =
      localStorage.getItem("estudos");

    if (estudosSalvos) {

      const registros =
        JSON.parse(estudosSalvos);

      const totalHoras =
        registros.reduce(
          (acc: number, item: any) =>
            acc + item.horas,
          0
        );

      setHoras(totalHoras);

    }

  }, []);

  const progressoQuestoes =
    Math.min(
      (questoes /
        META_QUESTOES) *
        100,
      100
    );

  const progressoHoras =
    Math.min(
      (horas /
        META_HORAS) *
        100,
      100
    );

  return (

    <div className="flex bg-zinc-950 text-white min-h-screen">

      <Sidebar />

      <main className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-8">
          Metas
        </h1>

        <div className="bg-zinc-900 p-6 rounded-xl mb-8">

          <h2 className="text-xl mb-3">
            Meta de Questões
          </h2>

          <div className="w-full bg-zinc-700 h-6 rounded-full">

            <div
              className="bg-green-500 h-6 rounded-full"
              style={{
                width:
                  `${progressoQuestoes}%`
              }}
            />

          </div>

          <p className="mt-2">

            {questoes} / {META_QUESTOES}
            {" "}
            questões

          </p>

        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">

          <h2 className="text-xl mb-3">
            Meta de Horas
          </h2>

          <div className="w-full bg-zinc-700 h-6 rounded-full">

            <div
              className="bg-blue-500 h-6 rounded-full"
              style={{
                width:
                  `${progressoHoras}%`
              }}
            />

          </div>

          <p className="mt-2">

            {horas}h / {META_HORAS}h

          </p>

        </div>

      </main>

    </div>
  );
}