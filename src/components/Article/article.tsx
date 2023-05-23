import { articleInterface } from "../../interfaces/article";
import { Card } from "antd";
import classes from "./article.module.scss";
import { Tag } from "antd";
import { format } from "date-fns";
import { HeartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { articleAPI } from "../../services/articleService";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useState } from "react";
import { HeartFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const Article: React.FC<articleInterface> = ({
  title,
  tagList,
  author,
  createdAt,
  favoritesCount,
  description,
  slug,
  favorited,
}) => {
  const [isLiked, setLiked] = useState(favorited);
  const { isLogin } = useTypedSelector((state) => state.userSlice);
  // const [likeCount, setLikeCount] = useState(favoritesCount);
  const formatedDate = format(new Date(createdAt), "LLLL d, yyy");
  const [favoritePost] = articleAPI.useFavoritePostMutation();
  const navigate = useNavigate();

  const onClick = async () => {
    if (isLogin) {
      setLiked(!isLiked);
      await favoritePost({
        value: favorited,
        slug,
      })
        .then((data) => {
          navigate("/");
        })
        .catch((e) => {
          console.log(e.message);
        });
    } else {
      alert("You have to be authorized!");
    }
  };
  return (
    <Card
      style={{
        width: 900,
        height: 140,
        boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.15)",
        borderRadius: 5,
      }}
      bodyStyle={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
      }}
    >
      <div className={classes["main-content-wrapper"]}></div>
      <div className={classes["description-wrapper"]}>
        <div className={classes.title}>
          <Link to={`/${slug}`}>
            <h1>{title}</h1>
          </Link>
          <div className={classes["likes-wrapper"]}>
            {!isLiked ? (
              <HeartOutlined onClick={onClick} className={classes.heart} />
            ) : (
              <HeartFilled
                style={{ color: "red" }}
                onClick={onClick}
                className={classes.heart}
              />
            )}
            <span>{favoritesCount}</span>
          </div>
        </div>

        <div className={classes["tag-wrapper"]}>
          {tagList.map((el) => (
            <Tag>{el}</Tag>
          ))}
        </div>
        <p className={classes.description}>{description}</p>
      </div>
      <div className={classes["account-wrapper"]}>
        <div className={classes["acc-info"]}>
          <h3>{author.username}</h3>
          <p className={classes.date}>{formatedDate}</p>
        </div>
        <img
          className={classes["image-wrapper"]}
          alt="profilcePic"
          src={author.image}
        ></img>
      </div>
    </Card>
  );
};
export default Article;
