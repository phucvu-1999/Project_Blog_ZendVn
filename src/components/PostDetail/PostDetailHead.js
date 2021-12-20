import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { genUserLink } from "../../helpers";
import { formatRelativeDate } from "../../helpers/day";

function PostDetailHead() {
  const post = useSelector((state) => state.Post.postDetail);

  if (!post) {
    return null;
  }

  const postTitle = post.title;
  const postAuthorId = post.authorId;
  const postAuthorName = post.author.nickname;
  const postCmtCount = post.commentCount;
  const postViewCount = post.view;
  const { dateFormatted } = formatRelativeDate(post.createdDate);

  return (
    <div className="post-detail__head">
      <div className="tcl-container">
        <h1 className="post-detail__title">{postTitle}</h1>
        <ul className="post-detail__info">
          <li className="item author">
            By{" "}
            <Link to={genUserLink(postAuthorId)}>
              <strong>{postAuthorName}</strong>
            </Link>
          </li>
          <li className="item date">{dateFormatted}</li>
          <li className="item views">
            {postViewCount} <i className="icons ion-ios-eye" />
          </li>
          <li className="item comments">
            {postCmtCount} <i className="icons ion-ios-chatbubble" />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PostDetailHead;
