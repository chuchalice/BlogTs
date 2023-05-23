import { Button, Checkbox, Form, Input, Card } from "antd";
import classes from "./signUp.module.scss";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { articleAPI } from "../../services/articleService";
import { useDispatch } from "react-redux";
import { saveData, saveIsLogin } from "../../services/tokenService";
import { AppDispatch } from "../../store/redcers/rootReducer";
import { setLogStatus, setUserData } from "../../store/redcers/userSlice";
import { saveToken } from "../../services/tokenService";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();

  const [userRegistration] = articleAPI.useUserRegistrationMutation();

  const onSubmit = async (data: any) => {
    await userRegistration(data).then((temp: any) => {
      console.log(temp);
      dispatch(setUserData(data));
      dispatch(setLogStatus(true));
      saveToken(temp?.data?.user?.token);
      saveData(JSON.stringify(temp));
      saveIsLogin(true);
      navigate(`/`);
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
        <h1 className={classes["signup-title"]}>Create new account</h1>
        <div className={classes["form-wrapper"]}>
          <Form
            form={form}
            onFinish={onSubmit}
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please enter your username",
                },
                {
                  whitespace: true,
                },
                { min: 3, max: 20 },
              ]}
              hasFeedback
            >
              <Input
                prefix={
                  <UserOutlined className={classes["site-form-item-icon"]} />
                }
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your Email!" },
                {
                  type: "email",
                  message: "please enter a valid email",
                },
              ]}
              hasFeedback
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
                {
                  whitespace: true,
                },
                { min: 6, max: 40 },
              ]}
              hasFeedback
            >
              <Input
                prefix={
                  <LockOutlined className={classes["site-form-item-icon"]} />
                }
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="reapeatPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please repeat your Password!" },

                {
                  whitespace: true,
                },
                { min: 6, max: 40 },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Passwords do not match");
                  },
                }),
              ]}
              hasFeedback
            >
              <Input
                prefix={
                  <LockOutlined className={classes["site-form-item-icon"]} />
                }
                type="password"
                placeholder="Repeat password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item className={classes["sign-check"]}>
              <Button
                type="primary"
                htmlType="submit"
                className={classes["login-form-button"]}
              >
                Sign up
              </Button>
              <p style={{ paddingTop: 10, color: "rgba(140, 140, 140, 1)" }}>
                Already have an account?<Link to={`/log-in`}> Log in</Link>
              </p>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
};
export default SignUp;
