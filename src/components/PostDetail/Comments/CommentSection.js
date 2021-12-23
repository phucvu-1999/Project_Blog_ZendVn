import React from "react";
import { Link } from "react-router-dom";

import { formatRelativeDate } from "../../../helpers/day";
import { genUserLink } from "../../../helpers";

const CommentSection = (props) => {
  const { dateRelative, dateFormatted } = formatRelativeDate(
    props.comment.createdAt,
    true
  );

  return (
    <div className="comments__section">
      <div className="comments__section--avatar">
        <Link to={genUserLink(props.comment.authorId)}>
          <img src={props.comment.authorAvatar} alt={props.comment.authorId} />
        </Link>
      </div>
      <div className="comments__section--content">
        <Link
          to={genUserLink(props.comment.authorId)}
          className="comments__section--user"
        >
          {props.comment.author.nickname}
        </Link>
        <p className="comments__section--time" title={dateRelative}>
          {dateFormatted}
        </p>
        <p
          className="comments__section--text"
          dangerouslySetInnerHTML={{ __html: props.comment.commentContent }}
        />
        {props.comment.parentId === 0 && (
          <i
            onClick={props.onReplyClick}
            className="ion-reply comments__section--reply"
          ></i>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
