import axios from 'axios'
import store from '@/store'
import { clearToken, setToken } from './auth'
import { Toast } from 'antd-mobile'
import { customHistory } from './history'

const http = axios.create({
    baseURL: 'http://toutiao.itheima.net/v1_0',
    timeout: 5000
})

// 请求拦截器
http.interceptors.request.use(config => {
    const { Login: { token } } = store.getState()
    // 除了登录请求外，其他请求统一添加 token
    if (!config.url?.startsWith('authorizations')) {
        config.headers!.Authorization = `Bearer ${token}`
    }
    return config;
}, err => Promise.reject(err))

// 响应拦截器
http.interceptors.response.use(response => {
    return response.data ? response.data : {}
}, async err => {
    if (err.response.status === 401) {
        
        try {
            let { Login: { refresh_token } } = store.getState()
            // 连 refresh_token 也失效了
            if (!refresh_token) {
                return Promise.reject(err) //直接进入 catch
            }
            
            // 拿到新的 token
            const { data: { data: { token } } } = await axios({
                url: "http://toutiao.itheima.net/v1_0/authorizations",
                method: 'put',
                headers: {
                    Authorization: `Bearer ${refresh_token}`
                }
            })

            const tokenObj = {
                token,  //新的token
                refresh_token
            }
            // 更新本地缓存
            setToken(tokenObj)
            // 更新redux
            store.dispatch({ type: 'login/token', payload: tokenObj })
            // 重新发起之前错误的请求
            return http(err.config)
        } catch (error) {
            // 只要进了这里，只能重新登录
            // redux 和缓存中的 token 和 refresh_token 都要清除
            clearToken()
            store.dispatch({ type: 'login/logout' })
            Toast.show({
                content: '登录超时，请重新登录',
                duration: 1000,
                afterClose: () => {
                    // 带上当前页面地址跳转至登录页
                    customHistory.push('/login', { from: customHistory.location.pathname })
                }
            })
        }
    }
    return Promise.reject(err);
})

export { http }