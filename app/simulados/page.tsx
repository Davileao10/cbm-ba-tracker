"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

interface Simulado {
  data: string;
  questoes: number;
  acertos: number;
  tempo: string;
}

export default function Simulados() {

  const [questoes, setQuestoes] =
    useState("");

  const [acertos, setAcertos] =
    useState("");

  const [tempo, setTempo] =
    useState("");

  const [historico, setHistorico] =
    useState<Simulado[]>([]);

  useEffect(() => {

    const dados =
      localStorage.getItem(
        "simulados"
      );

    if (dados) {
      setHistorico(
        JSON.parse(dados)
      );
    }

  }, []);

  function salvar() {

    if (
      !questoes ||
      !acertos
    ) {
      alert(
        "Preencha questões e acertos"
      );
      return;
    }

    const novo: Simulado = {

      data:
        new Date()
          .toLocaleDateString(
            "pt-BR"
          ),

      questoes:
        Number(questoes),

      acertos:
        Number(acertos),

      tempo

    };

    const novoHistorico = [
      ...historico,
      novo
    ];

    setHistorico(
      novoHistorico
    );

    localStorage.setItem(
      "simulados",
      JSON.stringify(
        novoHistorico
      )
    );

    setQuestoes("");
    setAcertos("");
    setTempo("");
  }

  function excluir(
    index: number
  ) {

    const novoHistorico =
      historico.filter(
        (_, i) =>
          i !== index
      );

    setHistorico(
      novoHistorico
    );

    localStorage.setItem(
      "simulados",
      JSON.stringify(
        novoHistorico
      )
    );

  }

  const resultados =
    historico.map(
      (item) => ({
        ...item,
        percentual:
          Number(
            (
              (item.acertos /
                item.questoes) *
              100
            ).toFixed(1)
          )
      })
    );

  const media =
    resultados.length > 0
      ? (
          resultados.reduce(
            (
              acc,
              item
            ) =>
              acc +
              item.percentual,
            0
          ) /
          resultados.length
        ).toFixed(1)
      : "0";

  const melhor =
    resultados.length > 0
      ? resultados.reduce(
          (
            maior,
            atual
          ) =>
            atual.percentual >
            maior.percentual
              ? atual
              : maior
        )
      : null;

  const pior =
    resultados.length > 0
      ? resultados.reduce(
          (
            menor,
            atual
          ) =>
            atual.percentual <
            menor.percentual
              ? atual
              : menor
        )
      : null;

  const ultimo =
    resultados.length > 0
      ? resultados[
          resultados.length - 1
        ]
      : null;

  return (

    <div className="flex bg-zinc-950 text-white min-h-screen">

      <Sidebar />

      <main className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-8">
          🎯 Simulados
        </h1>

        <div className="bg-zinc-900 p-6 rounded-xl mb-8">

          <div className="grid grid-cols-3 gap-4">

            <input
              type="number"
              placeholder="Questões"
              className="bg-zinc-800 p-3 rounded"
              value={questoes}
              onChange={(e) =>
                setQuestoes(
                  e.target.value
                )
              }
            />

            <input
              type="number"
              placeholder="Acertos"
              className="bg-zinc-800 p-3 rounded"
              value={acertos}
              onChange={(e) =>
                setAcertos(
                  e.target.value
                )
              }
            />

            <input
              placeholder="Tempo"
              className="bg-zinc-800 p-3 rounded"
              value={tempo}
              onChange={(e) =>
                setTempo(
                  e.target.value
                )
              }
            />

          </div>

          <button
            onClick={salvar}
            className="mt-4 bg-green-600 px-5 py-2 rounded"
          >
            Salvar Simulado
          </button>

        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">

          <div className="bg-zinc-900 p-5 rounded-xl">
            <h2>Média</h2>
            <p className="text-3xl font-bold">
              {media}%
            </p>
          </div>

          <div className="bg-zinc-900 p-5 rounded-xl">
            <h2>Melhor</h2>
            <p className="text-3xl font-bold">
              {melhor?.percentual ?? 0}%
            </p>
          </div>

          <div className="bg-zinc-900 p-5 rounded-xl">
            <h2>Pior</h2>
            <p className="text-3xl font-bold">
              {pior?.percentual ?? 0}%
            </p>
          </div>

          <div className="bg-zinc-900 p-5 rounded-xl">
            <h2>Último</h2>
            <p className="text-3xl font-bold">
              {ultimo?.percentual ?? 0}%
            </p>
          </div>

        </div>

        <div className="bg-zinc-900 p-6 rounded-xl mb-8">

          <h2 className="text-2xl font-bold mb-4">
            Evolução dos Simulados
          </h2>

          <div className="h-80">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart
                data={resultados}
              >

                <XAxis
                  dataKey="data"
                />

                <YAxis
                  domain={[
                    0,
                    100
                  ]}
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="percentual"
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        <div className="space-y-4">

          {resultados.map(
            (
              item,
              index
            ) => (

              <div
                key={index}
                className="bg-zinc-900 p-5 rounded-xl flex justify-between"
              >

                <div>

                  <h2 className="text-xl font-bold">
                    {item.data}
                  </h2>

                  <p>
                    Questões:
                    {" "}
                    {item.questoes}
                  </p>

                  <p>
                    Acertos:
                    {" "}
                    {item.acertos}
                  </p>

                  <p>
                    Aproveitamento:
                    {" "}
                    {item.percentual}%
                  </p>

                  <p>
                    Tempo:
                    {" "}
                    {item.tempo}
                  </p>

                </div>

                <button
                  onClick={() =>
                    excluir(
                      index
                    )
                  }
                  className="bg-red-600 px-4 py-2 rounded h-fit"
                >
                  Excluir
                </button>

              </div>

            )
          )}

        </div>

      </main>

    </div>

  );
}