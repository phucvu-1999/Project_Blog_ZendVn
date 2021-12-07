import { useSelector } from "react-redux";

import ArticleItem from "../ArticleItem";
import MainTitle from "../shared/MainTitle";
import "./popular-news-list.css";

function ArticlePopular() {
  const popularPosts = useSelector((state) => state.Post.articlesPopular);
  const styleCardArr = popularPosts.slice(0, 2);

  const [styleRowArr] = popularPosts.slice(2);

  return (
    <div className="popular-news section bg-white-blue">
      <div className="tcl-container">
        <MainTitle btnLabel="View More">Bài viết phổ biến</MainTitle>

        <div className="popular-news__list spacing">
          <div className="popular-news__list--left">
            <div className="popular-news__list--row">
              {styleCardArr.map((post) => (
                <div key={post.id} className="popular-news__list--card">
                  <ArticleItem
                    isStyleCard
                    isShowCategoies
                    isShowDesc
                    post={post}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="popular-news__list--right">
            <div className="popular-news__list--row">
              <div className="popular-news__list--card">
                <ArticleItem
                  isStyleCard
                  isStyleRow
                  isShowDesc
                  post={styleRowArr}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticlePopular;
