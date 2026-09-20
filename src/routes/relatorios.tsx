import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDatabase, type Row } from "@/lib/db";
import { formatMoney } from "@/lib/schema";

const title = "Relatórios — NEKFORT Service Desk";
const description =
  "Relatórios consolidados de chamados, contratos, orçamentos e estoque da NEKFORT.";

export const Route = createFileRoute("/relatorios")({
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
  component: Relatorios,
});

function countBy(rows: Row[], field: string) {
  const map = new Map<string, number>();
  for (const r of rows) {
    const key = String(r[field] ?? "—");
    map.set(key, (map.get(key) ?? 0) + 1);
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1]);
}

function DistTable({ title, data, total }: { title: string; data: [string, number][]; total: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground">Sem dados.</p>
        ) : (
          data.map(([label, value]) => (
            <div key={label} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-foreground">{label}</span>
                <span className="text-muted-foreground">{value}</span>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: `${total ? (value / total) * 100 : 0}%` }}
                />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

function Relatorios() {
  const db = useDatabase();
  const chamados = db['chamados'] ?? [];
  const visitas = db['visitas'] ?? [];
  const orcamentos = db['orcamentos'] ?? [];
  const contratos = db['contratos'] ?? [];
  const clientes = db['clientes'] ?? [];

  const aprovado = orcamentos
    .filter((o) => o["status"] === "Aprovado")
    .reduce((s, o) => s + Number(o["valor"] ?? 0), 0);
  const pipeline = orcamentos
    .filter((o) => o["status"] === "Enviado")
    .reduce((s, o) => s + Number(o["valor"] ?? 0), 0);
  const mrr = contratos
    .filter((c) => c["status"] === "Vigente")
    .reduce((s, c) => s + Number(c["valor"] ?? 0), 0);

  return (
    <AppShell title="Relatórios" description="Consolidação operacional e comercial">
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Receita recorrente mensal", value: formatMoney(mrr) },
            { label: "Orçamentos aprovados", value: formatMoney(aprovado) },
            { label: "Pipeline em aberto", value: formatMoney(pipeline) },
          ].map((k) => (
            <Card key={k.label}>
              <CardContent className="py-5">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{k.label}</p>
                <p className="mt-1 text-2xl font-semibold text-foreground">{k.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <DistTable title="Chamados por status" data={countBy(chamados, "status")} total={chamados.length} />
          <DistTable title="Chamados por categoria" data={countBy(chamados, "categoria")} total={chamados.length} />
          <DistTable title="Visitas por tipo" data={countBy(visitas, "tipo")} total={visitas.length} />
        </div>

        <Card className="overflow-hidden p-0">
          <CardHeader className="pt-6">
            <CardTitle className="text-base">Volume por cliente</CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Cliente</TableHead>
                    <TableHead>Chamados</TableHead>
                    <TableHead>Visitas</TableHead>
                    <TableHead>Contratos</TableHead>
                    <TableHead className="text-right">Valor mensal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clientes.map((c) => {
                    const valor = contratos
                      .filter((k) => k["clienteId"] === c.id && k["status"] === "Vigente")
                      .reduce((s, k) => s + Number(k["valor"] ?? 0), 0);
                    return (
                      <TableRow key={c.id}>
                        <TableCell className="text-sm font-medium">{String(c["nome"])}</TableCell>
                        <TableCell className="text-sm">
                          {chamados.filter((k) => k["clienteId"] === c.id).length}
                        </TableCell>
                        <TableCell className="text-sm">
                          {visitas.filter((k) => k["clienteId"] === c.id).length}
                        </TableCell>
                        <TableCell className="text-sm">
                          {contratos.filter((k) => k["clienteId"] === c.id).length}
                        </TableCell>
                        <TableCell className="text-right text-sm">{formatMoney(valor)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
