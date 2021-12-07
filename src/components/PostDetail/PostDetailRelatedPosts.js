import ArticleRelated from "../ArticleItem/ArticleRelated"

function PostDetailRelatedPosts() {
  return (
    <div className="related-post">
      <h2 className="related-post__head">Related Posts</h2>
      <ArticleRelated />
      <ArticleRelated />
      <ArticleRelated />
    </div>
  )
}

export default PostDetailRelatedPosts