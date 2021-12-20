import "./button.css";
import cls from "classnames";
import IconLoading from "../IconLoading";

function Button({
  type = "default",
  loading,
  loadingPos = "left",
  size,
  as = "button",
  htmlType,
  className,
  children,
  onClick,
  ...restProps
}) {
  const classes = cls(
    "btn",
    {
      "btn-default": type === "default",
      "btn-category": type === "category",
      "btn-primary": type === "primary",
      "btn-size-large": size === "large",
    },
    className
  );

  const content = (
    <>
      {loading && loadingPos === "left" && <IconLoading />}
      {children}
      {loading && loadingPos === "right" && <IconLoading />}
    </>
  );

  const _onClick = (e) => {
    if (!loading) {
      onClick && onClick(e);
    }
  };

  const injectedProps = {
    className: classes,
    type: htmlType,
    onClick: _onClick,
    ...restProps,
  };

  if (as === "a") {
    return <a {...injectedProps}>{content}</a>;
  }

  return <button {...injectedProps}>{content}</button>;
}

export default Button;
