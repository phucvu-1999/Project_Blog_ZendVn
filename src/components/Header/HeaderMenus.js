import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { actLogOut } from "../../store/auth/actions";
// import HeaderMainMenu from "./HeaderMainMenu";
import { mappingJSX } from "../../helpers";

function HeaderMenus() {
  const dispatch = useDispatch();
  const mainMenu = useSelector((state) => state.Menu.menu);
  const userInfo = useSelector((state) => state.Auth.currentUser);

  const logOutHandler = (e) => {
    e.preventDefault();

    dispatch(actLogOut());
  };

  return (
    <div className="tcl-col-6">
      <div className="header-nav">
        <ul className="header-nav__lists">
          <li>
            <Link to="/">Home</Link>
          </li>
          {mainMenu.map(mappingJSX)}
        </ul>
        <ul className="header-nav__lists">
          {userInfo ? (
            <li className="user">
              <Link to="/login">
                <i className="icons ion-person" /> {userInfo.nickname}
              </Link>
              <ul>
                <li>
                  <a href="/" onClick={logOutHandler}>
                    Log out
                  </a>
                </li>
              </ul>
            </li>
          ) : (
            <li className="user">
              <Link to="/login">
                <i className="icons ion-person" /> Tài khoản
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default HeaderMenus;
