import { RUNNER_COLORS, STALE_RUNNER_MS } from "@/constants/group-runs";
import { colors } from "@/constants/theme";
import type { GroupRunMember, MapRunner, RunnerPosition, RunnerProfile } from "@/types/group-run";

export type BoardRow = {
  id: string;
  name: string;
  color: string;
  distanceMeters: number | null;
  isStale: boolean;
};

type RunnerInput = {
  members: GroupRunMember[];
  positions: Record<string, RunnerPosition>;
  meId: string;
  myDistanceMeters: number;
  now: number;
};

const ME_LABEL = "You";

export function fullName({ firstName, lastName }: RunnerProfile) {
  return `${firstName} ${lastName}`;
}

export function initials({ firstName, lastName }: RunnerProfile) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export function toRunners({ members, positions, meId, myDistanceMeters, now }: RunnerInput) {
  const runners = members
    .map((member, index) => ({
      member,
      color: RUNNER_COLORS[index % RUNNER_COLORS.length],
      position: positions[member.id] ?? null,
      isMe: member.id === meId,
    }))
    .filter(({ member }) => member.status === "joined")
    .map((runner) => ({
      ...runner,
      isStale: !runner.isMe && (!runner.position || now - runner.position.timestamp > STALE_RUNNER_MS),
    }));

  const mapRunners: MapRunner[] = runners.flatMap(({ member, color, position, isMe, isStale }) =>
    position && !isMe
      ? [
          {
            id: member.id,
            latitude: position.latitude,
            longitude: position.longitude,
            label: initials(member),
            color: isStale ? colors.stale : color,
          },
        ]
      : [],
  );

  const board: BoardRow[] = runners
    .map(({ member, color, position, isMe, isStale }) => ({
      id: member.id,
      name: isMe ? ME_LABEL : fullName(member),
      color,
      distanceMeters: isMe ? myDistanceMeters : (position?.distanceMeters ?? null),
      isStale,
    }))
    .sort((a, b) => (b.distanceMeters ?? -1) - (a.distanceMeters ?? -1));

  return { mapRunners, board };
}
