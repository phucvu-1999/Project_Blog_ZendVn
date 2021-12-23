import { mappingComments } from "../../helpers";
import commentService from "../../services/comments";
import { actIncreaseCommentCount } from "../post/actions";

// Action type
export const ACT_FETCH_COMMENTS_PARENTS = "ACT_FETCH_COMMENTS_PARENTS";
export const ACT_FETCH_COMMENTS_REPLY = "ACT_FETCH_COMMENTS_REPLY";
export const ACT_INIT_CHILDREN_PAGING = "ACT_INIT_CHILDREN_PAGING";
export const ACT_POST_NEW_PARENT_COMMENT = "ACT_POST_NEW_PARENT_COMMENT";
export const ACT_NEW_REPLY_COMMENT = "ACT_NEW_REPLY_COMMENT";

// Action
export const actFetchComments = ({
  totalPages,
  total,
  comments,
  currentPage,
  parentId,
}) => {
  return {
    type:
      parentId === 0 ? ACT_FETCH_COMMENTS_PARENTS : ACT_FETCH_COMMENTS_REPLY,
    payload: {
      comments,
      totalPages,
      total,
      currentPage,
      parentId,
    },
  };
};

export const actInitChildrenPaging = (comments) => {
  return {
    type: ACT_INIT_CHILDREN_PAGING,
    payload: {
      comments,
    },
  };
};

export const actPostNewComment = (comment) => {
  return {
    type:
      comment.parentId === 0
        ? ACT_POST_NEW_PARENT_COMMENT
        : ACT_NEW_REPLY_COMMENT,
    payload: {
      comment,
    },
  };
};

//Action Async
export const actFetchCommentsAsync = ({
  perPage = 2,
  currentPage = 1,
  postId,
  parentId = 0,
  exclude = [],
}) => {
  return async (dispatch) => {
    try {
      if (!postId) {
        throw new Error("Can not find any postId");
      }

      const response = await commentService.getListComment({
        perPage,
        currentPage,
        postId,
        parentId,
        exclude,
      });
      const totalPages = +response.headers["x-wp-totalpages"];
      const total = +response.headers["x-wp-total"];
      const comments = response.data.map(mappingComments);

      if (parentId === 0) {
        dispatch(actInitChildrenPaging(comments));
      }

      dispatch(
        actFetchComments({ totalPages, total, comments, currentPage, parentId })
      );
      return {
        ok: true,
      };
    } catch (err) {
      console.log("Comment error", err.message);
      return {
        ok: false,
      };
    }
  };
};

export const actPostNewCommentAsync = ({
  parentId = 0,
  postId,
  content,
  authorId,
}) => {
  return async (dispatch) => {
    try {
      if (!authorId || !postId || !content)
        throw new Error("Hãy nhập đủ thông tin");

      const response = await commentService.createOne({
        parentId,
        postId,
        content,
        authorId,
      });

      const comment = mappingComments(response.data);

      dispatch(actPostNewComment(comment));
      dispatch(actIncreaseCommentCount());

      return {
        ok: true,
      };
    } catch (err) {
      console.log("post comment error: ", err.message);
      return {
        ok: false,
        message: err.message,
      };
      //comment_duplicate
    }
  };
};
