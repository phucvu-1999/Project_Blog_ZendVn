import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localVi from "dayjs/locale/vi";

import ArticleItemAvatar from "./ArticleItemAvatar";
import ArticleItemSVG from "./ArticletemSVG";
import { DATE_TEMPLATE } from "../../constants";

dayjs.locale(localVi);
dayjs.extend(relativeTime);

export default function ArticleItemInfo({
  isShowAvatar,
  createdDate,
  author,
  authorLink,
}) {
  const dateFormattedObj = dayjs(createdDate);
  const dateFormatted = dateFormattedObj.format(DATE_TEMPLATE);
  const timeRelated = dateFormattedObj.fromNow();

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
            &nbsp;{timeRelated}
          </div>
        </div>
      </div>
    </div>
  );
}
