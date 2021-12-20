import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import { getPostsAsync } from "../store/post/actions";
import Button from "../components/shared/Button";

const usePostsPaging = (queryStr) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { list, currentPage, totalPages, total } = useSelector(
    (state) => state.Post.articlePaging
  );

  const hasMorePosts = totalPages > currentPage;

  useEffect(() => {
    queryStr && dispatch(getPostsAsync({ search: queryStr }));
  }, [dispatch, queryStr]);

  const loadMoreHandler = () => {
    if (loading) {
      return;
    }

    setLoading(true);
    dispatch(
      getPostsAsync({
        currentPage: currentPage + 1,
        search: queryStr || null,
      })
    ).then((res) => {
      if (res.ok) {
        setLoading(false);
      } else {
        console.log(res.error);
        return;
      }
    });
  };

  const renderButton = () => {
    return (
      hasMorePosts && (
        <div className="text-center">
          <Button
            type="primary"
            size="large"
            loading={loading}
            onClick={loadMoreHandler}
          >
            Tải thêm
          </Button>
        </div>
      )
    );
  };

  return {
    list,
    total,
    renderButton,
  };
};

export default usePostsPaging;
