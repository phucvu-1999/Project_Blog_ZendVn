import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { actPostNewCommentAsync } from "../../../store/comments/action";
import { genUserLink } from "../../../helpers";
import Button from "../../shared/Button";

const CommentForm = ({ parentId }) => {
  const currentUser = useSelector((state) => state.Auth.currentUser);
  const postId = useSelector((state) => state.Post.postDetail?.id);
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const isThisParent = parentId === 0;
  const placeholder = isThisParent ? "Viết bình luận" : "Phản hồi";
  const btnLabel = isThisParent ? "Bình luận" : "Gửi phản hồi";

  const commentChangeHanlder = (e) => {
    setContent(e.target.value);
  };

  const addNewCommentHandler = () => {
    if (loading) {
      return;
    }

    setLoading(true);
    dispatch(
      actPostNewCommentAsync({
        content,
        parentId,
        authorId: currentUser.id,
        postId,
      })
    ).then((res) => {
      if (res.ok) {
        setLoading(false);
        setContent("");
      } else {
        setLoading(false);
        setContent("");
        console.log(res.message);
      }
    });
  };

  if (!currentUser && isThisParent) {
    return (
      <p style={{ textAlign: "center" }}>
        Bạn chưa đăng nhập, vui lòng <Link to="/login">đăng nhập</Link> để bình
        luận
      </p>
    );
  }

  return (
    <div className="comments__form">
      <div className="comments__form--control">
        <div className="comments__section--avatar">
          <Link to={genUserLink(currentUser.id)}>
            <img src={currentUser.avatar} alt={currentUser.nickname} />
          </Link>
        </div>
        <textarea
          placeholder={placeholder}
          onChange={commentChangeHanlder}
          value={content}
        />
      </div>
      <div className="text-right">
        <Button onClick={addNewCommentHandler} loading={loading}>
          {btnLabel}
        </Button>
      </div>
    </div>
  );
};

export default CommentForm;
