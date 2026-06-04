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

interface Semana {
  semana: string;
  percentual: number;
  concluidas: number;
  total: number;
}

export default function Historico() {

  const [historico, setHistorico] =
    useState<Semana[]>([]);

  useEffect(() => {

    const dados =
      localStorage.getItem(
        "historicoCronograma"
      );

    if (dados) {

      setHistorico(
        JSON.parse(dados)
      );

    }

  }, []);

  return (

    <div className="flex bg-zinc-950 text-white min-h-screen">

      <Sidebar />

      <main className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-8">
          📈 Histórico Semanal
        </h1>

        <div className="bg-zinc-900 p-6 rounded-xl mb-8">

          <h2 className="text-2xl font-bold mb-4">
            Evolução
          </h2>

          <div className="h-80">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart
                data={historico}
              >

                <XAxis
                  dataKey="semana"
                />

                <YAxis
                  domain={[0, 100]}
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

          {historico.length === 0 && (

            <div className="bg-zinc-900 p-5 rounded-xl">
              Nenhum histórico ainda.
            </div>

          )}

          {historico.map(
            (
              semana,
              index
            ) => (

              <div
                key={index}
                className="bg-zinc-900 p-5 rounded-xl"
              >

                <h2 className="text-xl font-bold">
                  {semana.semana}
                </h2>

                <p>
                  Concluídas:
                  {" "}
                  {semana.concluidas}
                  /
                  {semana.total}
                </p>

                <p>
                  Aproveitamento:
                  {" "}
                  {semana.percentual}%
                </p>

              </div>

            )
          )}

        </div>

      </main>

    </div>

  );
}