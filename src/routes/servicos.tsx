import { createFileRoute } from "@tanstack/react-router";

import { EntityRoute, entityHead } from "@/components/entity-route";

export const Route = createFileRoute("/servicos")({
  head: entityHead("servicos"),
  component: () => <EntityRoute name="servicos" />,
});
