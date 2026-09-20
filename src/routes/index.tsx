import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  CalendarCheck,
  Ticket,
  FileSignature,
  Package,
  Activity,
} from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { statusTone } from "@/components/crud-page";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDatabase } from "@/lib/db";
import { formatMoney } from "@/lib/schema";
import { cn } from "@/lib/utils";

const title = "Painel — NEKFORT Service Desk";
const description =
  "Visão geral de chamados, contratos, visitas técnicas e monitoramento da NEKFORT.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Painel,
});

function Painel() {
  const db = useDatabase();
  const chamados = db.chamados ?? [];
  const contratos = db.contratos ?? [];
  const visitas = db.visitas ?? [];
  const materiais = db.materiais ?? [];
  const monitoramento = db.monitoramento ?? [];
  const clientes = db.clientes ?? [];

  const abertos = chamados.filter((c) => c["status"] !== "Resolvido" && c["status"] !== "Cancelado");
  const criticos = abertos.filter((c) => c["prioridade"] === "Crítica" || c["prioridade"] === "Alta");
  const mrr = contratos
    .filter((c) => c["status"] === "Vigente")
    .reduce((s, c) => s + Number(c["valor"] ?? 0), 0);
  const agendadas = visitas.filter((v) => v["status"] !== "Concluída" && v["status"] !== "Cancelada");
  const estoqueBaixo = materiais.filter((m) => Number(m["estoque"] ?? 0) <= Number(m["minimo"] ?? 0));
  const offline = monitoramento.filter((m) => m["estado"] !== "Online");

  const clienteNome = (id: unknown) =>
    clientes.find((c) => c.id === id)?.["nome"] ?? "—";

  const cards = [
    { label: "Chamados em aberto", value: String(abertos.length), icon: Ticket, to: "/chamados" as const },
    { label: "Prioridade alta/crítica", value: String(criticos.length), icon: AlertTriangle, to: "/chamados" as const },
    { label: "Receita recorrente", value: formatMoney(mrr), icon: FileSignature, to: "/contratos" as const },
    { label: "Visitas programadas", value: String(agendadas.length), icon: CalendarCheck, to: "/visitas" as const },
    { label: "Materiais em alerta", value: String(estoqueBaixo.length), icon: Package, to: "/materiais" as const },
    { label: "Ativos com falha", value: String(offline.length), icon: Activity, to: "/monitoramento" as const },
  ];

  return (
    <AppShell title="Painel" description="Indicadores operacionais em tempo real">
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <Link key={c.label} to={c.to}>
                <Card className="transition-colors hover:border-primary/50">
                  <CardContent className="flex items-center gap-4 py-5">
                    <div className="flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        {c.label}
                      </p>
                      <p className="text-2xl font-semibold text-foreground">{c.value}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Chamados recentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {chamados.slice(0, 5).map((c) => (
                <div key={c.id} className="flex items-start gap-3 border-b border-border/60 pb-3 last:border-0 last:pb-0">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {String(c["numero"])} · {String(c["titulo"])}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {String(clienteNome(c["clienteId"]))} · {String(c["tecnico"] ?? "—")}
                    </p>
                  </div>
                  <Badge variant="outline" className={cn(statusTone(String(c["status"] ?? "")))}>
                    {String(c["status"] ?? "—")}
                  </Badge>
                </div>
              ))}
              {chamados.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhum chamado registrado.</p>
              ) : null}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Monitoramento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {monitoramento.map((m) => (
                <div key={m.id} className="flex items-center gap-3 border-b border-border/60 pb-3 last:border-0 last:pb-0">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{String(m["ativo"])}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {String(clienteNome(m["clienteId"]))} · {String(m["ultimaLeitura"] ?? "—")}
                    </p>
                  </div>
                  <Badge variant="outline" className={cn(statusTone(String(m["estado"] ?? "")))}>
                    {String(m["estado"] ?? "—")}
                  </Badge>
                </div>
              ))}
              {monitoramento.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhum ativo monitorado.</p>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
