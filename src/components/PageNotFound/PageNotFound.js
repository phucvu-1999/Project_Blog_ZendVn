import React from "react";

import Button from "../shared/Button";

const PageNotFound = () => {
  return (
    <div className="article-list section">
      <div className="tcl-container">
        <div className="tcl-row tcl-jc-center">
          <div className="tcl-col-3">
            <img
              src="https://cdn.24h.com.vn/images/404img_092018.png"
              alt="not-found"
            />
          </div>
          <div className="tcl-col-5">
            <h2>Page not found !</h2>
            <Button href="/" as="a" type="primary">
              Come back home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
