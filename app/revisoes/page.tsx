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

interface Revisao {
  id: string;
  materia: string;
  dataRevisao: string;
  tipo: string;
}

export default function Revisoes() {

  const [vencidas, setVencidas] =
    useState<Revisao[]>([]);

  const [hoje, setHoje] =
    useState<Revisao[]>([]);

  const [futuras, setFuturas] =
    useState<Revisao[]>([]);

  const [concluidas, setConcluidas] =
    useState<string[]>([]);

  useEffect(() => {

    const estudos =
      localStorage.getItem("estudos");

    if (!estudos) return;

    const revisoesConcluidas =
      JSON.parse(
        localStorage.getItem(
          "revisoesConcluidas"
        ) || "[]"
      );

    setConcluidas(
      revisoesConcluidas
    );

    const registros: Estudo[] =
      JSON.parse(estudos);

    const lista: Revisao[] = [];

    registros.forEach((estudo) => {

      const base =
        new Date(estudo.data);

      const criarRevisao = (
        dias: number,
        tipo: string
      ) => {

        const data =
          new Date(base);

        data.setDate(
          data.getDate() + dias
        );

        lista.push({
          id:
            `${estudo.materia}-${tipo}-${data.toISOString()}`,
          materia:
            estudo.materia,
          dataRevisao:
            data.toISOString(),
          tipo
        });

      };

      criarRevisao(
        1,
        "24 Horas"
      );

      criarRevisao(
        7,
        "7 Dias"
      );

      criarRevisao(
        30,
        "30 Dias"
      );

    });

    const hojeData =
      new Date();

    hojeData.setHours(
      0,
      0,
      0,
      0
    );

    const listaVencidas: Revisao[] =
      [];

    const listaHoje: Revisao[] =
      [];

    const listaFuturas: Revisao[] =
      [];

    lista.forEach((item) => {

      if (
        revisoesConcluidas.includes(
          item.id
        )
      ) {
        return;
      }

      const dataRev =
        new Date(
          item.dataRevisao
        );

      dataRev.setHours(
        0,
        0,
        0,
        0
      );

      if (
        dataRev.getTime() <
        hojeData.getTime()
      ) {

        listaVencidas.push(
          item
        );

      } else if (
        dataRev.getTime() ===
        hojeData.getTime()
      ) {

        listaHoje.push(
          item
        );

      } else {

        listaFuturas.push(
          item
        );

      }

    });

    listaFuturas.sort(
      (a, b) =>
        new Date(
          a.dataRevisao
        ).getTime() -
        new Date(
          b.dataRevisao
        ).getTime()
    );

    setVencidas(
      listaVencidas
    );

    setHoje(
      listaHoje
    );

    setFuturas(
      listaFuturas
    );

  }, []);

  function concluirRevisao(
    id: string
  ) {

    const novoEstado = [
      ...concluidas,
      id
    ];

    localStorage.setItem(
      "revisoesConcluidas",
      JSON.stringify(
        novoEstado
      )
    );

    window.location.reload();
  }

  function renderizarLista(
    titulo: string,
    cor: string,
    lista: Revisao[]
  ) {

    return (

      <div className="mb-8">

        <h2
          className={`text-2xl font-bold mb-4 ${cor}`}
        >
          {titulo}
        </h2>

        {lista.length === 0 ? (

          <div className="bg-zinc-900 p-4 rounded-xl">
            Nenhuma revisão.
          </div>

        ) : (

          lista.map(
            (item) => (

              <div
                key={item.id}
                className="bg-zinc-900 p-5 rounded-xl mb-3 flex justify-between"
              >

                <div>

                  <h3 className="text-xl font-bold">
                    {item.materia}
                  </h3>

                  <p>
                    Revisão:
                    {" "}
                    {item.tipo}
                  </p>

                  <p>
                    Data:
                    {" "}
                    {new Date(
                      item.dataRevisao
                    ).toLocaleDateString(
                      "pt-BR"
                    )}
                  </p>

                </div>

                <button
                  onClick={() =>
                    concluirRevisao(
                      item.id
                    )
                  }
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded h-fit"
                >
                  Revisado
                </button>

              </div>

            )
          )

        )}

      </div>

    );

  }

  return (

    <div className="flex bg-zinc-950 text-white min-h-screen">

      <Sidebar />

      <main className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-8">
          📚 Revisões
        </h1>

        {renderizarLista(
          "🔴 Revisões Vencidas",
          "text-red-400",
          vencidas
        )}

        {renderizarLista(
          "🟡 Revisões de Hoje",
          "text-yellow-400",
          hoje
        )}

        {renderizarLista(
          "🟢 Próximas Revisões",
          "text-green-400",
          futuras
        )}

      </main>

    </div>

  );
}