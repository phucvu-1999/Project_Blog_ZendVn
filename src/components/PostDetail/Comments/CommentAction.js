import React from "react";
import cls from "classnames";

import IconLoading from "../../shared/IconLoading";

const CommentAction = ({
  count,
  spacingTop,
  spacingBottom,
  parent,
  onClick,
  loading,
}) => {
  const _onClick = (e) => {
    e.preventDefault();
    if (onClick) {
      onClick(e);
    }
  };

  const classes = cls("comments__hidden", {
    "mt-1": spacingTop,
    "mb-1": spacingBottom,
    "pl-0": parent,
  });

  let label = parent ? `Xem thêm ${count} bình luận` : `${count} phản hồi`;
  if (count === 0) {
    label = "";
  }

  if (loading) {
    return <IconLoading width="2em" />;
  }

  return (
    <div className={classes}>
      <button className="btn-reply" onClick={_onClick}>
        {label && <i className="icons ion-ios-undo" />} {label}
      </button>
    </div>
  );
};

export default CommentAction;
