/**
 * Build a youtube.com/embed URL from common watch / shorts / youtu.be links.
 */
export function getYouTubeEmbedUrl(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  try {
    const u = new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`);

    if (u.hostname === "youtu.be") {
      const id = u.pathname.replace(/^\//, "").split("/")[0];
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;

      const shorts = u.pathname.match(/\/shorts\/([^/?]+)/);
      if (shorts?.[1]) return `https://www.youtube.com/embed/${shorts[1]}`;

      const embed = u.pathname.match(/\/embed\/([^/?]+)/);
      if (embed?.[1]) return `https://www.youtube.com/embed/${embed[1]}`;
    }
  } catch {
    return null;
  }

  return null;
}
