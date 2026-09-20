import { createFileRoute } from "@tanstack/react-router";

import { EntityRoute, entityHead } from "@/components/entity-route";

export const Route = createFileRoute("/orcamentos")({
  head: entityHead("orcamentos"),
  component: () => <EntityRoute name="orcamentos" />,
});
