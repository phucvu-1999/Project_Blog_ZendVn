import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ArticleItemCategories({ categoryLink }) {
  const categories = useSelector((state) => state.Category.hashCategoriesById);

  return (
    <ul className="article-item__categories">
      {categoryLink.map((cateId) => {
        const category = categories[cateId];
        if (!category) return null;

        const categorySlugLink = "/category/" + category.slug;

        return (
          <li key={cateId}>
            <Link to={categorySlugLink} className="btn btn-category">
              {category.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
