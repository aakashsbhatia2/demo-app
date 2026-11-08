import { useLocalSearchParams } from "expo-router";

import { GroupRunView } from "@/components/group-runs/group-run-view";

export default function GroupRunScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <GroupRunView key={id} id={id} />;
}
