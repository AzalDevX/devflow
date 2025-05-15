export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 215; // Average reading speed
  const words = content.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return time;
}
