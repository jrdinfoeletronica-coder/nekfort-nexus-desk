import { AppShell } from "@/components/app-shell";
import { CrudPage } from "@/components/crud-page";
import { entities, type Entity } from "@/lib/schema";

function getEntity(name: string): Entity {
  const entity = entities[name];
  if (!entity) throw new Error(`Entidade desconhecida: ${name}`);
  return entity;
}

export function EntityRoute({ name }: { name: string }) {
  const entity = getEntity(name);
  return (
    <AppShell title={entity.title} description={entity.description}>
      <CrudPage entity={entity} />
    </AppShell>
  );
}

export function entityHead(name: string) {
  const entity = getEntity(name);
  const title = `${entity.title} — NEKFORT Service Desk`;
  return () => ({
    meta: [
      { title },
      { name: "description", content: entity.description },
      { property: "og:title", content: title },
      { property: "og:description", content: entity.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  });
}
