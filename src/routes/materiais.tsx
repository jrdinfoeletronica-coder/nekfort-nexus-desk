import { createFileRoute } from "@tanstack/react-router";

import { EntityRoute, entityHead } from "@/components/entity-route";

export const Route = createFileRoute("/materiais")({
  head: entityHead("materiais"),
  component: () => <EntityRoute name="materiais" />,
});
