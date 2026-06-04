"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

interface RegistroQuestao {
  materia: string;
  questoes: number;
  acertos: number;
  percentual: string;
}

export default function Questoes() {
  const [materia, setMateria] = useState("");
  const [questoes, setQuestoes] = useState("");
  const [acertos, setAcertos] = useState("");

  const [historico, setHistorico] = useState<RegistroQuestao[]>([]);

  useEffect(() => {
    const dados = localStorage.getItem("questoes");

    if (dados) {
      setHistorico(JSON.parse(dados));
    }
  }, []);

  function adicionarRegistro() {
    if (!materia || !questoes || !acertos) {
      alert("Preencha todos os campos");
      return;
    }

    const novoRegistro: RegistroQuestao = {
      materia,
      questoes: Number(questoes),
      acertos: Number(acertos),
      percentual: (
        (Number(acertos) / Number(questoes)) *
        100
      ).toFixed(1),
    };

    const novoHistorico = [
      ...historico,
      novoRegistro,
    ];

    setHistorico(novoHistorico);

    localStorage.setItem(
      "questoes",
      JSON.stringify(novoHistorico)
    );

    setMateria("");
    setQuestoes("");
    setAcertos("");
  }

  function excluirRegistro(index: number) {
    const novoHistorico = historico.filter(
      (_, i) => i !== index
    );

    setHistorico(novoHistorico);

    localStorage.setItem(
      "questoes",
      JSON.stringify(novoHistorico)
    );
  }

  const totalQuestoes = historico.reduce(
    (acc, item) => acc + item.questoes,
    0
  );

  const totalAcertos = historico.reduce(
    (acc, item) => acc + item.acertos,
    0
  );

  const aproveitamentoGeral =
    totalQuestoes > 0
      ? (
          (totalAcertos / totalQuestoes) *
          100
        ).toFixed(1)
      : "0";

  return (
    <div className="flex bg-zinc-950 text-white min-h-screen">

      <Sidebar />

      <main className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-8">
          Controle de Questões
        </h1>

        <div className="bg-zinc-900 p-6 rounded-xl mb-8">

          <div className="grid grid-cols-3 gap-4">

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
              <option>Direito Constitucional</option>
              <option>Direito Administrativo</option>
              <option>Direito Penal</option>
              <option>Direitos Humanos</option>
              <option>Direito Penal Militar</option>
              <option>Processo Penal Militar</option>
              <option>Inglês</option>
              <option>Ciências Humanas</option>
            </select>

            <input
              type="number"
              className="bg-zinc-800 p-3 rounded"
              placeholder="Quantidade de questões"
              value={questoes}
              onChange={(e) =>
                setQuestoes(e.target.value)
              }
            />

            <input
              type="number"
              className="bg-zinc-800 p-3 rounded"
              placeholder="Quantidade de acertos"
              value={acertos}
              onChange={(e) =>
                setAcertos(e.target.value)
              }
            />

          </div>

          <button
            onClick={adicionarRegistro}
            className="mt-4 bg-green-600 hover:bg-green-700 px-5 py-2 rounded"
          >
            Adicionar Registro
          </button>

        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">

          <div className="bg-zinc-900 p-5 rounded-xl">
            <h2 className="text-zinc-400">
              Questões Resolvidas
            </h2>

            <p className="text-3xl font-bold">
              {totalQuestoes}
            </p>
          </div>

          <div className="bg-zinc-900 p-5 rounded-xl">
            <h2 className="text-zinc-400">
              Acertos
            </h2>

            <p className="text-3xl font-bold">
              {totalAcertos}
            </p>
          </div>

          <div className="bg-zinc-900 p-5 rounded-xl">
            <h2 className="text-zinc-400">
              Aproveitamento Geral
            </h2>

            <p className="text-3xl font-bold">
              {aproveitamentoGeral}%
            </p>
          </div>

        </div>

        <div className="space-y-4">

          {historico.length === 0 && (
            <div className="bg-zinc-900 p-5 rounded-xl">
              Nenhum registro encontrado.
            </div>
          )}

          {historico.map((item, index) => (

            <div
              key={index}
              className="bg-zinc-900 p-5 rounded-xl flex justify-between items-center"
            >

              <div>

                <h2 className="text-xl font-bold">
                  {item.materia}
                </h2>

                <p>
                  Questões: {item.questoes}
                </p>

                <p>
                  Acertos: {item.acertos}
                </p>

                <p>
                  Aproveitamento:
                  {" "}
                  {item.percentual}%
                </p>

              </div>

              <button
                onClick={() =>
                  excluirRegistro(index)
                }
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              >
                Excluir
              </button>

            </div>

          ))}

        </div>

      </main>

    </div>
  );
}