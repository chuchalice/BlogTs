import ArticleList from "./articleList/articleList";
import Header from "./Header/header";
import classes from "./app.module.scss";
import { Routes, Route } from "react-router-dom";
// import NotFound from "./notFound/notFound";
import ExtendedArticle from "./extendedArticle/extendedArticle";
import SignUp from "./signUp/signUp";
import LogIn from "./logIn/logIn";
import { articleAPI } from "../services/articleService";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/redcers/rootReducer";
import { useEffect } from "react";
import { setUserData } from "../store/redcers/userSlice";
import NewPost from "./newPost/newPost";
import EditUser from "./editUser/editUser";
import EditPost from "./editPost/editPost";

function App() {
  const { data } = articleAPI.useGetUserQuery(localStorage.token);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (localStorage.token && data) {
      localStorage.setItem("userData", JSON.stringify(data));
      dispatch(setUserData(data.user));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, localStorage.token]);

  return (
    <section className={classes.app}>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<ArticleList />}></Route>
          <Route path="/:id" element={<ExtendedArticle />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/log-in" element={<LogIn />}></Route>
          <Route path="/new-article" element={<NewPost />}></Route>
          <Route path="/profile" element={<EditUser />}></Route>
          <Route path="/articles/:id/edit" element={<EditPost />}></Route>
        </Route>
      </Routes>
    </section>
  );
}

export default App;
