import { useSelector } from "react-redux";

import ArticleRelated from "../ArticleItem/ArticleRelated";

function PostDetailRelatedPosts() {
  const relativePosts = useSelector((state) => state.Post.relatedPostsByAuthor);

  return (
    <div className="related-post">
      <h2 className="related-post__head">Related Posts</h2>
      {relativePosts.map((post) => (
        <ArticleRelated post={post} key={post.id} />
      ))}
    </div>
  );
}

export default PostDetailRelatedPosts;
