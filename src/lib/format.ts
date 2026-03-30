export function formatExperienceRange(
  startDate: string,
  endDate: string | undefined,
  current: boolean,
): string {
  const start = new Date(startDate);
  const s = start.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  if (current || !endDate) return `${s} — Present`;
  const end = new Date(endDate);
  const e = end.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  return `${s} — ${e}`;
}
