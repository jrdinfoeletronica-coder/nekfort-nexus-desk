import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { deleteRow, insertRow, updateRow, useDatabase, type Row } from "@/lib/db";
import { formatMoney, type Entity, type Field } from "@/lib/schema";
import { cn } from "@/lib/utils";

export function statusTone(value: string) {
  const v = value.toLowerCase();
  if (["crítica", "offline", "cancelado", "recusado", "inativo", "encerrado"].includes(v))
    return "bg-destructive/15 text-destructive border-destructive/30";
  if (["alta", "instável", "aguardando cliente", "em manutenção", "suspenso", "rascunho"].includes(v))
    return "bg-warning/15 text-warning border-warning/30";
  if (
    ["resolvido", "concluída", "aprovado", "ativo", "vigente", "online", "operacional"].includes(v)
  )
    return "bg-success/15 text-success border-success/30";
  return "bg-info/15 text-info border-info/30";
}

function emptyValues(entity: Entity) {
  const v: Record<string, string> = {};
  for (const f of entity.fields) v[f.name] = "";
  return v;
}

export function CrudPage({ entity }: { entity: Entity }) {
  const db = useDatabase();
  const rows = db[entity.table] ?? [];
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Row | null>(null);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Record<string, string>>(() => emptyValues(entity));

  const visibleFields = entity.fields.filter((f) => !f.hideInTable);

  const refLabel = (field: Field, value: string | number) => {
    const list = db[field.refTable ?? ""] ?? [];
    const found = list.find((r) => r.id === value);
    return found ? String(found[field.refLabel ?? "nome"] ?? value) : "—";
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      entity.searchFields.some((f) =>
        String(r[f] ?? "")
          .toLowerCase()
          .includes(q),
      ),
    );
  }, [rows, query, entity.searchFields]);

  function startCreate() {
    setEditing(null);
    setValues(emptyValues(entity));
    setOpen(true);
  }

  function startEdit(row: Row) {
    setEditing(row);
    const v: Record<string, string> = {};
    for (const f of entity.fields) v[f.name] = String(row[f.name] ?? "");
    setValues(v);
    setOpen(true);
  }

  function save() {
    const payload: Record<string, string | number> = {};
    for (const f of entity.fields) {
      const raw = values[f.name] ?? "";
      payload[f.name] = f.type === "number" ? Number(raw || 0) : raw;
    }
    if (editing) {
      updateRow(entity.table, editing.id, payload);
      toast.success(`${entity.singular} atualizado`);
    } else {
      insertRow(entity.table, payload);
      toast.success(`${entity.singular} cadastrado`);
    }
    setOpen(false);
  }

  function renderCell(field: Field, row: Row) {
    const value = row[field.name];
    if (field.type === "ref") return refLabel(field, value ?? "");
    if (field.money) return formatMoney(value ?? 0);
    if (field.badge)
      return (
        <Badge variant="outline" className={cn("font-medium", statusTone(String(value ?? "")))}>
          {String(value ?? "—")}
        </Badge>
      );
    return String(value ?? "—");
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar..."
            className="pl-9"
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {filtered.length} registro{filtered.length === 1 ? "" : "s"}
        </span>
        <Button className="ml-auto" onClick={startCreate}>
          <Plus className="size-4" /> Novo {entity.singular.toLowerCase()}
        </Button>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {visibleFields.map((f) => (
                  <TableHead key={f.name} className="whitespace-nowrap">
                    {f.label}
                  </TableHead>
                ))}
                <TableHead className="w-24 text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={visibleFields.length + 1}
                    className="py-10 text-center text-sm text-muted-foreground"
                  >
                    Nenhum registro encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((row) => (
                  <TableRow key={row.id}>
                    {visibleFields.map((f) => (
                      <TableCell key={f.name} className="whitespace-nowrap text-sm">
                        {renderCell(f, row)}
                      </TableCell>
                    ))}
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button size="icon" variant="ghost" onClick={() => startEdit(row)}>
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => {
                            deleteRow(entity.table, row.id);
                            toast.success(`${entity.singular} removido`);
                          }}
                        >
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editing ? `Editar ${entity.singular.toLowerCase()}` : `Novo ${entity.singular.toLowerCase()}`}
            </DialogTitle>
            <DialogDescription>{entity.description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            {entity.fields.map((f) => (
              <div
                key={f.name}
                className={cn("space-y-2", f.type === "textarea" && "sm:col-span-2")}
              >
                <Label htmlFor={f.name}>{f.label}</Label>
                {f.type === "select" ? (
                  <Select
                    value={values[f.name] || undefined}
                    onValueChange={(v) => setValues((p) => ({ ...p, [f.name]: v }))}
                  >
                    <SelectTrigger id={f.name}>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {(f.options ?? []).map((o) => (
                        <SelectItem key={o} value={o}>
                          {o}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : f.type === "ref" ? (
                  <Select
                    value={values[f.name] || undefined}
                    onValueChange={(v) => setValues((p) => ({ ...p, [f.name]: v }))}
                  >
                    <SelectTrigger id={f.name}>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {(db[f.refTable ?? ""] ?? []).map((o) => (
                        <SelectItem key={o.id} value={o.id}>
                          {String(o[f.refLabel ?? "nome"])}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : f.type === "textarea" ? (
                  <Textarea
                    id={f.name}
                    value={values[f.name] ?? ""}
                    onChange={(e) => setValues((p) => ({ ...p, [f.name]: e.target.value }))}
                    rows={3}
                  />
                ) : (
                  <Input
                    id={f.name}
                    type={f.type === "number" ? "number" : f.type === "date" ? "date" : "text"}
                    value={values[f.name] ?? ""}
                    onChange={(e) => setValues((p) => ({ ...p, [f.name]: e.target.value }))}
                  />
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={save}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
