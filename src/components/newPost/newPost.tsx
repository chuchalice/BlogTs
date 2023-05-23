import Card from "antd/es/card/Card";
import _classes from "../extendedArticle/extendedArticle.module.scss";
import { Button, Form, Input} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { articleAPI } from "../../services/articleService";
import { useNavigate } from "react-router-dom";

const NewPost: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const layout = {
    labelCol: { span: 2, offset: 4 },
    wrapperCol: { span: 22 },
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 12 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 12 },
      sm: { span: 8 },
    },
  };

  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 12, offset: 0 },
      sm: { span: 8, offset: 0 },
    },
  };
  const [postArticle] = articleAPI.usePostArticleMutation();
  const onSubmit = async (value: any) => {
    const finalData = {
      body: value.body,
      description: value.description,
      tagList: value.tagList.map((tag: string) => ({ tagName: tag })),
      title: value.title,
    };
    await postArticle(finalData).then((temp: any) => {
      navigate(`/`);
    });
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
          paddingLeft: 30,
          paddingRight: 25,
        }}
      >
        <Form
          form={form}
          onFinish={onSubmit}
          {...layout}
          layout="vertical"
          name="nest-messages"
          style={{ minWidth: 900 }}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[
              { required: true, message: "this field is required" },
              { min: 10, max: 40 },
            ]}
            hasFeedback
          >
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 4, offset: 0 }}
            wrapperCol={{ span: 22 }}
            name="description"
            label="Description"
            rules={[
              { required: true, message: "this field is reauired" },
              { min: 5, max: 45 },
            ]}
            hasFeedback
          >
            <Input placeholder="description" />
          </Form.Item>
          <Form.Item
            name="body"
            label="Text"
            rules={[{ min: 10, max: 300 }, { required: true }]}
            hasFeedback
          >
            <Input.TextArea />
          </Form.Item>

          <Form.List
            name="tagList"
            rules={[
              {
                validator: async (_, names) => {
                  if (!names || names.length < 1) {
                    return Promise.reject(new Error("At least 1 tag"));
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    hasFeedback
                    {...(index === 0
                      ? formItemLayout
                      : formItemLayoutWithOutLabel)}
                    label={index === 0 ? "Tags" : ""}
                    required={true}
                    rules={[{ required: true }]}
                    key={field.key}
                  >
                    <Form.Item
                      hasFeedback
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "Please enter a tag",
                        },
                      ]}
                      noStyle
                    >
                      <Input placeholder="Tag" style={{ width: "60%" }} />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item hasFeedback>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{ width: "22%" }}
                    icon={<PlusOutlined />}
                  >
                    Add tag
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button style={{ width: "22%" }} type="primary" htmlType="submit">
              Send
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default NewPost;
