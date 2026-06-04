"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  LayoutDashboard,
  CalendarDays,
  BookOpen,
  BarChart3,
  Target,
  Flame,
  TrendingUp,
  History,
  ClipboardList,
  Brain,
  FileCheck,
} from "lucide-react";

const menu = [
  {
    nome: "Dashboard",
    rota: "/",
    icone: LayoutDashboard,
  },
  {
    nome: "Cronograma",
    rota: "/cronograma",
    icone: CalendarDays,
  },
  {
    nome: "Questões",
    rota: "/questoes",
    icone: ClipboardList,
  },
  {
    nome: "Estudos",
    rota: "/estudos",
    icone: BookOpen,
  },
  {
    nome: "Estatísticas",
    rota: "/estatisticas",
    icone: BarChart3,
  },
  {
    nome: "Metas",
    rota: "/metas",
    icone: Target,
  },
  {
    nome: "Streak",
    rota: "/streak",
    icone: Flame,
  },
  {
    nome: "Gráficos",
    rota: "/graficos",
    icone: TrendingUp,
  },
  {
    nome: "Calendário",
    rota: "/calendario",
    icone: CalendarDays,
  },
  {
    nome: "Histórico",
    rota: "/historico",
    icone: History,
  },
  {
    nome: "Simulados",
    rota: "/simulados",
    icone: FileCheck,
  },
  {
    nome: "Revisões",
    rota: "/revisoes",
    icone: Brain,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const [progresso, setProgresso] =
    useState(0);

  useEffect(() => {
    const cronograma =
      localStorage.getItem("cronograma");

    if (!cronograma) return;

    const dados =
      JSON.parse(cronograma);

    const tarefas =
      dados.tarefas || {};

    const concluidas =
      Object.values(tarefas)
        .filter(Boolean)
        .length;

    const total = 20;

    setProgresso(
      (concluidas / total) * 100
    );
  }, []);

  return (
    <aside className="w-72 min-h-screen bg-zinc-950 border-r border-zinc-800 flex flex-col">

      {/* TOPO */}

      <div className="p-6 border-b border-zinc-800">

        <div className="flex items-center gap-3">

          <Image
            src="/icon-512.png"
            alt="CBM-BA"
            width={52}
            height={52}
            className="rounded-xl"
          />

          <div>

            <h1 className="font-bold text-xl text-white">
              CBM-BA
            </h1>

            <p className="text-zinc-400 text-sm">
              Tracker Premium
            </p>

          </div>

        </div>

      </div>

      {/* MENU */}

      <div className="flex-1 p-4 space-y-2">

        {menu.map((item) => {
          const Icone =
            item.icone;

          const ativo =
            pathname === item.rota;

          return (
            <Link
              key={item.rota}
              href={item.rota}
              className={`
                flex items-center gap-3
                px-4 py-3
                rounded-xl
                transition-all
                duration-200

                ${
                  ativo
                    ? "bg-red-600 text-white shadow-lg"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }
              `}
            >
              <Icone size={20} />

              <span className="font-medium">
                {item.nome}
              </span>
            </Link>
          );
        })}

      </div>

      {/* PERFIL */}

      <div className="p-5 border-t border-zinc-800">

        <div className="bg-zinc-900 rounded-2xl p-4">

          <p className="text-zinc-400 text-sm">
            Bombeiro em formação
          </p>

          <h3 className="font-bold text-white mt-1">
            Davi Leão
          </h3>

          <div className="mt-4">

            <div className="flex justify-between text-xs text-zinc-400 mb-2">

              <span>
                Progresso Semanal
              </span>

              <span>
                {progresso.toFixed(0)}%
              </span>

            </div>

            <div className="w-full h-2 rounded-full bg-zinc-800">

              <div
                className="h-2 rounded-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-500"
                style={{
                  width: `${progresso}%`,
                }}
              />

            </div>

          </div>

        </div>

      </div>

    </aside>
  );
}