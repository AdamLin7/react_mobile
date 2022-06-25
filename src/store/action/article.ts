import { RootThunkAction } from '@/types/store'
import { http } from '@/utils/http'
import { ArticleDetailResponse } from '@/types/data'
export const getArticleDetailAction = (ArticleId: string): RootThunkAction => {
    return async dispatch => {
        // const res =<ArticleDetailResponse>(await http.get(`/articles/${ArticleId}`))
        const res = (await http.get(`/articles/${ArticleId}`)) as ArticleDetailResponse
        dispatch({type:'article/get',payload:res.data })
    }   
}