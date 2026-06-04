"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const [questoesResolvidas, setQuestoesResolvidas] = useState(0);
  const [aproveitamento, setAproveitamento] = useState("0");
  const [tarefasConcluidas, setTarefasConcluidas] = useState(0);
  const [missoesHoje, setMissoesHoje] = useState<string[]>([]);
  const [jornadaCBM, setJornadaCBM] = useState(0);

  useEffect(() => {
    const questoesSalvas =
      localStorage.getItem("questoes");

    const cronogramaSalvo =
      localStorage.getItem("cronograma");

    let notaCronograma = 0;

    // QUESTÕES

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

      setAproveitamento(percentual);
    }

    // CRONOGRAMA

    if (cronogramaSalvo) {
      const dados =
        JSON.parse(cronogramaSalvo);

      const concluidas =
        Object.values(
          dados.tarefas || {}
        )
          .filter(Boolean)
          .length;

      setTarefasConcluidas(
        concluidas
      );

      notaCronograma =
        (concluidas / 20) * 100;
    }

    // JORNADA CBM - 36 SEMANAS

    const TOTAL_SEMANAS = 36;

    const historicoCronograma =
      JSON.parse(
        localStorage.getItem(
          "historicoCronograma"
        ) || "[]"
      );

    let somaPercentuais = 0;

    historicoCronograma.forEach(
      (semana: any) => {
        somaPercentuais +=
          semana.percentual;
      }
    );

    somaPercentuais +=
      notaCronograma;

    const jornada =
      (
        somaPercentuais /
        (TOTAL_SEMANAS * 100)
      ) * 100;

    setJornadaCBM(
      Number(
        jornada.toFixed(1)
      )
    );

    // MISSÕES DO DIA

    const diasSemana = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ];

    const hoje =
      diasSemana[new Date().getDay()];

    const cronogramaSemanal = {
      Segunda: [
        "Português",
        "Direito Constitucional",
        "50 Questões",
      ],

      Terça: [
        "Matemática",
        "Informática",
        "50 Questões",
      ],

      Quarta: [
        "Direito Penal",
        "Português",
        "50 Questões",
      ],

      Quinta: [
        "Direito Administrativo",
        "Direitos Humanos",
        "50 Questões",
      ],

      Sexta: [
        "Matemática",
        "Informática",
        "50 Questões",
      ],

      Sábado: [
        "Direito Penal Militar",
        "Processual Penal Militar",
        "80 Questões",
      ],

      Domingo: [
        "Simulado",
        "Revisão",
      ],
    };

    const tarefasHoje =
      cronogramaSemanal[
        hoje as keyof typeof cronogramaSemanal
      ] || [];

    let tarefasPendentes =
      [...tarefasHoje];

    if (cronogramaSalvo) {
      const dados =
        JSON.parse(
          cronogramaSalvo
        );

      const tarefas =
        dados.tarefas || {};

      tarefasPendentes =
        tarefasHoje.filter(
          (item) => {
            const id =
              `${hoje}-${item}`;

            return !tarefas[id];
          }
        );
    }

    setMissoesHoje(
      tarefasPendentes
    );

  }, []);

  const progresso =
    jornadaCBM;

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">

      <Sidebar />

      <main className="flex-1 p-8">

        <div className="mb-8">

          <p className="text-red-500 font-medium">
            Bem-vindo
          </p>

          <div className="flex items-center gap-4">

            <img
              src="/icon-512.png"
              alt="CBM-BA"
              className="w-14 h-14 rounded-xl"
            />

            <h1 className="text-5xl font-bold">
              Rumo ao CBM-BA
            </h1>

          </div>

          <p className="text-zinc-400 mt-2">
            Seu centro de comando para aprovação.
          </p>

        </div>

        {/* CARDS PRINCIPAIS */}

        <div className="grid grid-cols-4 gap-5 mb-6">

          <div className="card-premium rounded-2xl p-6">
            <p className="text-zinc-400">
              Questões Resolvidas
            </p>

            <h2 className="text-5xl font-bold mt-3">
              {questoesResolvidas}
            </h2>
          </div>

          <div className="card-premium rounded-2xl p-6">
            <p className="text-zinc-400">
              Aproveitamento
            </p>

            <h2 className="text-5xl font-bold mt-3 text-green-400">
              {aproveitamento}%
            </h2>
          </div>

          <div className="card-premium rounded-2xl p-6">
            <p className="text-zinc-400">
              Tarefas
            </p>

            <h2 className="text-5xl font-bold mt-3">
              {tarefasConcluidas}
            </h2>
          </div>

          <div className="card-premium rounded-2xl p-6">
            <p className="text-zinc-400">
              Progresso
            </p>

            <h2 className="text-5xl font-bold mt-3 text-red-500">
              {progresso}%
            </h2>
          </div>

        </div>

        {/* CARDS SECUNDÁRIOS */}

        <div className="grid grid-cols-4 gap-5 mb-8">

          <div className="card-premium rounded-2xl p-6">
            <p className="text-orange-400">
              🔥 Streak
            </p>

            <h3 className="text-4xl font-bold mt-2">
              0 dias
            </h3>
          </div>

          <div className="card-premium rounded-2xl p-6">
            <p className="text-cyan-400">
              📚 Revisões
            </p>

            <h3 className="text-4xl font-bold mt-2">
              0
            </h3>
          </div>

          <div className="card-premium rounded-2xl p-6">
            <p className="text-pink-400">
              🎯 Simulados
            </p>

            <h3 className="text-4xl font-bold mt-2">
              0%
            </h3>
          </div>

          <div className="card-premium rounded-2xl p-6">
            <p className="text-yellow-400">
              🎯 Jornada CBM
            </p>

            <h3 className="text-4xl font-bold mt-2">
              {jornadaCBM}%
            </h3>
          </div>

        </div>

        {/* PAINEL INFERIOR */}

        <div className="grid grid-cols-3 gap-6">

          <div className="col-span-2 card-premium rounded-2xl p-8">

            <h2 className="text-2xl font-bold mb-5">
              Jornada até Aprovação
            </h2>

            <div className="w-full h-5 bg-zinc-800 rounded-full">

              <div
                className="h-5 rounded-full bg-gradient-to-r from-red-600 to-red-400"
                style={{
                  width: `${progresso}%`,
                }}
              />

            </div>

            <p className="mt-4 text-zinc-400">
              Jornada total concluída:
              {" "}
              {jornadaCBM}%
            </p>

          </div>

          <div className="card-premium rounded-2xl p-8">

            <h2 className="text-2xl font-bold mb-4">
              🎯 Missões de Hoje
            </h2>

            <div className="space-y-3">

              {missoesHoje.length > 0 ? (

                missoesHoje.map((missao) => (

                  <div
                    key={missao}
                    className="
                      bg-zinc-800
                      rounded-xl
                      p-4
                      border
                      border-zinc-700
                      hover:border-red-500
                      transition-all
                    "
                  >

                    <p className="font-semibold">
                      {missao}
                    </p>

                  </div>

                ))

              ) : (

                <div
                  className="
                    bg-green-900/30
                    border
                    border-green-500
                    rounded-xl
                    p-4
                  "
                >

                  <p className="font-semibold text-green-400">
                    🏆 Todas as missões do dia concluídas
                  </p>

                </div>

              )}

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}