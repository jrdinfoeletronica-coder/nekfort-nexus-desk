import { createFileRoute } from "@tanstack/react-router";

import { EntityRoute, entityHead } from "@/components/entity-route";

export const Route = createFileRoute("/visitas")({
  head: entityHead("visitas"),
  component: () => <EntityRoute name="visitas" />,
});
