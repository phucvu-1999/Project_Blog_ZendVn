import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function PostDetailTags() {
  const postTags = useSelector((state) => state.Post.postDetail.tagsId);
  const tags = useSelector((state) => state.Tags.tags);

  return (
    <div className="post-detail__tags">
      <h2>Tags</h2>
      <ul>
        {postTags.map((tag) => (
          <li key={tags[tag].id} className="item">
            <Link to={`/tag/${tags[tag].slug}`} className="btn btn-default">
              {tags[tag].name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostDetailTags;
