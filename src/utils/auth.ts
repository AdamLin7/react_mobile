import type { Token } from '@/types/data'
// 使用常量来存储 key
const GEEK_TOKEN_KEY = 'geek-h5-token';
// 获取 token
const getToken = (): Token => JSON.parse(localStorage.getItem(GEEK_TOKEN_KEY) || '{"token":"","refresh_token":""}')
// 设置token
const setToken = (token: Token) => localStorage.setItem(GEEK_TOKEN_KEY, JSON.stringify(token))
// 清除 token
const clearToken = () => localStorage.removeItem(GEEK_TOKEN_KEY)
// 根据 token 判断是否登录
const isAuth = () => { }
export {
    getToken,
    setToken,
    clearToken,
}
