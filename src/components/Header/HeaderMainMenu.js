import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { mappingJSX } from "../../helpers";

const HeaderMainMenu = () => {
  const mainMenu = useSelector((state) => state.Menu.menu);

  return (
    <ul className="header-nav__lists">
      <li>
        <Link to="/">Home</Link>
      </li>
      {mainMenu.map(mappingJSX)}
    </ul>
  );
};

export default HeaderMainMenu;
