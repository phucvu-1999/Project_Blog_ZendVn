import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { actFetchMeAsync } from "./store/auth/actions";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SearchPage from "./pages/SearchPage";
import PostDetailPage from "./pages/PostDetailPage";
import TagPage from "./pages/TagPage";
import SearchCateGory from "./pages/SearchCategory";
import { actGetAllCategoriesAsync } from "./store/category/action";
import { actGetMenuAsync } from "./store/Menu/action";

import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actFetchMeAsync());
    dispatch(actGetAllCategoriesAsync());
    dispatch(actGetMenuAsync());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="wrapper-content">
        <Header />
        <Switch>
          <Route path="/tag/:tagId">
            <TagPage />
          </Route>
          <Route path="/post/:slug">
            <PostDetailPage />
          </Route>
          <Route path="/category/:slug">
            <SearchCateGory />
          </Route>
          <Route path="/search">
            <SearchPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
        <div className="spacing" />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
