import { createFileRoute } from "@tanstack/react-router";

import { EntityRoute, entityHead } from "@/components/entity-route";

export const Route = createFileRoute("/equipamentos")({
  head: entityHead("equipamentos"),
  component: () => <EntityRoute name="equipamentos" />,
});
