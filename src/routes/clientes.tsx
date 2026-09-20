import { createFileRoute } from "@tanstack/react-router";

import { EntityRoute, entityHead } from "@/components/entity-route";

export const Route = createFileRoute("/clientes")({
  head: entityHead("clientes"),
  component: () => <EntityRoute name="clientes" />,
});
