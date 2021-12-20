import { Link } from "react-router-dom";

export function getQueryStr(name, location) {
  return new URLSearchParams(location.search).get(name);
}

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export function mappingData(post) {
  return {
    id: post.id,
    title: post.title.rendered,
    author: post.author_data,
    thumbnail: post.featured_media_url,
    createdDate: post.date,
    link: post.link,
    slug: post.slug,
    authorID: post.author,
    description: post.excerpt.rendered,
    view: post.view_count,
    categories: post.categories,
    postContent: post.content.rendered,
    authorId: post.author,
  };
}

export const mappingPostDetailData = (post) => {
  return {
    ...mappingData(post),
    tagsId: post.tags,
    contentHTML: post.content.rendered,
    commentCount: post.comment_count,
  };
};

export const hashCategoriesHandler = (category) => {
  const hashObj = category.reduce((acc, cur) => {
    const key = cur.id;
    acc[key] = { id: cur.id, name: cur.name, slug: cur.slug, lang: cur.lang };

    return acc;
  }, {});

  return hashObj;
};

export const validateLoginForm = ({ value, name }) => {
  let error = "";

  if (name === "username" && !value) {
    error = "Username không được rỗng";
  }

  if (name === "password") {
    if (!value) error = "Password không được rỗng";
    else if (value.length < 6) {
      error = "Password phải có ít nhất 6 kí tự";
    }
  }

  return error;
};

export const validateRegisterForm = ({ name, value }) => {
  let error = "";

  // Nickname:
  if (name === "nickname" && !value) {
    error = "Please enter nickname";
  }

  // Username:
  if (name === "username" && !value) {
    error = "Please enter username";
  }

  // Email:
  if (name === "email") {
    if (!value) error = "Email không được rỗng";
    else if (!validateEmail(value)) {
      error = "Invalid Email";
    }
  }

  // Password:
  if (name === "password") {
    if (!value) error = "Password không được rỗng";
    else if (value.length < 6) {
      error = "Password phải có ít nhất 6 kí tự";
    }
  }

  return error;
};

export const mappingUserData = (user) => {
  return {
    id: user.id,
    email: user.email,
    nickname: user.nickname,
  };
};

export const highlightText = (queryStr, targetStr) => {
  const reg = new RegExp(queryStr, "gi");
  const finalStr = targetStr.replace(reg, (str) => "<mark>" + str + "</mark>");

  return finalStr;
};

export const mappingMenu = (menuItem) => {
  const menuData = {
    id: menuItem.ID,
    url: menuItem.url,
    title: menuItem.title,
    childItems: menuItem.child_items || [],
  };

  menuData.childItems = menuData.childItems.map(mappingMenu);

  return menuData;
};

export const mappingJSX = (menu) => (
  <li key={menu.id}>
    {menu.url.startsWith("http") ? (
      <a href={menu.url} target="_blank" rel="noreferrer">
        {menu.title}
      </a>
    ) : (
      <Link to={menu.url}>{menu.title}</Link>
    )}
    {menu.childItems.length > 0 && <ul>{menu.childItems.map(mappingJSX)}</ul>}
  </li>
);
