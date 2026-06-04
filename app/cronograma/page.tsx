"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

const cronograma = {
  Segunda: [
    "Português",
    "Direito Constitucional",
    "50 Questões"
  ],

  Terça: [
    "Matemática",
    "Informática",
    "50 Questões"
  ],

  Quarta: [
    "Direito Penal",
    "Português",
    "50 Questões"
  ],

  Quinta: [
    "Direito Administrativo",
    "Direitos Humanos",
    "50 Questões"
  ],

  Sexta: [
    "Matemática",
    "Informática",
    "50 Questões"
  ],

  Sábado: [
    "Direito Penal Militar",
    "Processual Penal Militar",
    "80 Questões"
  ],

  Domingo: [
    "Simulado",
    "Revisão"
  ]
};

function obterSemanaAtual() {

  const hoje = new Date();

  const inicioAno = new Date(
    hoje.getFullYear(),
    0,
    1
  );

  const dias =
    Math.floor(
      (
        hoje.getTime() -
        inicioAno.getTime()
      ) /
      86400000
    );

  const semana =
    Math.ceil(
      (dias +
        inicioAno.getDay() +
        1) /
      7
    );

  return `${hoje.getFullYear()}-W${semana}`;
}

export default function Cronograma() {

  const [concluidos, setConcluidos] =
    useState<Record<string, boolean>>(
      {}
    );

  const [semanaAtual, setSemanaAtual] =
    useState("");

  useEffect(() => {

    const semana =
      obterSemanaAtual();

    setSemanaAtual(semana);

    const dados =
      localStorage.getItem(
        "cronograma"
      );

    const totalTarefas =
      Object.values(cronograma)
        .flat()
        .length;

    if (!dados) {

      localStorage.setItem(
        "cronograma",
        JSON.stringify({
          semana,
          tarefas: {}
        })
      );

      return;
    }

    const cronogramaSalvo =
      JSON.parse(dados);

    if (
      cronogramaSalvo.semana !==
      semana
    ) {

      const tarefasConcluidas =
        Object.values(
          cronogramaSalvo.tarefas || {}
        ).filter(Boolean)
          .length;

      const percentual =
        Number(
          (
            (tarefasConcluidas /
              totalTarefas) *
            100
          ).toFixed(0)
        );

      const historico =
        JSON.parse(
          localStorage.getItem(
            "historicoCronograma"
          ) || "[]"
        );

      historico.push({
        semana:
          cronogramaSalvo.semana,
        concluidas:
          tarefasConcluidas,
        total:
          totalTarefas,
        percentual
      });

      localStorage.setItem(
        "historicoCronograma",
        JSON.stringify(
          historico
        )
      );

      const novoCronograma = {
        semana,
        tarefas: {}
      };

      localStorage.setItem(
        "cronograma",
        JSON.stringify(
          novoCronograma
        )
      );

      setConcluidos({});
    } else {

      setConcluidos(
        cronogramaSalvo.tarefas || {}
      );
    }

  }, []);

  const alternarTarefa = (
    id: string
  ) => {

    const novoEstado = {
      ...concluidos,
      [id]: !concluidos[id]
    };

    setConcluidos(
      novoEstado
    );

    localStorage.setItem(
      "cronograma",
      JSON.stringify({
        semana: semanaAtual,
        tarefas: novoEstado
      })
    );
  };

  const totalTarefas =
    Object.values(cronograma)
      .flat()
      .length;

  const tarefasConcluidas =
    Object.values(concluidos)
      .filter(Boolean)
      .length;

  const progresso =
    (tarefasConcluidas /
      totalTarefas) *
    100;

  return (

    <div className="flex bg-zinc-950 text-white min-h-screen">

      <Sidebar />

      <main className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-2">
          Cronograma Semanal
        </h1>

        <p className="text-zinc-400 mb-6">
          Semana: {semanaAtual}
        </p>

        <div className="mb-8">

          <div className="w-full bg-zinc-700 h-6 rounded-full">

            <div
              className="bg-green-500 h-6 rounded-full"
              style={{
                width: `${progresso}%`
              }}
            />

          </div>

          <p className="mt-2">

            {tarefasConcluidas}
            {" de "}
            {totalTarefas}
            {" tarefas concluídas ("}
            {progresso.toFixed(0)}
            {"%)"}

          </p>

        </div>

        {Object.entries(
          cronograma
        ).map(
          ([dia, tarefas]) => (

            <div
              key={dia}
              className="bg-zinc-900 p-5 rounded-xl mb-4"
            >

              <h2 className="text-2xl mb-3">
                {dia}
              </h2>

              {tarefas.map(
                (item) => {

                  const id =
                    `${dia}-${item}`;

                  return (

                    <div
                      key={id}
                      className="mb-2 flex items-center"
                    >

                      <input
                        type="checkbox"
                        checked={
                          concluidos[id] ||
                          false
                        }
                        onChange={() =>
                          alternarTarefa(
                            id
                          )
                        }
                      />

                      <span className="ml-3">
                        {item}
                      </span>

                    </div>

                  );
                }
              )}

            </div>

          )
        )}

      </main>

    </div>

  );
}