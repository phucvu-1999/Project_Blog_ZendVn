import { Link } from "react-router-dom";

import { formatRelativeDate } from "../../helpers/day";
import "./related-posts.css";
import ArticletemSVG from "./ArticletemSVG";
import { genPostLink, genUserLink } from "../../helpers";

function ArticleRelated({ post }) {
  const { dateRelative } = formatRelativeDate(post.createdDate);

  return (
    <article className="related-post__card">
      <Link to={genPostLink(post.slug)} className="related-post__title">
        {post.title}
      </Link>
      <div className="related-post__info">
        <Link
          className="related-post__author"
          to={genUserLink(post.author.nickname)}
        >
          {post.author.nickname}
        </Link>
        <p className="related-post__date">
          <ArticletemSVG />
          {dateRelative}
        </p>
      </div>
    </article>
  );
}

export default ArticleRelated;
