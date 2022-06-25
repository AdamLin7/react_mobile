import { ArticleDetail } from '@/types/data'
import { ArticleAction } from '@/types/store'
type ArticleState = {
    detail: ArticleDetail
}
const initialState: ArticleState = {
    detail: {}
} as ArticleState
export default function article(state = initialState, action: ArticleAction): ArticleState {
    switch (action.type) {
        case 'article/get':
            return {
                ...state,
                detail: action.payload
            }
        default:
            return state
    }

}   
