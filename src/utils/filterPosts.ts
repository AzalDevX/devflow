export function filterPublishedPosts(posts: any[]) {
  const currentDate = new Date()
  // Resetear la hora a medianoche para comparar solo fechas
  currentDate.setHours(0, 0, 0, 0)

  return posts.filter((post) => {
    const publishDate = new Date(post.data.publishDate)
    // Resetear la hora a medianoche para comparar solo fechas
    publishDate.setHours(0, 0, 0, 0)
    return publishDate <= currentDate
  })
}

