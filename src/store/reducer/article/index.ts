import { ArticleDetail, ArticleComment, ArtComment } from '@/types/data'
import { ArticleAction } from '@/types/store'
type ArticleState = {
    detail: ArticleDetail,
    comment: ArticleComment
}
const initialState: ArticleState = {
    detail: {},
    comment: {
        results: [] as ArtComment[]
    }
} as ArticleState
export default function article(state = initialState, action: ArticleAction): ArticleState {
    switch (action.type) {
        case 'article/get':
            return {
                ...state,
                detail: action.payload
            }
        case 'article/getArticleComment':
            const { total_count, results, last_id, end_id, actionType } = action.payload
            return {
                ...state,
                comment: {
                    total_count,
                    last_id,
                    end_id,
                    results: actionType === 'append' ? [...state.comment.results, ...results] : [...results]
                }
            }
        default:
            return state
    }

}   
