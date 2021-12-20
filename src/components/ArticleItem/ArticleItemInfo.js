import { Link } from "react-router-dom";

import { formatRelativeDate } from "../../helpers/day";
import ArticleItemAvatar from "./ArticleItemAvatar";
import ArticleItemSVG from "./ArticletemSVG";

export default function ArticleItemInfo({
  isShowAvatar,
  createdDate,
  author,
  authorLink,
}) {
  const { dateFormatted, dateRelative } = formatRelativeDate(createdDate);

  return (
    <div className="article-item__info">
      {isShowAvatar && (
        <ArticleItemAvatar authorLink={authorLink} author={author} />
      )}
      <div className="article-item__info-right">
        <div className="article-item__author-name">
          <Link to={authorLink}>
            <strong>{author.nickname}</strong>
          </Link>
        </div>
        <div className="article-item__datetime">
          <div className="date">{dateFormatted}</div>
          &nbsp;
          <div className="time">
            <ArticleItemSVG />
            &nbsp;{dateRelative}
          </div>
        </div>
      </div>
    </div>
  );
}
