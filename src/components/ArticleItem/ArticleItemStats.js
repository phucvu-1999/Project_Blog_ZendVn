export default function ArticleItemStats({ post }) {
  return (
    <ul className="article-item__stats">
      <li>
        <i className="icons ion-ios-eye"></i>
        <span className="text">{post.view}</span>
      </li>
    </ul>
  );
}
