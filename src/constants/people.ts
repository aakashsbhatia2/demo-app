export const SEARCH_PLACEHOLDER = "Search people";

export const PEOPLE_MESSAGES = {
  searchHint: "Search for a full name, like “Sam Lee”, or an exact @username.",
  noFollowing: "You're not following anyone yet. Use search to find people.",
  noFollowers: "No followers yet.",
  noResults: (query: string) => `No one found for “${query}”.`,
};
