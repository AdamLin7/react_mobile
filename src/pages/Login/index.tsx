import { Button, NavBar, Form, Input,Toast } from "antd-mobile"
import styles from "./index.module.scss"
import { LoginForm } from "@/types/data"
import { login } from "@/store/action/login"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const handleSubmit = async (value: LoginForm) => {
    await dispatch(login(value))
    Toast.show({
      content: "登录成功！",
      duration: 500,
      afterClose: () => {
        history.replace('/home')
      },
    })
  }
  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar></NavBar>

      <div className="login-form">
        <h2 className="title">账号登录</h2>

        <Form onFinish={handleSubmit}>
          <Form.Item
            name="mobile"
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: "请输入手机号",
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "手机号格式错误",
              },
            ]}
            className="login-item"
          >
            <Input placeholder="请输入手机号" maxLength={11} />
          </Form.Item>

          <Form.Item
            className="login-item"
            extra={<span className="code-extra">发送验证码</span>}
            name="code"
            validateTrigger="onBlur"
            rules={[{ required: true, message: "请输入验证码" }]}
          >
            <Input placeholder="请输入验证码" autoComplete="off" />
          </Form.Item>

          {/* noStyle 表示不提供 Form.Item 自带的样式 */}
          <Form.Item noStyle>
            <Button
              block
              type="submit"
              color="primary"
              className="login-submit"
            >
              登 录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default Login
