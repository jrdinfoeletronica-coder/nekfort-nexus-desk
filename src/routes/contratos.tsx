import { createFileRoute } from "@tanstack/react-router";

import { EntityRoute, entityHead } from "@/components/entity-route";

export const Route = createFileRoute("/contratos")({
  head: entityHead("contratos"),
  component: () => <EntityRoute name="contratos" />,
});
