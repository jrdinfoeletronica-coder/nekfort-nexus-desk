import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Ticket,
  Building2,
  FileSignature,
  Cpu,
  CalendarCheck,
  ClipboardList,
  Receipt,
  Wrench,
  Package,
  BarChart3,
  Users,
  ShieldCheck,
  Activity,
  Menu,
  X,
  RotateCcw,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { hydrateFromStorage, resetDatabase } from "@/lib/db";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Painel", icon: LayoutDashboard },
  { to: "/chamados", label: "Chamados", icon: Ticket },
  { to: "/clientes", label: "Clientes", icon: Building2 },
  { to: "/contratos", label: "Contratos", icon: FileSignature },
  { to: "/equipamentos", label: "Equipamentos", icon: Cpu },
  { to: "/visitas", label: "Visitas técnicas", icon: CalendarCheck },
  { to: "/checklists", label: "Checklists", icon: ClipboardList },
  { to: "/orcamentos", label: "Orçamentos", icon: Receipt },
  { to: "/servicos", label: "Serviços", icon: Wrench },
  { to: "/materiais", label: "Materiais", icon: Package },
  { to: "/monitoramento", label: "Monitoramento", icon: Activity },
  { to: "/relatorios", label: "Relatórios", icon: BarChart3 },
  { to: "/usuarios", label: "Usuários", icon: Users },
  { to: "/permissoes", label: "Permissões", icon: ShieldCheck },
] as const;

export function AppShell({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    hydrateFromStorage();
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-sidebar-border bg-sidebar transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-5">
          <div className="flex size-9 items-center justify-center rounded-md bg-primary font-bold text-primary-foreground">
            N
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-wide text-sidebar-foreground">NEKFORT</p>
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Service Desk
            </p>
          </div>
          <button
            className="ml-auto text-muted-foreground lg:hidden"
            onClick={() => setOpen(false)}
            aria-label="Fechar menu"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-sidebar-accent font-medium text-primary"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <Icon className="size-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-muted-foreground"
            onClick={() => {
              resetDatabase();
              toast.success("Dados de demonstração restaurados");
            }}
          >
            <RotateCcw className="size-4" /> Restaurar dados iniciais
          </Button>
        </div>
      </aside>

      {open ? (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      ) : null}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex min-h-16 flex-wrap items-center gap-3 border-b border-border bg-background/85 px-4 py-3 backdrop-blur md:px-8">
          <button
            className="text-muted-foreground lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu className="size-5" />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-semibold text-foreground">{title}</h1>
            {description ? (
              <p className="truncate text-xs text-muted-foreground">{description}</p>
            ) : null}
          </div>
          <div className="flex items-center gap-2">{actions}</div>
        </header>
        <main className="px-4 py-6 md:px-8">{children}</main>
      </div>
    </div>
  );
}
