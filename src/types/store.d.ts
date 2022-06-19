// 处理redux 相关类型
import { ThunkAction } from 'redux-thunk';
import store from '@/store'
import {Token} from './data'
// Redux 应用的状态
export type RootState = ReturnType<typeof store.getState>      //通过 ReturnType 获取整个redux 的返回状态
export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>;
// 项目中所有 action 的类型
export type RootAction = LoginAction;

// 登录/注册的 action
export type LoginAction = {
    type:'login/token'  //字面量类型
    payload:Token
}
