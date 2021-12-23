import useCommentPaging from "../../hooks/useCommentPaging";

import "./comments.css";
import CommentForm from "./Comments/CommentForm";
import CommentItem from "./Comments/CommentItem";
import CommentAction from "./Comments/CommentAction";

const mapComment = (comment) => (
  <CommentItem parentId={comment.parentId} comment={comment} key={comment.id} />
);

function PostDetailComments() {
  const { list, total, loadMoreHandler, loading, hasMoreComments } =
    useCommentPaging();

  return (
    <div className="post-detail__comments">
      <div className="comments__form">
        <CommentForm parentId={0} />
      </div>
      <p>{total} Comments</p>
      {list && <ul className="comments">{list.map(mapComment)}</ul>}

      {hasMoreComments && (
        <CommentAction
          parent={true}
          spacingTop
          loading={loading}
          count={total - list.length}
          onClick={loadMoreHandler}
        />
      )}
    </div>
  );
}

export default PostDetailComments;
