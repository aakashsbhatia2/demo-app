import { useLocalSearchParams } from "expo-router";

import { InviteePicker } from "@/components/group-runs/invitee-picker";

export default function NewGroupRunScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <InviteePicker routeId={id} />;
}
