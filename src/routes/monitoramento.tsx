import { createFileRoute } from "@tanstack/react-router";

import { EntityRoute, entityHead } from "@/components/entity-route";

export const Route = createFileRoute("/monitoramento")({
  head: entityHead("monitoramento"),
  component: () => <EntityRoute name="monitoramento" />,
});
