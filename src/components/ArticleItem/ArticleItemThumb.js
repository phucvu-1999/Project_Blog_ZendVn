import { Link } from "react-router-dom";

export default function ArticleItemThumb({ thumbnail, slugLink }) {
  return (
    <div className="article-item__thumbnail">
      <Link to={slugLink}>
        <p>{slugLink}</p>
        <img src={thumbnail} alt="assets/images/blog-1.jpg" />
      </Link>
    </div>
  );
}
