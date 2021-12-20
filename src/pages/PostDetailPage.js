import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import PostDetailContent from "../components/PostDetail/PostDetailContent";
import PostDetailHead from "../components/PostDetail/PostDetailHead";
import PostDetailSidebar from "../components/PostDetail/PostDetailSidebar";
import IconLoading from "../components/shared/IconLoading";
import PageNotFound from "../components/PageNotFound/PageNotFound";
import { actFetchPostsDetailAsync } from "../store/post/actions";

function PostDetailPage() {
  const params = useParams();
  const dispatch = useDispatch();

  const [status, setStatus] = useState("loading");

  useEffect(() => {
    dispatch(actFetchPostsDetailAsync(params.slug)).then((res) => {
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    });
  }, [dispatch, params]);

  if (status === "loading") {
    return (
      <div className="articles-list section">
        <div className="tcl-container">
          <div className="tcl-row tcl-jc-center">
            <IconLoading width="150px" />
          </div>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="tcl-container">
        <PageNotFound />
      </div>
    );
  }

  return (
    <main className="post-detail">
      <div className="spacing" />

      <PostDetailHead />

      <div className="spacing" />

      <div className="post-detail__fluid">
        <div className="tcl-container">
          <div className="post-detail__wrapper">
            <PostDetailContent />

            <PostDetailSidebar />
          </div>
        </div>
      </div>
    </main>
  );
}

export default PostDetailPage;
