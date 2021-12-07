export function getQueryStr(name) {
  return new URLSearchParams(window.location.search).get(name);
}

export function mappingData(post) {
  return {
    id: post.id,
    title: post.title.rendered,
    author: post.author_data,
    thumbnail: post.featured_media_url,
    createdDate: post.date,
    link: post.link,
    slug: post.slug,
    authorID: post.author,
    description: post.excerpt.rendered,
    view: post.view_count,
    categories: post.categories,
  };
}

export const hashCategoriesHandler = (category) => {
  const hashObj = category.reduce((acc, cur) => {
    const key = cur.id;
    acc[key] = { id: cur.id, name: cur.name, slug: cur.slug };

    return acc;
  }, {});

  return hashObj;
};
