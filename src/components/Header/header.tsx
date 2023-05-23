import classes from "./Header.module.scss";
import articleClasses from "../Article/article.module.scss";
import { setLogStatus } from "../../store/redcers/userSlice";
import { Button } from "antd";
import { Link, Outlet } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/redcers/rootReducer";
import { removeTokens } from "../../services/tokenService";

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const onClick = () => {
    dispatch(setLogStatus(false));
    removeTokens();
  };

  const image =
    "https://pwco.com.sg/wp-content/uploads/2020/05/Generic-Profile-Placeholder-v3.png";
  const { isLogin, username, avatar } = useTypedSelector(
    (state) => state.userSlice
  );
  console.log(avatar);
  return (
    <>
      {isLogin && (
        <>
          <header className={classes.header}>
            <div>
              <Link style={{ textDecoration: "none" }} y to={`/`}>
                <p>RealWorld Blog</p>
              </Link>
            </div>
            <div className={classes["header__authentication"]}>
              <Link to={"/new-article"} style={{ textDecoration: "none" }}>
                <Button className={classes["header__sign-button"]} type="text">
                  Create article
                </Button>
              </Link>
              <Link to={`/profile`} style={{ textDecoration: "none" }}>
                <p>{username || "загрузка..."}</p>
              </Link>
              <img
                className={articleClasses["image-wrapper"]}
                alt="profilcePic"
                src={avatar ? avatar : image}
              ></img>
              <Link to={`/log-in`}>
                <Button
                  onClick={() => onClick()}
                  className={classes["header__logout-button"]}
                  type="text"
                >
                  Log out
                </Button>
              </Link>
            </div>
          </header>

          <Outlet />
        </>
      )}
      {!isLogin && (
        <>
          <header className={classes.header}>
            <div>
              <Link to={`/`}>
                <p>RealWorld Blog</p>
              </Link>
            </div>
            <div className={classes["header__authentication"]}>
              <Link to={`/log-in`}>
                <Button type="text">Log in</Button>
              </Link>
              <Link to={`/sign-up`}>
                <Button className={classes["header__sign-button"]}>
                  Sign up
                </Button>
              </Link>
            </div>
          </header>
          <Outlet />
        </>
      )}
    </>
  );
};
export default Header;
