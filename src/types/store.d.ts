// 处理redux 相关类型
import { ThunkAction } from 'redux-thunk';
import store from '@/store'
import { Token, User, UserProfile, channel, Articles, ArticleDetail, ArticleComment } from './data'
// Redux 应用的状态
export type RootState = ReturnType<typeof store.getState>      //通过 ReturnType 获取整个redux 的返回状态
export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>;
// 项目中所有 action 的类型
export type RootAction = LoginAction | UserAction | HomeAction | ArticleAction

// 登录/注册的 action
export type LoginAction = {
    type: 'login/token'  //字面量类型
    payload: Token
} | {
    type: 'login/logout',
}

export type UserAction = {
    type: 'user/getuser'
    payload: User
} | {
    type: 'user/getprofile',
    payload: UserProfile
} | {
    type: 'profile/update',
    payload: Partial<UserProfile>
}

export type HomeAction = {
    type: 'home/getUserChannel',
    payload: channel[]
} | {
    type: 'home/getChannelArticles',
    payload: {
        channel_id: number
        data: Articles,
        actionType: 'append' | 'replace'
    }
}

export type ArticleAction = {
    type: 'article/get',
    payload: ArticleDetail
} | {
    type: 'article/getArticleComment',
    payload: ArticleComment & { actionType: 'append' | 'replace' }
}
