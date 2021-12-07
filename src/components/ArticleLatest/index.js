import { useSelector } from "react-redux";

import "./latest-news-list.css";
import ArticleItem from "../ArticleItem";
import MainTitle from "../shared/MainTitle";

function ArticleLatest() {
  const latestPosts = useSelector((state) => state.Post.articlesLatest);

  return (
    <div className="latest-news section">
      <div className="tcl-container">
        <MainTitle>Bài viết mới nhất</MainTitle>

        <div className="latest-news__list spacing">
          {latestPosts.map((post) => (
            <div key={post.id} className="latest-news__card">
              <ArticleItem post={post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArticleLatest;
