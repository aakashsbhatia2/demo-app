import { useEffect, useRef, useState } from "react";

import { SEARCH_DEBOUNCE_MS } from "@/constants/search";
import { searchUsers } from "@/services/users";
import type { PublicUser } from "@/types/user";

export type SearchStatus = "idle" | "searching" | "done" | "error";

export function useUserSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PublicUser[]>([]);
  const [status, setStatus] = useState<SearchStatus>("idle");
  const latestRequest = useRef(0);

  const trimmed = query.trim();

  useEffect(() => {
    if (!trimmed) return;
    const requestId = ++latestRequest.current;

    const timer = setTimeout(() => {
      setStatus("searching");
      searchUsers(trimmed)
        .then((found) => {
          if (requestId !== latestRequest.current) return;
          setResults(found);
          setStatus("done");
        })
        .catch(() => {
          if (requestId === latestRequest.current) setStatus("error");
        });
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [trimmed]);

  const isIdle = trimmed === "";

  const setFollowing = (id: string, isFollowing: boolean) => {
    setResults((current) =>
      current.map((user) => (user.id === id ? { ...user, isFollowing } : user)),
    );
  };

  return {
    query,
    setQuery,
    isSearching: !isIdle,
    results: isIdle ? [] : results,
    status: isIdle ? "idle" : status,
    setFollowing,
  };
}
