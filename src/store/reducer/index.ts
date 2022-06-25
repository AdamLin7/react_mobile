import { combineReducers } from 'redux'
import { Login } from './Login'
import profile from './profile'
import { Home } from './Home'
import article from './article'
const rootReducer = combineReducers({
    Login,
    profile,
    Home,
    article
})
export default rootReducer