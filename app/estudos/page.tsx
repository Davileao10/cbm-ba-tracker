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

export default function Estudos() {

  const [data, setData] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [materia, setMateria] = useState("");
  const [horas, setHoras] = useState("");
  const [questoes, setQuestoes] = useState("");
  const [observacao, setObservacao] = useState("");

  const [historico, setHistorico] =
    useState<Estudo[]>([]);

  useEffect(() => {

    const dados =
      localStorage.getItem("estudos");

    if (dados) {
      setHistorico(JSON.parse(dados));
    }

  }, []);

  function salvarEstudo() {

    if (!materia) {
      alert("Selecione uma matéria");
      return;
    }

    const novoEstudo: Estudo = {

      data,

      materia,

      horas:
        Number(horas || 0),

      questoes:
        Number(questoes || 0),

      observacao

    };

    const novoHistorico = [
      novoEstudo,
      ...historico
    ];

    setHistorico(
      novoHistorico
    );

    localStorage.setItem(
      "estudos",
      JSON.stringify(
        novoHistorico
      )
    );

    setMateria("");
    setHoras("");
    setQuestoes("");
    setObservacao("");

  }

  function excluir(index: number) {

    const novoHistorico =
      historico.filter(
        (_, i) => i !== index
      );

    setHistorico(
      novoHistorico
    );

    localStorage.setItem(
      "estudos",
      JSON.stringify(
        novoHistorico
      )
    );

  }

  return (

    <div className="flex bg-zinc-950 text-white min-h-screen">

      <Sidebar />

      <main className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-8">
          Registro Diário
        </h1>

        <div className="bg-zinc-900 p-6 rounded-xl mb-8">

          <div className="grid grid-cols-2 gap-4">

            <input
              type="date"
              className="bg-zinc-800 p-3 rounded"
              value={data}
              onChange={(e) =>
                setData(e.target.value)
              }
            />

            <select
              className="bg-zinc-800 p-3 rounded"
              value={materia}
              onChange={(e) =>
                setMateria(e.target.value)
              }
            >

              <option value="">
                Selecione uma matéria
              </option>

              <option>Português</option>
              <option>Matemática</option>
              <option>Informática</option>
              <option>Inglês</option>

              <option>
                Direito Constitucional
              </option>

              <option>
                Direito Administrativo
              </option>

              <option>
                Direitos Humanos
              </option>

              <option>
                Direito Penal
              </option>

              <option>
                Processo Penal
              </option>

              <option>
                Direito Penal Militar
              </option>

              <option>
                Processo Penal Militar
              </option>

              <option>
                Ciências Humanas
              </option>

            </select>

            <input
              type="number"
              placeholder="Horas estudadas"
              className="bg-zinc-800 p-3 rounded"
              value={horas}
              onChange={(e) =>
                setHoras(
                  e.target.value
                )
              }
            />

            <input
              type="number"
              placeholder="Questões resolvidas"
              className="bg-zinc-800 p-3 rounded"
              value={questoes}
              onChange={(e) =>
                setQuestoes(
                  e.target.value
                )
              }
            />

            <input
              placeholder="Observações"
              className="bg-zinc-800 p-3 rounded col-span-2"
              value={observacao}
              onChange={(e) =>
                setObservacao(
                  e.target.value
                )
              }
            />

          </div>

          <button
            onClick={salvarEstudo}
            className="mt-4 bg-green-600 hover:bg-green-700 px-5 py-2 rounded"
          >
            Salvar Estudo
          </button>

        </div>

        <div className="space-y-4">

          {historico.length === 0 && (

            <div className="bg-zinc-900 p-5 rounded-xl">
              Nenhum estudo registrado.
            </div>

          )}

          {historico.map(
            (item, index) => (

              <div
                key={index}
                className="bg-zinc-900 p-5 rounded-xl flex justify-between"
              >

                <div>

                  <h2 className="text-xl font-bold">
                    {item.materia}
                  </h2>

                  <p>
                    📅 {item.data}
                  </p>

                  <p>
                    ⏱️ {item.horas}h
                  </p>

                  <p>
                    📚 {item.questoes} questões
                  </p>

                  <p>
                    📝 {item.observacao}
                  </p>

                </div>

                <button
                  onClick={() =>
                    excluir(index)
                  }
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded h-fit"
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