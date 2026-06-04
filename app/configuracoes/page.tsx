"use client";

import Sidebar from "@/components/Sidebar";

export default function Configuracoes() {

  const exportarBackup = () => {

    const backup = {

      questoes:
        JSON.parse(
          localStorage.getItem("questoes") || "[]"
        ),

      estudos:
        JSON.parse(
          localStorage.getItem("estudos") || "[]"
        ),

      simulados:
        JSON.parse(
          localStorage.getItem("simulados") || "[]"
        ),

      cronograma:
        JSON.parse(
          localStorage.getItem("cronograma") || "{}"
        ),

      revisoesConcluidas:
        JSON.parse(
          localStorage.getItem("revisoesConcluidas") || "[]"
        ),

      historicoCronograma:
        JSON.parse(
          localStorage.getItem("historicoCronograma") || "[]"
        )

    };

    const blob = new Blob(
      [
        JSON.stringify(
          backup,
          null,
          2
        )
      ],
      {
        type:
          "application/json"
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "cbm-ba-backup.json";

    link.click();

    URL.revokeObjectURL(url);
  };

  const importarBackup = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {

    const arquivo =
      event.target.files?.[0];

    if (!arquivo) return;

    const leitor =
      new FileReader();

    leitor.onload = (
      e
    ) => {

      try {

        const dados =
          JSON.parse(
            e.target?.result as string
          );

        Object.entries(
          dados
        ).forEach(
          ([chave, valor]) => {

            localStorage.setItem(
              chave,
              JSON.stringify(valor)
            );

          }
        );

        alert(
          "Backup restaurado com sucesso!"
        );

        location.reload();

      } catch {

        alert(
          "Arquivo inválido."
        );

      }

    };

    leitor.readAsText(
      arquivo
    );
  };

  return (

    <div className="flex bg-zinc-950 text-white min-h-screen">

      <Sidebar />

      <main className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-8">
          ⚙️ Configurações
        </h1>

        <div className="bg-zinc-900 rounded-xl p-6 mb-6">

          <h2 className="text-2xl font-bold mb-4">
            Backup dos Dados
          </h2>

          <button
            onClick={exportarBackup}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
          >
            ⬇ Exportar Backup
          </button>

        </div>

        <div className="bg-zinc-900 rounded-xl p-6">

          <h2 className="text-2xl font-bold mb-4">
            Restaurar Backup
          </h2>

          <input
            type="file"
            accept=".json"
            onChange={importarBackup}
          />

        </div>

      </main>

    </div>

  );
}