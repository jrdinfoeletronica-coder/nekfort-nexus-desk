import { createFileRoute } from "@tanstack/react-router";

import { EntityRoute, entityHead } from "@/components/entity-route";

export const Route = createFileRoute("/permissoes")({
  head: entityHead("permissoes"),
  component: () => <EntityRoute name="permissoes" />,
});
