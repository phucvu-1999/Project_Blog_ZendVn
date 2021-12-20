import { useLocation } from "react-router-dom";

import ArticleItem from "../components/ArticleItem";
import MainTitle from "../components/shared/MainTitle";
import { getQueryStr } from "../helpers";
import usePostsPaging from "../hooks/usePostsPaging";

function SearchPage() {
  const location = useLocation();
  const queryStr = getQueryStr("q", location);
  const searchPosts = usePostsPaging(queryStr);

  return (
    <div className="articles-list section">
      <div className="tcl-container">
        <MainTitle type="search">
          {searchPosts.total} kết quả tìm kiếm với từ khóa "{queryStr}"
        </MainTitle>
        <div className="tcl-row tcl-jc-center">
          {searchPosts.list.map((post) => (
            <div key={post.id} className="tcl-col-12 tcl-col-md-8">
              <ArticleItem
                post={post}
                highlighted={queryStr}
                isStyleCard
                isShowCategoies
                isShowAvatar={false}
                isShowDesc={false}
              />
            </div>
          ))}
        </div>
        {searchPosts.renderButton()}
      </div>
    </div>
  );
}

export default SearchPage;
