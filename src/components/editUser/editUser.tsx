import classes from "../signUp/signUp.module.scss";
import { Button, Form, Input, Card } from "antd";
import { articleAPI } from "../../services/articleService";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/redcers/rootReducer";
import { setUserData } from "../../store/redcers/userSlice";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
// import { saveToken } from "../../services/tokenService";

const EditUser: React.FC = () => {
  const { email, username, password } = useTypedSelector(
    (state) => state.userSlice
  );

  const [form] = Form.useForm();
  const [userupdate] = articleAPI.useUserUpdateMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (value: any) => {
    await userupdate({ body: value }).then((temp: any) => {
      dispatch(setUserData(value));
      // saveToken(temp?.data?.user?.token);
      localStorage.setItem("userData", JSON.stringify(value));
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
        <h1 className={classes["signup-title"]}>Edit porfile</h1>
        <div style={{ paddingTop: 20 }}>
          <Form
            onFinish={onSubmit}
            layout="vertical"
            form={form}
            // onFinish={onSubmit}
            name="normal_login"
            className="login-form"
            initialValues={{
              email: email,
              username: username,
              password: password,
            }}
          >
            <Form.Item
              label="Username"
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
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
              label="Email"
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
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              label="New password"
              rules={[
                { required: true, message: "Please input your Password!" },
                {
                  whitespace: true,
                },
                { min: 6, max: 40 },
              ]}
              hasFeedback
            >
              <Input type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item name="image" label="Avatar image" hasFeedback>
              <Input placeholder="Image Url" />
            </Form.Item>
            <Form.Item>
              <Button
                style={{ width: "100%" }}
                type="primary"
                htmlType="submit"
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
};
export default EditUser;
