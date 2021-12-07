import { Link } from "react-router-dom";

import { DEFAULT_AVATAR } from "../../constants";

export default function ArticleItemAvatar({ author, authorLink }) {
  return (
    <div className="article-item__author-image">
      <Link aria-label="John Doe" to={authorLink}>
        <img src={author.avatar || DEFAULT_AVATAR} alt={author.nickname} />
      </Link>
    </div>
  );
}
