import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import ArticleItem from "../components/ArticleItem";
import MainTitle from "../components/shared/MainTitle";
import PageNotFound from "../components/PageNotFound/PageNotFound";
import IconLoading from "../components/shared/IconLoading";
import usePostsPaging from "../hooks/usePostsPaging";

function SearchCateGory() {
  const { slug } = useParams();
  const [category, setCategory] = useState(undefined);
  const isFetchCategories = useSelector((state) => state.Category.isFetched);
  const hashCategoriesById = useSelector(
    (state) => state.Category.hashCategoriesById
  );
  const categoryPosts = usePostsPaging(slug);

  console.log("categoryPosts", categoryPosts);

  useEffect(() => {
    // let isFounded = false;
    if (isFetchCategories) {
      const foundId = Object.keys(hashCategoriesById).find((categoryId) => {
        const categoryValue = hashCategoriesById[categoryId];
        return categoryValue.slug === slug && categoryValue.lang === "vi";
      });

      if (foundId) {
        setCategory(hashCategoriesById[foundId]);
      } else {
        setCategory(null);
      }
    }
  }, [slug, isFetchCategories, hashCategoriesById]);

  if (category === undefined) {
    return (
      <div className="tcl-row tcl-jc-center">
        <IconLoading width="15rem" />
      </div>
    );
  }

  if (category === null) {
    return <PageNotFound />;
  }
  return (
    <div className="articles-list section">
      <div className="tcl-container">
        <MainTitle type="search">
          {categoryPosts.total} kết quả tìm kiếm với từ khóa "{slug}"
        </MainTitle>

        <div className="tcl-row tcl-jc-center">
          {categoryPosts.list.map((post) => (
            <div key={post.id} className="tcl-col-12 tcl-col-md-8">
              <ArticleItem
                post={post}
                isStyleCard
                isShowCategoies
                isShowAvatar={false}
                isShowDesc={false}
              />
            </div>
          ))}
        </div>

        {categoryPosts.renderButton()}
      </div>
    </div>
  );
}

export default SearchCateGory;
