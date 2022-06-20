import { Button, NavBar, Form, Input, Toast } from "antd-mobile"
import styles from "./index.module.scss"
import { LoginForm } from "@/types/data"
import { login, getCode } from "@/store/action/login"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import type { AxiosError } from "axios"
import { useRef } from "react"
import { InputRef } from "antd-mobile/es/components/input"
const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  // 得到一个 Form 表单实例
  const [form] = Form.useForm()
  const mobileRef = useRef<InputRef>(null)
  // 提交表单
  const handleSubmit = async (value: LoginForm) => {
    try {
      await dispatch(login(value))
      Toast.show({
        content: "登录成功！",
        duration: 500,
        afterClose: () => {
          history.replace("/home")
        },
      })
    } catch (e) {
      const error = e as AxiosError<{ message: string }>
      Toast.show({
        content: error.response?.data?.message,
        duration: 1000,
      })
    }
  }
  // 发送验证码
  const sendCode = async () => {
    const mobile = (form.getFieldValue("mobile") || "") as string
    // !! 转为 布尔类型
    const isError = !!form.getFieldError("mobile").length
    // 有错误
    if (isError || mobile.trim() === "") {
      mobileRef.current?.focus()
      return //手机号不合法，不能发送
    }
    try {
      await dispatch(getCode(mobile)) //发送验证码
      Toast.show({
        content: "验证码已发送",
        duration: 1000,
      })
    } catch (error) {
      // 这里需要将 error 对象 断言为 Axios的错误对象
      const e = error as AxiosError<{ message: string }>
      Toast.show({
        content: e.response?.data.message,
      })
    }
  }
  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar></NavBar>

      <div className="login-form">
        <h2 className="title">账号登录</h2>

        {/* 下面这个 form ，代指 Form表单实例 */}
        <Form form={form} onFinish={handleSubmit}>
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
            <Input placeholder="请输入手机号" maxLength={11} ref={mobileRef} />
          </Form.Item>

          <Form.Item
            className="login-item"
            extra={
              <span className="code-extra" onClick={sendCode}>
                发送验证码
              </span>
            }
            name="code"
            validateTrigger="onBlur"
            rules={[{ required: true, message: "请输入验证码" }]}
          >
            <Input placeholder="请输入验证码" autoComplete="off" />
          </Form.Item>

          {/* noStyle 表示不提供 Form.Item 自带的样式 */}
          {/* shouldUpdate  页面中只要有表单更新就会重新渲染该项 */}
          <Form.Item noStyle shouldUpdate>
            {/* 按钮是否禁用：
                        1.校验没有通过
                        2.用户没有触摸过 */}

            {() => {
              const values = form.getFieldsError()
              // 长度 > 0 即代表有错误
              const disabled =
                values.filter((item) => item.errors.length > 0).length > 0 ||
                // 检查一组字段是否被用户操作过， 为 true 时检查是否所有字段都被操作过
                !form.isFieldsTouched(true)

              return (
                <Button
                  block
                  type="submit"
                  color="primary"
                  className="login-submit"
                  disabled={disabled}
                >
                  登 录
                </Button>
              )
            }}
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default Login
