import ArticleItem from "../ArticleItem";
import MainTitle from "../shared/MainTitle";
import usePostsPaging from "../../hooks/usePostsPaging";

function ArticleGeneral() {
  const generalPosts = usePostsPaging();

  return (
    <div className="articles-list section">
      <div className="tcl-container">
        <MainTitle btnLabel="Xem them">Bai Viet Tong Hop</MainTitle>

        <div className="tcl-row">
          {generalPosts.list.map((post) => (
            <div key={post.id} className="tcl-col-12 tcl-col-md-6">
              <ArticleItem post={post} isStyleCard isShowAvatar={false} />
            </div>
          ))}
        </div>
        {generalPosts.renderButton()}
      </div>
    </div>
  );
}

export default ArticleGeneral;
