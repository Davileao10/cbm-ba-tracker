import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-zinc-900 p-6">

      <h2 className="text-2xl font-bold mb-10">
        🚒 CBM-BA
      </h2>

      <nav className="flex flex-col gap-5">

        <Link href="/">
          Dashboard
        </Link>

        <Link href="/cronograma">
          Cronograma
        </Link>

        <Link href="/questoes">
          Questões
        </Link>

        <Link href="/estudos">
          Estudos
        </Link>

        <Link href="/estatisticas">
          Estatísticas
        </Link>

        <Link href="/metas">
          Metas
        </Link>

        <Link href="/streak">
          Streak
        </Link>

        <Link href="/graficos">
        Gráficos
        </Link>

        <Link href="/calendario">
        Calendário
        </Link>

        <Link href="/historico">
        Histórico
        </Link>

        <Link href="/simulados">
          Simulados
        </Link>

        <Link href="/revisoes">
          Revisões
        </Link>

      </nav>

    </aside>
  );
}