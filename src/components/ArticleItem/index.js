import "./article-item.css";
import cls from "classnames";
import ArticleItemDesc from "./ArticleItemDesc";
import ArticleItemThumb from "./ArticleItemThumb";
import ArticleItemTitle from "./ArticleItemTitle";
import ArticleItemInfo from "./ArticleItemInfo";
import ArticleItemCategories from "./ArticleItemCategories";
import ArticleItemStats from "./ArticleItemStats";

export default function ArticleItem({
  isStyleRow = false,
  isStyleCard = false,
  isShowDesc = false,
  isShowCategoies = false,
  isShowAvatar = true,
  post,
}) {
  const classes = cls("article-item", {
    "style-card": isStyleCard,
    "style-row": isStyleRow,
  });

  if (!post) {
    return null;
  }

  const { title, thumbnail, author, createdDate, slug, authorID } = post;

  const slugLink = "/post/" + slug;
  const authorLink = "/user/" + authorID;
  const categoryLink = post.categories;

  return (
    <article className={classes}>
      <ArticleItemThumb thumbnail={thumbnail} slugLink={slugLink} />
      <div className="article-item__content">
        {isShowCategoies && (
          <ArticleItemCategories categoryLink={categoryLink} />
        )}
        {isShowCategoies && <ArticleItemStats post={post} />}

        <ArticleItemTitle title={title} slugLink={slugLink} />

        {isShowDesc && <ArticleItemDesc post={post} />}

        <ArticleItemInfo
          author={author}
          createdDate={createdDate}
          isShowAvatar={isShowAvatar}
          title={title}
          authorLink={authorLink}
        />
      </div>
    </article>
  );
}
