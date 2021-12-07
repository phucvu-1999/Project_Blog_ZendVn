import Button from "../components/shared/Button";
import ArticleItem from "../components/ArticleItem";
import MainTitle from "../components/shared/MainTitle";
import { getQueryStr } from "../helpers";

function SearchPage() {
  const queryStr = getQueryStr("q");

  return (
    <div className="articles-list section">
      <div className="tcl-container">
        <MainTitle type="search">
          10 kết quả tìm kiếm với từ khóa "{queryStr}"
        </MainTitle>

        <div className="tcl-row tcl-jc-center">
          <div className="tcl-col-12 tcl-col-md-8">
            <ArticleItem
              isStyleCard
              isShowCategoies
              isShowAvatar={false}
              isShowDesc={false}
            />
          </div>
          <div className="tcl-col-12 tcl-col-md-8">
            <ArticleItem
              isStyleCard
              isShowCategoies
              isShowAvatar={false}
              isShowDesc={false}
            />
          </div>
          <div className="tcl-col-12 tcl-col-md-8">
            <ArticleItem
              isStyleCard
              isShowCategoies
              isShowAvatar={false}
              isShowDesc={false}
            />
          </div>
        </div>

        <div className="text-center">
          <Button type="primary" size="large">
            Tải thêm
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
