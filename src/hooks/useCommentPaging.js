import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import { actFetchCommentsAsync } from "../store/comments/action";
import { getDefaultCommentPaging } from "../helpers";

const fnPostIdSelector = (state) =>
  state.Post.postDetail && state.Post.postDetail.id;
const fnParentPagingSelector = (state) => state.Comments.parentPaging;
const fnChildPagingSelector = (state, parentId) => {
  return state.Comments.hashChildPaging[parentId];
};

const useCommentPaging = ({ extraParams = {}, parentId = 0 } = {}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const postId = useSelector(fnPostIdSelector);
  const {
    list,
    currentPage,
    totalPages,
    total: _total,
    exclude,
  } = useSelector((state) => {
    if (parentId === 0) {
      return fnParentPagingSelector(state);
    }

    return fnChildPagingSelector(state, parentId) || getDefaultCommentPaging();
  });

  const hasMoreComments = totalPages > currentPage;

  const loadMoreHandler = () => {
    if (loading) {
      return;
    }

    setLoading(true);
    const params = {
      currentPage: currentPage + 1,
      parentId,
      postId,
      exclude,
      ...extraParams,
    };
    dispatch(actFetchCommentsAsync(params)).then((res) => {
      if (res.ok) {
        setLoading(false);
      } else {
        console.log(res.error);
        return;
      }
    });
  };

  return {
    list,
    loading,
    total: _total + (exclude?.length || 0),
    exclude,
    hasMoreComments,
    totalPages,
    loadMoreHandler,
  };
};

export default useCommentPaging;
