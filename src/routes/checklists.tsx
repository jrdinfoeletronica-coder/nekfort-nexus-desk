import { createFileRoute } from "@tanstack/react-router";

import { EntityRoute, entityHead } from "@/components/entity-route";

export const Route = createFileRoute("/checklists")({
  head: entityHead("checklists"),
  component: () => <EntityRoute name="checklists" />,
});
