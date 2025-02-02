export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 250
  const words = content.trim().split(/\s+/).length
  const time = Math.ceil(words / wordsPerMinute)
  return time
}

