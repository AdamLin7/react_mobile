import type { RootThunkAction } from "@/types/store";
import { http } from '@/utils/http'
import { LoginForm, LoginData } from '@/types/data'
import { clearToken, setToken } from "@/utils/auth";
// 异步请求的 action 
export const login = (LoginParams: LoginForm): RootThunkAction => {
    return async dispatch => {

        // 类型断言    非空断言    主观判断变量类型
        const res = await http.post('/authorizations', LoginParams) as LoginData
        // 存储token
        setToken(res.data)
        // 更新redux 状态
        dispatch({ type: 'login/token', payload: res.data })
    }
}
export const getCode = (mobile: string): RootThunkAction => {
    return () => {
        return http.get(`/sms/codes/${mobile}`)
    }
}

export const logout = (): RootThunkAction => {
    return async dispatch => {
        await dispatch({ type: 'login/logout' })
        clearToken()
    }
}