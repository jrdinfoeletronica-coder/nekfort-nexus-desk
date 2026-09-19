import { AppShell } from "@/components/app-shell";
import { CrudPage } from "@/components/crud-page";
import { entities } from "@/lib/schema";

export function EntityRoute({ name }: { name: keyof typeof entities }) {
  const entity = entities[name];
  return (
    <AppShell title={entity.title} description={entity.description}>
      <CrudPage entity={entity} />
    </AppShell>
  );
}

export function entityHead(name: keyof typeof entities) {
  const entity = entities[name];
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
