// Utility to resolve image paths returned by the backend.
export function resolveImage(url) {
  if (!url) return "/placeholder.svg";
  if (typeof url !== "string") return "/placeholder.svg";
  // Already an absolute URL
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  // Strip any leading slash then prefix backend host
  return `http://localhost:3000/${url.replace(/^\//, "")}`;
}

export default resolveImage;
