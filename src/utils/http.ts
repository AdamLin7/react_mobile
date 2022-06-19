import axios from 'axios'
import store from '@/store'
import { Toast } from 'antd-mobile'
import { customHistory } from '@/utils/history'

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
http.interceptors.response.use(undefined, err => {
    if (err.response.status === 401) {
        Toast.show({
            content: '登录超时，请重新登录',
            duration: 1000,
            afterClose:() => {
                // toast 关闭时会执行这个回调
                customHistory.push('/login')
            }
        })
        return Promise.reject(err);
    }
})

export { http }