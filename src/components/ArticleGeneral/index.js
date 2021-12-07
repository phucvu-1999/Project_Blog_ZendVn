import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import { getGeneralPostsAsync } from "../../store/post/actions";
import ArticleItem from "../ArticleItem";
import Button from "../shared/Button";
import MainTitle from "../shared/MainTitle";

function ArticleGeneral() {
  const [loading, setLoading] = useState(false);

  const { list, currentPage, totalPages } = useSelector(
    (state) => state.Post.articlePaging
  );

  const hasMorePosts = totalPages > currentPage;

  const dispatch = useDispatch();

  const loadMoreHandler = () => {
    if (loading) {
      return;
    }

    setLoading(true);
    dispatch(
      getGeneralPostsAsync({
        currentPage: currentPage + 1,
      })
    ).then(() => {
      setLoading(false);
    });
  };

  return (
    <div className="articles-list section">
      <div className="tcl-container">
        <MainTitle btnLabel="Xem them">Bai Viet Tong Hop</MainTitle>

        <div className="tcl-row">
          {list.map((post) => (
            <div key={post.id} className="tcl-col-12 tcl-col-md-6">
              <ArticleItem post={post} isStyleCard isShowAvatar={false} />
            </div>
          ))}
        </div>
        {hasMorePosts && (
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
        )}
      </div>
    </div>
  );
}

export default ArticleGeneral;
