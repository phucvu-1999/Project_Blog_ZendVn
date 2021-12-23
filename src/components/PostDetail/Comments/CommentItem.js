import React, { useState } from "react";

import CommentAction from "./CommentAction";
import CommentSection from "./CommentSection";
import CommentForm from "./CommentForm";
import useCommentPaging from "../../../hooks/useCommentPaging";

const CommentItem = (props) => {
  const [isShowForm, setIsShowForm] = useState(false);

  const {
    list: replyComment,
    loadMoreHandler,
    loading,

    exclude,
  } = useCommentPaging({
    parentId: props.comment.id,
  });
  const isThisParent = props.parentId === 0;

  const onReplyClickHandler = () => {
    setIsShowForm(!isShowForm);
  };

  return (
    <li className="item">
      <CommentSection
        onReplyClick={onReplyClickHandler}
        comment={props.comment}
      />

      {isThisParent && replyComment?.length > 0 && (
        <ul className="comments">
          {replyComment.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              parentId={props.comment.id}
            />
          ))}
        </ul>
      )}
      {isThisParent && props.comment.replyCount > 0 && (
        <CommentAction
          loading={loading}
          count={
            props.comment.replyCount - replyComment.length + exclude.length
          }
          onClick={loadMoreHandler}
        />
      )}

      {isThisParent && isShowForm && (
        <CommentForm parentId={props.comment.id} />
      )}
    </li>
  );
};

export default CommentItem;
