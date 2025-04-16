// Get full url to prevent bugs in deploy
export function getImageUrl(path: string): string {
    return new URL(`/public/${path}`, import.meta.url).href
  }
  