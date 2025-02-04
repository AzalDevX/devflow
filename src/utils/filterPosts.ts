export function filterPublishedPosts(posts: any[]) {
  // Obtener la fecha actual del dispositivo
  const currentDate = new Date();

  // Crear una fecha limpia (sin tiempo) para comparación
  const cleanCurrentDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );

  return (
    posts
      .filter((post) => {
        // Convertir la fecha del post a una fecha limpia
        const publishDate = new Date(post.data.publishDate);
        const cleanPublishDate = new Date(
          publishDate.getFullYear(),
          publishDate.getMonth(),
          publishDate.getDate()
        );

        // Solo mostrar posts cuya fecha de publicación es igual o anterior a la fecha actual
        return cleanPublishDate <= cleanCurrentDate && !post.data.draft;
      })
      // Ordenar por fecha de publicación (más reciente primero)
      .sort((a, b) => {
        return (
          new Date(b.data.publishDate).getTime() -
          new Date(a.data.publishDate).getTime()
        );
      })
  );
}
