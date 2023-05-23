import { useNavigate, useParams } from "react-router-dom";
import { articleAPI } from "../../services/articleService";
import Card from "antd/es/card/Card";
import _classes from "./extendedArticle.module.scss";
import classes from "../Article/article.module.scss";
import { Button, Tag } from "antd";
// import { format } from "date-fns";
import { HeartOutlined } from "@ant-design/icons";
import { HeartFilled } from "@ant-design/icons";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Link } from "react-router-dom";
import { useState } from "react";

const ExtendedArticle: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: article, isLoading } = articleAPI.useFetchOneArticleQuery(id!, {
    pollingInterval: 1000,
  });
  const [isLiked, setLiked] = useState(article?.article.favorited);
  const { username, isLogin } = useTypedSelector((state) => state.userSlice);
  const owner = article?.article.author.username === username;
  // const date: any = article?.article.createdAt;
  //   const formatedDate = format(new Date(date), "LLLL d, yyy");
  const [deleteArticle] = articleAPI.useDeleteArticleMutation();
  const [favoritePost] = articleAPI.useFavoritePostMutation();

  const onDelete = async () => {
    const slug = {
      id,
    };
    deleteArticle(slug);
    navigate("/");
  };

  const onClick = async () => {
    if (isLogin) {
      setLiked(!isLiked);
      await favoritePost({
        value: article?.article.favorited,
        slug: article?.article.slug,
      }).catch((e) => {
        console.log(e.message);
      });
    } else {
      alert("You have to be authorized");
    }
  };

  return (
    <div className={_classes["extended-wrapper"]}>
      <Card
        style={{
          width: 900,
          height: "auto",
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
        {isLoading ? (
          <h1>Идет загрузка...</h1>
        ) : (
          <>
            <div className={classes["main-content-wrapper"]}></div>
            <div className={classes["description-wrapper"]}>
              <div className={classes.title}>
                <h1>{article?.article.title}</h1>
                <div className={classes["likes-wrapper"]}>
                  {!article?.article.favorited ? (
                    <HeartOutlined
                      onClick={onClick}
                      className={classes.heart}
                    />
                  ) : (
                    <HeartFilled
                      style={{ color: "red" }}
                      onClick={onClick}
                      className={classes.heart}
                    />
                  )}
                  <span>{article?.article.favoritesCount}</span>
                </div>
              </div>

              <div className={classes["tag-wrapper"]}>
                {article?.article.tagList.map((el) => (
                  <Tag>{el}</Tag>
                ))}
              </div>
              <p className={classes.description}>
                {article?.article.description}
              </p>
              <p>{article?.article.body}</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "auto",
                gap: 30,
                paddingLeft: 10,
              }}
            >
              <div className={classes["account-wrapper"]}>
                <div className={classes["acc-info"]}>
                  <h3>{article?.article.author.username}</h3>
                  <p className={classes.date}></p>
                </div>
                <img
                  className={classes["image-wrapper"]}
                  alt="profilcePic"
                  src={article?.article.author.image}
                ></img>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                {owner && (
                  <>
                    <Link to={`/articles/${id}/edit`}>
                      <Button
                        style={{
                          color: "rgba(82, 196, 26, 1)",
                          borderColor: "rgba(82, 196, 26, 1)",
                        }}
                        type="text"
                      >
                        Edit
                      </Button>
                    </Link>
                    <Button
                      onClick={onDelete}
                      style={{
                        color: "rgba(245, 34, 45, 1)",
                        borderColor: "rgba(245, 34, 45, 1)",
                      }}
                      type="text"
                    >
                      Delete
                    </Button>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};
export default ExtendedArticle;
