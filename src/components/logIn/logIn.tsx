import { Button, Form, Input, Card } from "antd";
import classes from "../signUp/signUp.module.scss";
import { MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { articleAPI } from "../../services/articleService";
import { saveToken } from "../../services/tokenService";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/redcers/rootReducer";
import { setLogStatus, setUserData } from "../../store/redcers/userSlice";
import { saveIsLogin } from "../../services/tokenService";

const LogIn: React.FC = () => {
  const [userAuthorization] = articleAPI.useUserAuthorizationMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  // useEffect(() => {
  //   dispatch(setLogStatus(false));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleLogIn = async (data: any) => {
    await userAuthorization(data).then((temp: any) => {
      console.log(temp.data.user);
      dispatch(setUserData(temp?.data?.user));
      saveToken(temp?.data?.user?.token);
      dispatch(setLogStatus(true));
      saveIsLogin(true);
      navigate("/");
    });
  };

  return (
    <div className={classes["signup-wrapper"]}>
      <Card
        style={{
          width: 450,
          height: "auto",
          boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.15)",
          borderRadius: 5,
        }}
        bodyStyle={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 15,
        }}
      >
        <h1 className={classes["signup-title"]}>Log in</h1>
        <div className={classes["form-wrapper"]}>
          <Form
            form={form}
            onFinish={handleLogIn}
            name="normal__form"
            initialValues={{ remember: true }}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your Email!" },
                {
                  type: "email",
                  message: "please enter a valid email",
                },
              ]}
            >
              <Input
                prefix={
                  <MailOutlined className={classes["site-form-item-icon"]} />
                }
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={
                  <MailOutlined className={classes["site-form-item-icon"]} />
                }
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item className={classes["sign-check"]}>
              <Button
                type="primary"
                htmlType="submit"
                className={classes["login-form-button"]}
              >
                Log in
              </Button>
              <p style={{ paddingTop: 10, color: "rgba(140, 140, 140, 1)" }}>
                Don't have an account yet?<Link to={`/sign-up`}> Sign Up</Link>
              </p>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default LogIn;
