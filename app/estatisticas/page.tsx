"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

interface Questao {
  materia: string;
  questoes: number;
  acertos: number;
  percentual: string;
}

interface Estatistica {
  materia: string;
  questoes: number;
  acertos: number;
  percentual: number;
}

export default function Estatisticas() {

  const [dados, setDados] =
    useState<Estatistica[]>([]);

  useEffect(() => {

    const questoesSalvas =
      localStorage.getItem("questoes");

    if (!questoesSalvas) return;

    const registros: Questao[] =
      JSON.parse(questoesSalvas);

    const agrupado:
      Record<
        string,
        {
          questoes: number;
          acertos: number;
        }
      > = {};

    registros.forEach((item) => {

      if (!agrupado[item.materia]) {

        agrupado[item.materia] = {
          questoes: 0,
          acertos: 0
        };

      }

      agrupado[item.materia]
        .questoes += item.questoes;

      agrupado[item.materia]
        .acertos += item.acertos;

    });

    const resultado =
      Object.entries(agrupado)
        .map(([materia, valores]) => ({

          materia,

          questoes:
            valores.questoes,

          acertos:
            valores.acertos,

          percentual:
            Number(
              (
                (valores.acertos /
                  valores.questoes) *
                100
              ).toFixed(1)
            )

        }))
        .sort(
          (a, b) =>
            b.percentual -
            a.percentual
        );

    setDados(resultado);

  }, []);

  const melhor =
    dados.length > 0
      ? dados[0]
      : null;

  const pior =
    dados.length > 0
      ? dados[dados.length - 1]
      : null;

  return (

    <div className="flex bg-zinc-950 text-white min-h-screen">

      <Sidebar />

      <main className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-8">
          Estatísticas
        </h1>

        <div className="grid grid-cols-2 gap-4 mb-8">

          <div className="bg-zinc-900 p-6 rounded-xl">

            <h2 className="text-green-400 mb-2">
              🟢 Melhor Matéria
            </h2>

            <p className="text-2xl font-bold">
              {melhor?.materia || "-"}
            </p>

            <p>
              {melhor?.percentual || 0}%
            </p>

          </div>

          <div className="bg-zinc-900 p-6 rounded-xl">

            <h2 className="text-red-400 mb-2">
              🔴 Pior Matéria
            </h2>

            <p className="text-2xl font-bold">
              {pior?.materia || "-"}
            </p>

            <p>
              {pior?.percentual || 0}%
            </p>

          </div>

        </div>

        <div className="bg-zinc-900 rounded-xl overflow-hidden">

          <table className="w-full">

            <thead>

              <tr className="bg-zinc-800">

                <th className="p-4 text-left">
                  Matéria
                </th>

                <th className="p-4 text-left">
                  Questões
                </th>

                <th className="p-4 text-left">
                  Acertos
                </th>

                <th className="p-4 text-left">
                  Aproveitamento
                </th>

              </tr>

            </thead>

            <tbody>

              {dados.map((item) => (

                <tr
                  key={item.materia}
                  className="border-t border-zinc-800"
                >

                  <td className="p-4">
                    {item.materia}
                  </td>

                  <td className="p-4">
                    {item.questoes}
                  </td>

                  <td className="p-4">
                    {item.acertos}
                  </td>

                  <td className="p-4">
                    {item.percentual}%
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </main>

    </div>
  );
}