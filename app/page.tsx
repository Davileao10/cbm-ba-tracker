"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function Home() {

  const [questoesResolvidas, setQuestoesResolvidas] = useState(0);
  const [aproveitamento, setAproveitamento] = useState("0");

  const [tarefasConcluidas, setTarefasConcluidas] = useState(0);

  const [streak, setStreak] = useState(0);

  const [revisoesPendentes, setRevisoesPendentes] =
    useState(0);

  const [mediaSimulados, setMediaSimulados] =
    useState("0");

  const totalTarefas = 20;

  useEffect(() => {

    // QUESTÕES

    const questoesSalvas =
      localStorage.getItem("questoes");

    if (questoesSalvas) {

      const historico =
        JSON.parse(questoesSalvas);

      const totalQuestoes =
        historico.reduce(
          (acc: number, item: any) =>
            acc + item.questoes,
          0
        );

      const totalAcertos =
        historico.reduce(
          (acc: number, item: any) =>
            acc + item.acertos,
          0
        );

      setQuestoesResolvidas(
        totalQuestoes
      );

      const percentual =
        totalQuestoes > 0
          ? (
              (totalAcertos /
                totalQuestoes) *
              100
            ).toFixed(1)
          : "0";

      setAproveitamento(
        percentual
      );
    }

    // CRONOGRAMA

    const cronograma =
      localStorage.getItem(
        "cronograma"
      );

    if (cronograma) {

      const dados =
        JSON.parse(
          cronograma
        );

      const concluidas =
        Object.values(
          dados.tarefas || {}
        )
          .filter(Boolean)
          .length;

      setTarefasConcluidas(
        concluidas
      );

    }

    // STREAK

    const estudos =
      localStorage.getItem(
        "estudos"
      );

    if (estudos) {

      const registros =
        JSON.parse(estudos);

      const datasUnicas = [
        ...new Set(
          registros.map(
            (e: any) => e.data
          )
        )
      ];

      setStreak(
        datasUnicas.length
      );
    }

    // REVISÕES

    const revisoes =
      localStorage.getItem(
        "revisoesConcluidas"
      );

    if (revisoes) {

      const lista =
        JSON.parse(
          revisoes
        );

      setRevisoesPendentes(
        lista.length
      );

    }

    // SIMULADOS

    const simulados =
      localStorage.getItem(
        "simulados"
      );

    if (simulados) {

      const historico =
        JSON.parse(
          simulados
        );

      if (
        historico.length > 0
      ) {

        const media =
          (
            historico.reduce(
              (
                acc: number,
                item: any
              ) =>
                acc +
                (
                  item.acertos /
                  item.questoes
                ) *
                  100,
              0
            ) /
            historico.length
          ).toFixed(1);

        setMediaSimulados(
          media
        );

      }

    }

  }, []);

  const progresso =
    (tarefasConcluidas /
      totalTarefas) *
    100;

  const indiceCBM =
    Math.min(
      100,

      (
        Number(
          aproveitamento
        ) *
          0.4 +

        progresso *
          0.3 +

        Number(
          mediaSimulados
        ) *
          0.2 +

        Math.min(
          streak,
          30
        ) *
          0.33
      )
    );

  return (

    <div className="flex bg-zinc-950 text-white min-h-screen">

      <Sidebar />

      <main className="flex-1 p-8">

        <h1 className="text-5xl font-bold mb-8">
          🚒 Rumo ao CBM-BA
        </h1>

        <div className="grid grid-cols-4 gap-4">

          <Card
            titulo="Questões Resolvidas"
            valor={questoesResolvidas}
          />

          <Card
            titulo="Aproveitamento"
            valor={`${aproveitamento}%`}
          />

          <Card
            titulo="Tarefas Concluídas"
            valor={tarefasConcluidas}
          />

          <Card
            titulo="Progresso Semanal"
            valor={`${progresso.toFixed(0)}%`}
          />

          <Card
            titulo="🔥 Streak"
            valor={`${streak} dias`}
          />

          <Card
            titulo="📚 Revisões"
            valor={revisoesPendentes}
          />

          <Card
            titulo="🎯 Simulados"
            valor={`${mediaSimulados}%`}
          />

          <Card
            titulo="🏆 Índice CBM"
            valor={indiceCBM.toFixed(0)}
          />

        </div>

        <div className="mt-10 bg-zinc-900 p-6 rounded-xl">

          <h2 className="text-2xl font-bold mb-4">
            Progresso Geral
          </h2>

          <div className="w-full bg-zinc-700 h-6 rounded-full">

            <div
              className="bg-green-500 h-6 rounded-full"
              style={{
                width: `${progresso}%`
              }}
            />

          </div>

          <p className="mt-3">
            {tarefasConcluidas}
            {" de "}
            {totalTarefas}
            {" tarefas concluídas"}
          </p>

        </div>

      </main>

    </div>

  );
}

function Card({
  titulo,
  valor
}: {
  titulo: string;
  valor: string | number;
}) {

  return (

    <div className="bg-zinc-900 rounded-xl p-6">

      <h2 className="text-zinc-400">
        {titulo}
      </h2>

      <p className="text-4xl font-bold">
        {valor}
      </p>

    </div>

  );
}