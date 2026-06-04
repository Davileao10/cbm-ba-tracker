"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface Questao {
  materia: string;
  questoes: number;
  acertos: number;
}

interface GraficoMateria {
  materia: string;
  questoes: number;
}

export default function Graficos() {
  const [dados, setDados] = useState<GraficoMateria[]>([]);

  useEffect(() => {
    const questoesSalvas =
      localStorage.getItem("questoes");

    if (!questoesSalvas) return;

    const registros: Questao[] =
      JSON.parse(questoesSalvas);

    const agrupado: Record<
      string,
      number
    > = {};

    registros.forEach((item) => {
      agrupado[item.materia] =
        (agrupado[item.materia] || 0) +
        item.questoes;
    });

    const resultado =
      Object.entries(agrupado).map(
        ([materia, questoes]) => ({
          materia,
          questoes,
        })
      );

    setDados(resultado);
  }, []);

  const cores = [
    "#22c55e",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
  ];

  return (
    <div className="flex bg-zinc-950 text-white min-h-screen">

      <Sidebar />

      <main className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-8">
          📊 Gráficos
        </h1>

        <div className="grid grid-cols-2 gap-6">

          <div className="bg-zinc-900 rounded-xl p-6">

            <h2 className="text-xl font-bold mb-4">
              Questões por Matéria
            </h2>

            <div className="h-80">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <BarChart data={dados}>
                  <XAxis dataKey="materia" />
                  <YAxis />
                  <Tooltip />

                  <Bar dataKey="questoes" />
                </BarChart>
              </ResponsiveContainer>

            </div>

          </div>

          <div className="bg-zinc-900 rounded-xl p-6">

            <h2 className="text-xl font-bold mb-4">
              Distribuição de Questões
            </h2>

            <div className="h-80">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>

                  <Pie
                    data={dados}
                    dataKey="questoes"
                    nameKey="materia"
                    outerRadius={100}
                    label
                  >

                    {dados.map(
                      (_, index) => (
                        <Cell
                          key={index}
                          fill={
                            cores[
                              index %
                                cores.length
                            ]
                          }
                        />
                      )
                    )}

                  </Pie>

                  <Tooltip />

                </PieChart>
              </ResponsiveContainer>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}