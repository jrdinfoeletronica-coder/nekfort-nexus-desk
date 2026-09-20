import { createFileRoute } from "@tanstack/react-router";

import { EntityRoute, entityHead } from "@/components/entity-route";

export const Route = createFileRoute("/usuarios")({
  head: entityHead("usuarios"),
  component: () => <EntityRoute name="usuarios" />,
});
