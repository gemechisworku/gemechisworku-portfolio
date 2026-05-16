/** Max width passed to Drive's thumbnail endpoint (redirects to googleusercontent CDN). */
const DRIVE_THUMB_WIDTH = "w1200";

/**
 * Google Drive "share" links point at a web app, not image bytes — `<img src>` will fail.
 * `uc?export=view` also often returns HTML, not a displayable image. The thumbnail API
 * (`/thumbnail?id=…`) redirects to `lh3.googleusercontent.com` and works for public files
 * ("Anyone with the link" → Viewer). Prefer `public/projects/…` for production reliability.
 */
export function normalizeImageUrlForEmbed(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return trimmed;
  if (trimmed.startsWith("/")) return trimmed;

  try {
    const u = new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`);

    const driveId = extractGoogleDriveFileId(u);
    if (driveId) {
      return driveThumbnailUrl(driveId);
    }

    // Already a googleusercontent image URL
    if (u.hostname.endsWith("googleusercontent.com")) {
      return trimmed;
    }

    return trimmed;
  } catch {
    return trimmed;
  }
}

function driveThumbnailUrl(fileId: string): string {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=${DRIVE_THUMB_WIDTH}`;
}

function extractGoogleDriveFileId(url: URL): string | null {
  if (url.hostname !== "drive.google.com") {
    return null;
  }

  const fileInPath = url.pathname.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileInPath?.[1]) {
    return fileInPath[1];
  }

  if (url.pathname.includes("/open")) {
    return url.searchParams.get("id");
  }

  if (url.pathname === "/uc" || url.pathname.startsWith("/uc")) {
    return url.searchParams.get("id");
  }

  if (url.pathname === "/thumbnail" || url.pathname.startsWith("/thumbnail")) {
    return url.searchParams.get("id");
  }

  return null;
}