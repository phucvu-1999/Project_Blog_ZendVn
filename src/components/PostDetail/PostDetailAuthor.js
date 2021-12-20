import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { genUserLink } from "../../helpers";
import { DEFAULT_AVATAR } from "../../constants";
import "./post-author.css";

function PostDetailAuthor() {
  const post = useSelector((state) => state.Post.postDetail);
  const author = post.author;
  const authorId = post.authorId;
  const { nickname, description, avatar } = author;
  const authorLink = genUserLink(authorId);

  return (
    <div className="post-author">
      <div className="post-author__bg-avatar">
        <a href={authorLink} className="post-author__avatar">
          <img src={avatar || DEFAULT_AVATAR} alt={nickname} />
        </a>
      </div>
      <div className="post-author__nickname">
        <Link to={authorLink}>{nickname}</Link>
      </div>
      <p className="post-author__desc">
        {description ||
          `Lorem ipsum, dolor sit amet conse ctetur adipi sicing elit.
        Necessitatibus, vel vero vel vero vel vero vel vero!  `}
      </p>
    </div>
  );
}

export default PostDetailAuthor;
