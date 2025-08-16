export const generateCanonicalUrl = (pathname) => {
  const siteUrl = import.meta.env.VITE_SITE_URL;

  if (!siteUrl) {
    console.warn(
      "VITE_SITE_URL is not defined in your .env file. Canonical URL cannot be generated."
    );
    return "";
  }

  // The pathname from react-router-dom's useLocation() hook already excludes query strings and hashes.
  // This function assumes a clean pathname is passed.

  // Normalize trailing slashes: remove for non-root paths, keep for the root.
  let canonicalPath = pathname;
  if (canonicalPath !== "/" && canonicalPath.endsWith("/")) {
    canonicalPath = canonicalPath.slice(0, -1);
  }

  // Ensure the base URL also does not have a trailing slash to prevent double slashes.
  const baseUrl = siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;

  return `${baseUrl}${canonicalPath}`;
};
