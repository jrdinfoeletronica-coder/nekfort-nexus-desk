import { createFileRoute } from "@tanstack/react-router";

import { EntityRoute, entityHead } from "@/components/entity-route";

export const Route = createFileRoute("/chamados")({
  head: entityHead("chamados"),
  component: () => <EntityRoute name="chamados" />,
});
