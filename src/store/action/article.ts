import { RootThunkAction } from '@/types/store'
import { http } from '@/utils/http'
import { ArticleDetailResponse, ArticleCommentResponse } from '@/types/data'
export const getArticleDetailAction = (ArticleId: string): RootThunkAction => {
    return async dispatch => {
        // const res =<ArticleDetailResponse>(await http.get(`/articles/${ArticleId}`))
        const res = (await http.get(`/articles/${ArticleId}`)) as ArticleDetailResponse
        dispatch({ type: 'article/get', payload: res.data })
    }
}

export const getArticleCommentAction = (type: string, source: string, offset: string | null, actionType: 'append' | 'replace'): RootThunkAction => {
    return async dispatch => {
        const res = await http.get('/comments', {
            params: {
                type,
                source,
                offset
            }
        }) as ArticleCommentResponse
        dispatch({ type: 'article/getArticleComment', payload: { ...res.data, actionType } })
    }
}