import { RootThunkAction } from "@/types/store"
import { http } from "@/utils/http"
import type { UserChannelResponse, ArticleResponse } from "@/types/data"
import { channel } from "@/types/data"

const channel_key = 'geek-channels'
export const getUserChannel = (): RootThunkAction => {
    let UserChannels: channel[] = []
    return async (dispatch, getState) => {
        const { Login: { token } } = getState()
        if (!!token) {
            // 有token
            const { data: { channels } } = (await http.get('user/channels')) as UserChannelResponse
            UserChannels = channels
        } else {
            // 没token
            const localChannels = JSON.parse(localStorage.getItem(channel_key,) ?? '[]') as channel[]
            if (localChannels.length > 0) {
                // 有本地频道缓存
                UserChannels = localChannels
            } else {
                const { data: { channels } } = (await http.get('/user/channels')) as UserChannelResponse
                localStorage.setItem(channel_key, JSON.stringify(channels))
                UserChannels = channels
            }
        }
        // 分发action
        dispatch({ type: 'home/getUserChannel', payload: UserChannels })
    }
}

// 获取用户频道文章
export const getArticleList = (channel_id: number, timestamp: number,actionType:'append' | 'replace'): RootThunkAction => {
    return async dispatch => {
        const res = (await http.get('/articles', {
            params: {
                channel_id,
                timestamp
            }
        })) as ArticleResponse
            
        dispatch({ type: 'home/getChannelArticles', payload: { channel_id, data: res.data,actionType } })
    }
}