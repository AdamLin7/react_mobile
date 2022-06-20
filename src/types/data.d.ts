// 定义 登录/注册 接口返回的接口类型
export type Token = {
    token: string
    refresh_token: string
}

// 提交表单的类型
export type LoginForm = {
    mobile: string,
    code: string
}


// 登录接口的返回类型
export type LoginData = {
    message:string
    data:Token
}