export default function ArticleItemDesc({ post }) {
  const postDescription = post.description
    .replace("<p>", "")
    .replace("</p>", "");

  let truncateStr = postDescription.split(" ").slice(0, 20).join(" ");

  if (postDescription.split(" ").length > 20) {
    return truncateStr + " ...";
  }

  return <p className="article-item__desc">{truncateStr}</p>;
}
